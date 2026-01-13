import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { supabase } from '../services/supabase';
import { Building, MapPin, Phone, Mail, LogOut, Check, AlertCircle, Droplet } from 'lucide-react';
import { getBloodBanks } from '../services/donorService';

const BloodBankDashboard = () => {
              const navigate = useNavigate();
              const [loading, setLoading] = useState(true);
              const [bank, setBank] = useState(null);
              const [isEditing, setIsEditing] = useState(false);

              // Inventory State
              const [inventory, setInventory] = useState({});

              // Fetch Bank Data
              useEffect(() => {
                            const fetchProfile = async () => {
                                          try {
                                                        const { data: { user } } = await supabase.auth.getUser();
                                                        if (!user) {
                                                                      navigate('/login');
                                                                      return;
                                                        }

                                                        // Fetch bank details from 'blood_banks' table
                                                        const { data, error } = await supabase
                                                                      .from('blood_banks')
                                                                      .select('*')
                                                                      .eq('user_id', user.id)
                                                                      .single();

                                                        if (error) {
                                                                      console.error("Error fetching bank:", error);
                                                                      // Fallback or Redirect if not found (maybe they are a donor?)
                                                                      if (error.code === 'PGRST116') {
                                                                                    // Not found row, maybe a donor?
                                                                                    // For this hackathon, just log out or show error
                                                                                    alert("Blood Bank Profile not found.");
                                                                                    await supabase.auth.signOut();
                                                                                    navigate('/login');
                                                                      }
                                                        } else {
                                                                      setBank(data);
                                                                      setInventory(data.inventory || {});
                                                        }
                                          } catch (err) {
                                                        console.error(err);
                                          } finally {
                                                        setLoading(false);
                                          }
                            };

                            fetchProfile();
              }, [navigate]);

              const handleSignOut = async () => {
                            await supabase.auth.signOut();
                            navigate('/');
              };

              const toggleInventory = async (bloodGroup) => {
                            if (!bank) return;

                            const newInventory = { ...inventory, [bloodGroup]: !inventory[bloodGroup] };
                            setInventory(newInventory);

                            // Optimistic Update locally, then save to DB
                            try {
                                          const { error } = await supabase
                                                        .from('blood_banks')
                                                        .update({ inventory: newInventory })
                                                        .eq('id', bank.id);

                                          if (error) {
                                                        console.error("Failed to update inventory", error);
                                                        // Revert
                                                        setInventory(inventory);
                                                        alert("Failed to update stock status.");
                                          }
                            } catch (e) {
                                          console.error(e);
                            }
              };

              if (loading) return <div>Loading...</div>;

              return (
                            <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
                                          <Navbar />
                                          <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '800px' }}>

                                                        {/* Header */}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                                                      <div>
                                                                                    <h1 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '0.5rem' }}>Bank Dashboard</h1>
                                                                                    <p style={{ color: '#64748b' }}>Manage your blood bank's inventory & profile.</p>
                                                                      </div>
                                                                      <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                                                                                    <LogOut size={16} /> Sign Out
                                                                      </button>
                                                        </div>

                                                        {/* Profile Card */}
                                                        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                                                                    <div style={{ width: '60px', height: '60px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                                  <Building size={30} color="#2563eb" />
                                                                                    </div>
                                                                                    <div>
                                                                                                  <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0 }}>{bank?.name}</h2>
                                                                                                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{bank?.address}</p>
                                                                                    </div>
                                                                      </div>

                                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155' }}>
                                                                                                  <Phone size={18} color="#94a3b8" />
                                                                                                  <span>{bank?.contact}</span>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155' }}>
                                                                                                  <Mail size={18} color="#94a3b8" />
                                                                                                  <span>{bank?.email}</span>
                                                                                    </div>
                                                                      </div>
                                                        </div>

                                                        {/* Inventory Management */}
                                                        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
                                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                                                                    <Droplet size={24} color="#e11d48" />
                                                                                    <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: 0 }}>Blood Stock Management</h2>
                                                                      </div>

                                                                      <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.95rem' }}>
                                                                                    Tap to toggle stock availability. <span style={{ color: '#2563eb', fontWeight: 700 }}>Blue</span> = In Stock.
                                                                      </p>

                                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                                                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => {
                                                                                                  const inStock = inventory[bg];
                                                                                                  return (
                                                                                                                <motion.button
                                                                                                                              key={bg}
                                                                                                                              whileTap={{ scale: 0.95 }}
                                                                                                                              onClick={() => toggleInventory(bg)}
                                                                                                                              style={{
                                                                                                                                            padding: '1rem',
                                                                                                                                            borderRadius: '12px',
                                                                                                                                            border: inStock ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                                                                                                                            background: inStock ? '#eff6ff' : '#f8fafc',
                                                                                                                                            color: inStock ? '#2563eb' : '#94a3b8',
                                                                                                                                            cursor: 'pointer',
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'column',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            gap: '0.5rem',
                                                                                                                                            transition: 'all 0.2s ease'
                                                                                                                              }}
                                                                                                                >
                                                                                                                              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{bg}</span>
                                                                                                                              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                                                                                                                                            {inStock ? 'IN STOCK' : 'OUT'}
                                                                                                                              </span>
                                                                                                                </motion.button>
                                                                                                  );
                                                                                    })}
                                                                      </div>
                                                        </div>

                                          </div>
                            </div>
              );
};

export default BloodBankDashboard;
