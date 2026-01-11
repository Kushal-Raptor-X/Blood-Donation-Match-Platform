import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { motion } from 'framer-motion';
import { User, Power, Trash2, MapPin, Activity, Settings } from 'lucide-react';

const DonorDashboard = () => {
              const [user, setUser] = useState(null);
              const [donorProfile, setDonorProfile] = useState(null);
              const [loading, setLoading] = useState(true);
              const navigate = useNavigate();

              useEffect(() => {
                            const checkUser = async () => {
                                          const { data: { user } } = await supabase.auth.getUser();
                                          if (!user) {
                                                        navigate('/login');
                                                        return;
                                          }
                                          setUser(user);

                                          // Fetch linked donor profile
                                          const { data, error } = await supabase
                                                        .from('donors')
                                                        .select('*')
                                                        .eq('user_id', user.id)
                                                        .single();

                                          if (data) setDonorProfile(data);
                                          setLoading(false);
                            };

                            checkUser();
              }, [navigate]);

              const handleLogout = async () => {
                            await supabase.auth.signOut();
                            navigate('/login');
              };

              const toggleAvailability = async () => {
                            if (!donorProfile) return;

                            const newStatus = !donorProfile.is_available;

                            const { error } = await supabase
                                          .from('donors')
                                          .update({ is_available: newStatus })
                                          .eq('id', donorProfile.id);

                            if (!error) {
                                          setDonorProfile(prev => ({ ...prev, is_available: newStatus }));
                            }
              };

              const deleteAccount = async () => {
                            if (!window.confirm("Are you sure? This will permanently delete your donor profile.")) return;

                            // 1. Delete donor record
                            if (donorProfile) {
                                          await supabase.from('donors').delete().eq('id', donorProfile.id);
                            }

                            // 2. Delete auth user (Optional: Requires Admin API usually, but user can delete self if configured)
                            // For Hackathon, we'll just clear data and sign out
                            await supabase.auth.signOut();
                            navigate('/');
              };

              if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Dashboard...</div>;

              return (
                            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                                          <Navbar />
                                          <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                                                      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>Donor Dashboard</h1>
                                                                      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>
                                                                                    Sign Out
                                                                      </button>
                                                        </div>

                                                        {/* STATUS CARD */}
                                                        <motion.div
                                                                      initial={{ opacity: 0, y: 10 }}
                                                                      animate={{ opacity: 1, y: 0 }}
                                                                      style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem', borderLeft: donorProfile?.is_available ? '6px solid #22c55e' : '6px solid #94a3b8' }}
                                                        >
                                                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                    <div>
                                                                                                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Availability Status</h2>
                                                                                                  <p style={{ color: '#64748b' }}>
                                                                                                                {donorProfile?.is_available
                                                                                                                              ? "You are currently VISIBLE to patients nearby."
                                                                                                                              : "You are HIDDEN. Patients cannot find you."}
                                                                                                  </p>
                                                                                    </div>
                                                                                    <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                                                                                                  <input
                                                                                                                type="checkbox"
                                                                                                                checked={donorProfile?.is_available || false}
                                                                                                                onChange={toggleAvailability}
                                                                                                                style={{ opacity: 0, width: 0, height: 0 }}
                                                                                                  />
                                                                                                  <span style={{
                                                                                                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                                                                                                backgroundColor: donorProfile?.is_available ? '#22c55e' : '#ccc',
                                                                                                                transition: '0.4s', borderRadius: '34px'
                                                                                                  }}>
                                                                                                                <span style={{
                                                                                                                              position: 'absolute', content: '""', height: '26px', width: '26px', left: '4px', bottom: '4px', background: 'white', transition: '0.4s', borderRadius: '50%',
                                                                                                                              transform: donorProfile?.is_available ? 'translateX(26px)' : 'translateX(0)'
                                                                                                                }}></span>
                                                                                                  </span>
                                                                                    </label>
                                                                      </div>
                                                        </motion.div>

                                                        {/* PROFILE INFO */}
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                                                      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#334155', fontWeight: 700 }}>
                                                                                                  <User size={20} /> Personal Profile
                                                                                    </div>
                                                                                    <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#64748b' }}>Name:</span> <strong style={{ color: '#1e293b' }}>{donorProfile?.fullName}</strong></div>
                                                                                    <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#64748b' }}>Blood Group:</span> <strong style={{ color: '#dc2626', background: '#fee2e2', padding: '0.1rem 0.5rem', borderRadius: '8px' }}>{donorProfile?.bloodGroup}</strong></div>
                                                                                    <div><span style={{ color: '#64748b' }}>Email:</span> {user.email}</div>
                                                                      </div>

                                                                      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#334155', fontWeight: 700 }}>
                                                                                                  <MapPin size={20} /> Location
                                                                                    </div>
                                                                                    <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#64748b' }}>Pincode:</span> {donorProfile?.pincode}</div>
                                                                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>To update your address, please delete and re-register for now (Hackathon MVP).</p>
                                                                      </div>
                                                        </div>

                                                        {/* DANGER ZONE */}
                                                        <div style={{ border: '1px solid #fecaca', background: '#fef2f2', padding: '1.5rem', borderRadius: '12px' }}>
                                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c', fontWeight: 700, marginBottom: '0.5rem' }}>
                                                                                    <Trash2 size={20} /> Danger Zone
                                                                      </div>
                                                                      <p style={{ color: '#7f1d1d', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                                                    Once you delete your account, there is no going back. Please be certain.
                                                                      </p>
                                                                      <button
                                                                                    onClick={deleteAccount}
                                                                                    style={{ background: '#dc2626', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                                                                      >
                                                                                    Delete Account
                                                                      </button>
                                                        </div>

                                          </div>
                            </div>
              );
};

export default DonorDashboard;
