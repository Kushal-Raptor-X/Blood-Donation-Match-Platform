import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail, Building2 } from 'lucide-react';

const BloodBankLogin = () => {
              const [loading, setLoading] = useState(false);
              const [email, setEmail] = useState('');
              const [password, setPassword] = useState('');
              const [error, setError] = useState('');
              const navigate = useNavigate();

              const handleLogin = async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            setError('');

                            try {
                                          const { data, error } = await supabase.auth.signInWithPassword({
                                                        email,
                                                        password,
                                          });

                                          if (error) throw error;

                                          console.log("Auth Success:", data.user.id);

                                          // Verify this user is actually a Blood Bank
                                          const { data: bankData, error: bankError } = await supabase
                                                        .from('blood_banks')
                                                        .select('id')
                                                        .eq('user_id', data.user.id)
                                                        .single();

                                          if (bankError || !bankData) {
                                                        // Not a blood bank? Sign them out and show error
                                                        await supabase.auth.signOut();
                                                        throw new Error("This account is not registered as a Blood Bank.");
                                          }

                                          // Success - Redirect to Bank Dashboard
                                          navigate('/bank-dashboard');

                            } catch (err) {
                                          setError(err.message);
                                          setLoading(false);
                            }
              };

              return (
                            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                                          <Navbar />
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                                                        <motion.div
                                                                      initial={{ opacity: 0, y: 20 }}
                                                                      animate={{ opacity: 1, y: 0 }}
                                                                      style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', width: '100%', maxWidth: '400px', borderTop: '4px solid #2563eb' }}
                                                        >
                                                                      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                                                                    <div style={{ background: '#eff6ff', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                                                                                  <Building2 size={30} color="#2563eb" />
                                                                                    </div>
                                                                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Blood Bank Portal</h2>
                                                                                    <p style={{ color: '#64748b' }}>Secure login for hospital administrators</p>
                                                                      </div>

                                                                      {error && (
                                                                                    <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                                                                                  {error}
                                                                                    </div>
                                                                      )}

                                                                      <form onSubmit={handleLogin}>
                                                                                    <div style={{ marginBottom: '1rem' }}>
                                                                                                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#475569' }}>Official Email</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                                                                                                <input
                                                                                                                              type="email"
                                                                                                                              required
                                                                                                                              value={email}
                                                                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                                                                              placeholder="admin@hospital.org"
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    <div style={{ marginBottom: '1.5rem' }}>
                                                                                                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: '#475569' }}>Password</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                                                                                                <input
                                                                                                                              type="password"
                                                                                                                              required
                                                                                                                              value={password}
                                                                                                                              onChange={(e) => setPassword(e.target.value)}
                                                                                                                              placeholder="••••••••"
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    <button
                                                                                                  type="submit"
                                                                                                  disabled={loading}
                                                                                                  style={{ width: '100%', padding: '0.75rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', opacity: loading ? 0.7 : 1 }}
                                                                                    >
                                                                                                  {loading ? 'Access Dashboard...' : 'Login to Dashboard'}
                                                                                    </button>
                                                                      </form>

                                                                      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                                                                    Are you a donor? <Link to="/login" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>Donor Login</Link>
                                                                      </p>
                                                        </motion.div>
                                          </div>
                            </div>
              );
};

export default BloodBankLogin;
