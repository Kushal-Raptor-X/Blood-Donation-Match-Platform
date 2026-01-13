import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { Building, MapPin, Phone, CheckCircle, Mail, Lock } from 'lucide-react';
import { addBloodBank } from '../services/donorService';
import { supabase } from '../services/supabase';

const BloodBankRegister = () => {
              const navigate = useNavigate();
              const [step, setStep] = useState(1);
              const [loading, setLoading] = useState(false);
              const [success, setSuccess] = useState(false);
              const [error, setError] = useState('');

              const [formData, setFormData] = useState({
                            name: '',
                            address: '',
                            pincode: '',
                            contact: '',
                            email: '',
                            password: '',
                            lat: '',
                            lng: '',
                            inventory: { 'A+': true, 'A-': true, 'B+': true, 'B-': true, 'O+': true, 'O-': true, 'AB+': true, 'AB-': true } // Default all true for ease
              });

              const handleChange = (e) => {
                            setFormData({ ...formData, [e.target.name]: e.target.value });
              };

              const validateForm = () => {
                            if (!formData.name || !formData.address || !formData.pincode || !formData.contact || !formData.email || !formData.password) {
                                          setError('Please fill in all required fields.');
                                          return false;
                            }
                            if (formData.password.length < 6) {
                                          setError('Password must be at least 6 characters.');
                                          return false;
                            }
                            return true;
              };

              const handleSubmit = async (e) => {
                            e.preventDefault();
                            setError('');

                            if (!validateForm()) return;

                            setLoading(true);

                            try {
                                          // 1. Sign Up User
                                          const { data: authData, error: authError } = await supabase.auth.signUp({
                                                        email: formData.email,
                                                        password: formData.password,
                                          });

                                          if (authError) throw authError;

                                          // 2. Prepare Payload
                                          // Attempt simple geocoding mock based on pincode for demo if real geocoding fails
                                          // Ideally we use Google Geocoding API here, but for now we trust the address/pincode

                                          const bankPayload = {
                                                        user_id: authData.user.id,
                                                        name: formData.name,
                                                        address: formData.address,
                                                        pincode: formData.pincode,
                                                        contact: formData.contact,
                                                        email: formData.email,
                                                        // Simple mock location around Mumbai center for demo if not provided
                                                        // This would be replaced by actual Geocoding in production
                                                        location: {
                                                                      lat: 19.0760 + (Math.random() - 0.5) * 0.1,
                                                                      lng: 72.8777 + (Math.random() - 0.5) * 0.1
                                                        },
                                                        inventory: formData.inventory
                                          };

                                          const result = await addBloodBank(bankPayload);

                                          if (result.success) {
                                                        setSuccess(true);
                                                        setTimeout(() => {
                                                                      navigate('/bank-dashboard'); // Redirect to Bank Dashboard
                                                        }, 2000);
                                          } else {
                                                        setError(result.error || 'Failed to register blood bank.');
                                          }
                            } catch (err) {
                                          console.error(err);
                                          setError(err.message || 'Registration failed.');
                            } finally {
                                          setLoading(false);
                            }
              };

              if (success) {
                            return (
                                          <>
                                                        <Navbar />
                                                        <div className="container" style={{ marginTop: '5rem', textAlign: 'center', maxWidth: '600px' }}>
                                                                      <motion.div
                                                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                      >
                                                                                    <CheckCircle size={80} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem' }} />
                                                                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Registration Successful!</h2>
                                                                                    <p style={{ color: '#64748b' }}>
                                                                                                  Welcome to the network. Redirecting...
                                                                                    </p>
                                                                      </motion.div>
                                                        </div>
                                          </>
                            );
              }

              return (
                            <>
                                          <Navbar />
                                          <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '600px' }}>
                                                        <motion.div
                                                                      initial={{ opacity: 0, y: 20 }}
                                                                      animate={{ opacity: 1, y: 0 }}
                                                        >
                                                                      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                                                                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Blood Bank Registration</h1>
                                                                                    <p style={{ color: '#64748b' }}>Join the network to save lives.</p>
                                                                      </div>

                                                                      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid #e2e8f0' }}>

                                                                                    {error && (
                                                                                                  <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                                                                                                {error}
                                                                                                  </div>
                                                                                    )}

                                                                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                                                                                  {/* Name */}
                                                                                                  <div>
                                                                                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Institution Name</label>
                                                                                                                <div style={{ position: 'relative' }}>
                                                                                                                              <Building size={20} color="#94a3b8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                                                                                                              <input
                                                                                                                                            type="text"
                                                                                                                                            name="name"
                                                                                                                                            placeholder="e.g. City Hospital Blood Bank"
                                                                                                                                            value={formData.name}
                                                                                                                                            onChange={handleChange}
                                                                                                                                            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                                                                                                              />
                                                                                                                </div>
                                                                                                  </div>

                                                                                                  {/* Email & Password */}
                                                                                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                                                                                <div>
                                                                                                                              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Email</label>
                                                                                                                              <div style={{ position: 'relative' }}>
                                                                                                                                            <Mail size={20} color="#94a3b8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                                                                                                                            <input
                                                                                                                                                          type="email"
                                                                                                                                                          name="email"
                                                                                                                                                          placeholder="admin@hospital.com"
                                                                                                                                                          value={formData.email}
                                                                                                                                                          onChange={handleChange}
                                                                                                                                                          style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                                                                                                                            />
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Password</label>
                                                                                                                              <div style={{ position: 'relative' }}>
                                                                                                                                            <Lock size={20} color="#94a3b8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                                                                                                                            <input
                                                                                                                                                          type="password"
                                                                                                                                                          name="password"
                                                                                                                                                          placeholder="••••••"
                                                                                                                                                          value={formData.password}
                                                                                                                                                          onChange={handleChange}
                                                                                                                                                          style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                                                                                                                            />
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                  </div>

                                                                                                  {/* Contact & Pincode */}
                                                                                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                                                                                <div>
                                                                                                                              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Contact Number</label>
                                                                                                                              <div style={{ position: 'relative' }}>
                                                                                                                                            <Phone size={20} color="#94a3b8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                                                                                                                            <input
                                                                                                                                                          type="tel"
                                                                                                                                                          name="contact"
                                                                                                                                                          placeholder="022-XXXXXXX"
                                                                                                                                                          value={formData.contact}
                                                                                                                                                          onChange={handleChange}
                                                                                                                                                          style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                                                                                                                            />
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Pincode</label>
                                                                                                                              <div style={{ position: 'relative' }}>
                                                                                                                                            <MapPin size={20} color="#94a3b8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                                                                                                                            <input
                                                                                                                                                          type="text"
                                                                                                                                                          name="pincode"
                                                                                                                                                          placeholder="400001"
                                                                                                                                                          value={formData.pincode}
                                                                                                                                                          onChange={handleChange}
                                                                                                                                                          style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                                                                                                                            />
                                                                                                                              </div>
                                                                                                                </div>
                                                                                                  </div>

                                                                                                  {/* Address */}
                                                                                                  <div>
                                                                                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Full Address</label>
                                                                                                                <textarea
                                                                                                                              name="address"
                                                                                                                              rows="3"
                                                                                                                              placeholder="Building, Street, Area..."
                                                                                                                              value={formData.address}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                                                                                                                ></textarea>
                                                                                                  </div>

                                                                                    </div>

                                                                                    {/* Inventory Selection */}
                                                                                    <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                                                                                                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>Initial Blood Stock Availability</label>
                                                                                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                                                                                                {Object.keys(formData.inventory).map((bg) => (
                                                                                                                              <button
                                                                                                                                            key={bg}
                                                                                                                                            type="button"
                                                                                                                                            onClick={() => {
                                                                                                                                                          setFormData({
                                                                                                                                                                        ...formData,
                                                                                                                                                                        inventory: {
                                                                                                                                                                                      ...formData.inventory,
                                                                                                                                                                                      [bg]: !formData.inventory[bg]
                                                                                                                                                                        }
                                                                                                                                                          });
                                                                                                                                            }}
                                                                                                                                            style={{
                                                                                                                                                          padding: '0.5rem',
                                                                                                                                                          borderRadius: '8px',
                                                                                                                                                          border: formData.inventory[bg] ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                                                                                                                                          background: formData.inventory[bg] ? '#eff6ff' : 'white',
                                                                                                                                                          color: formData.inventory[bg] ? '#2563eb' : '#64748b',
                                                                                                                                                          fontWeight: 'bold',
                                                                                                                                                          cursor: 'pointer',
                                                                                                                                                          fontSize: '0.9rem'
                                                                                                                                            }}
                                                                                                                              >
                                                                                                                                            {bg}
                                                                                                                              </button>
                                                                                                                ))}
                                                                                                  </div>
                                                                                                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Click to select available stock.</p>
                                                                                    </div>

                                                                                    <button
                                                                                                  type="submit"
                                                                                                  disabled={loading}
                                                                                                  style={{
                                                                                                                marginTop: '1rem',
                                                                                                                padding: '1rem',
                                                                                                                background: 'var(--color-primary)',
                                                                                                                color: 'white',
                                                                                                                border: 'none',
                                                                                                                borderRadius: '8px',
                                                                                                                fontSize: '1rem',
                                                                                                                fontWeight: 700,
                                                                                                                cursor: loading ? 'wait' : 'pointer',
                                                                                                                opacity: loading ? 0.7 : 1
                                                                                                  }}
                                                                                    >
                                                                                                  {loading ? 'Registering...' : 'Complete Registration'}
                                                                                    </button>

                                                                      </form>

                                                                      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
                                                                                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Login here</Link>
                                                                      </p>
                                                        </motion.div>
                                          </div >
                            </>
              );
};

export default BloodBankRegister;
