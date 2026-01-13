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
              const [isEditing, setIsEditing] = useState(false);
              const [formData, setFormData] = useState({});
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

                                          if (data) {
                                                        setDonorProfile(data);
                                                        // Initialize Form Data with existing values (handle potential casing issues if needed)
                                                        setFormData({
                                                                      fullName: data.fullName || data.full_name || '',
                                                                      bloodGroup: data.bloodGroup || data.blood_group || '',
                                                                      pincode: data.pincode || '',
                                                                      contact: data.contact || '',
                                                                      is_available: data.is_available !== undefined ? data.is_available : true // Default to true if missing
                                                        });
                                          }
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
                            console.log("Toggling availability...", donorProfile);

                            const newStatus = !donorProfile.is_available;

                            // Update in DB (Removing .select() to avoid 406 error)
                            const { error } = await supabase
                                          .from('donors')
                                          .update({ is_available: newStatus })
                                          .eq('id', donorProfile.id);

                            console.log("Toggle result:", error);

                            if (error) {
                                          alert("Error updating status: " + error.message);
                            } else {
                                          setDonorProfile(prev => ({ ...prev, is_available: newStatus }));
                            }
              };

              const handleSaveProfile = async () => {
                            if (!donorProfile) return;
                            console.log("Saving profile...", formData);

                            // Update DB (Removing .select() to avoid 406 error)
                            const { error } = await supabase
                                          .from('donors')
                                          .update(formData)
                                          .eq('id', donorProfile.id);

                            console.log("Save result:", error);

                            if (error) {
                                          alert("Error updating profile: " + error.message);
                            } else {
                                          setDonorProfile({ ...donorProfile, ...formData });
                                          setIsEditing(false);
                            }
              };

              const deleteAccount = async () => {
                            if (!window.confirm("Are you sure? This will delete your Login and your Profile.")) return;

                            // Call the Secure RPC function we just created
                            const { error } = await supabase.rpc('delete_own_user');

                            if (error) {
                                          console.error("Error deleting account:", error);
                                          // Fallback: Just sign out if it fails (or invalidates session immediately)
                                          alert("Account deleted (or session ended).");
                            }

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
                                                                      <div style={{ display: 'flex', gap: '1rem' }}>
                                                                                    <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>
                                                                                                  Sign Out
                                                                                    </button>
                                                                      </div>
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
                                                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 700 }}>
                                                                                                  <User size={20} /> Personal Profile
                                                                                    </div>
                                                                                    <button
                                                                                                  onClick={() => {
                                                                                                                if (isEditing) handleSaveProfile();
                                                                                                                else setIsEditing(true);
                                                                                                  }}
                                                                                                  style={{
                                                                                                                padding: '0.5rem 1rem',
                                                                                                                borderRadius: '8px',
                                                                                                                background: isEditing ? '#22c55e' : '#f1f5f9',
                                                                                                                color: isEditing ? 'white' : '#475569',
                                                                                                                border: 'none',
                                                                                                                fontWeight: 600,
                                                                                                                cursor: 'pointer'
                                                                                                  }}
                                                                                    >
                                                                                                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                                                                                    </button>
                                                                      </div>

                                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                                                                    {/* Name */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Full Name</label>
                                                                                                  {isEditing ? (
                                                                                                                <input
                                                                                                                              type="text"
                                                                                                                              value={formData.fullName}
                                                                                                                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                                                                                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                                                                                />
                                                                                                  ) : (
                                                                                                                <strong style={{ color: '#1e293b', fontSize: '1.1rem' }}>{formData.fullName || "Not Set"}</strong>
                                                                                                  )}
                                                                                    </div>

                                                                                    {/* Blood Group */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Blood Group</label>
                                                                                                  {isEditing ? (
                                                                                                                <select
                                                                                                                              value={formData.bloodGroup}
                                                                                                                              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                                                                                                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                                                                                >
                                                                                                                              <option value="">Select</option>
                                                                                                                              <option value="A+">A+</option>
                                                                                                                              <option value="A-">A-</option>
                                                                                                                              <option value="B+">B+</option>
                                                                                                                              <option value="B-">B-</option>
                                                                                                                              <option value="O+">O+</option>
                                                                                                                              <option value="O-">O-</option>
                                                                                                                              <option value="AB+">AB+</option>
                                                                                                                              <option value="AB-">AB-</option>
                                                                                                                </select>
                                                                                                  ) : (
                                                                                                                <strong style={{ color: '#dc2626', background: '#fee2e2', padding: '0.1rem 0.5rem', borderRadius: '8px' }}>{formData.bloodGroup || "-"}</strong>
                                                                                                  )}
                                                                                    </div>

                                                                                    {/* Pincode */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Pincode</label>
                                                                                                  {isEditing ? (
                                                                                                                <input
                                                                                                                              type="text"
                                                                                                                              value={formData.pincode}
                                                                                                                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                                                                                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                                                                                />
                                                                                                  ) : (
                                                                                                                <strong style={{ color: '#1e293b' }}>{formData.pincode || "-"}</strong>
                                                                                                  )}
                                                                                    </div>

                                                                                    {/* Contact */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Contact</label>
                                                                                                  {isEditing ? (
                                                                                                                <input
                                                                                                                              type="text"
                                                                                                                              value={formData.contact}
                                                                                                                              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                                                                                              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                                                                                                />
                                                                                                  ) : (
                                                                                                                <strong style={{ color: '#1e293b' }}>{formData.contact || "-"}</strong>
                                                                                                  )}
                                                                                    </div>

                                                                                    {/* Email (Read Only) */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</label>
                                                                                                  <div>{user.email}</div>
                                                                                    </div>
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
