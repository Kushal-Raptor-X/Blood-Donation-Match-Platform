import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import { motion } from 'framer-motion';
import { User, Droplet, MapPin, CheckCircle, Phone, Calendar, Activity, AlertCircle } from 'lucide-react';

// Simple mock components for now
const Emergency = () => <div className="container" style={{ padding: '5rem', textAlign: 'center' }}><h1>Emergency Page Coming Soon</h1></div>;
export { Emergency }; // Export for App.jsx to use temporarily

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addDonor } from '../services/donorService'; // Import Service

const DonorRegister = () => {
              const navigate = useNavigate();
              const [formData, setFormData] = useState({
                            fullName: '',
                            bloodGroup: '',
                            pincode: '',
                            contact: '',
                            age: '',
                            weight: '',
                            gender: '',
                            lastDonation: '', // Optional
                            illness: '' // Optional
              });
              const [loading, setLoading] = useState(false); // Add loading state
              const [submitted, setSubmitted] = useState(false);

              const handleChange = (e) => {
                            setFormData({ ...formData, [e.target.name]: e.target.value });
              };

              const validateForm = () => {
                            if (formData.age < 18) {
                                          alert("You must be at least 18 years old to donate blood.");
                                          return false;
                            }
                            if (formData.weight < 45) { // Assuming 45kg min based on Indian standards
                                          alert("You must weigh at least 45kg to donate blood.");
                                          return false;
                            }
                            if (formData.lastDonation) {
                                          const lastDate = new Date(formData.lastDonation);
                                          const today = new Date();
                                          const diffTime = Math.abs(today - lastDate);
                                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                          if (diffDays < 90) {
                                                        alert(`Your last donation was only ${diffDays} days ago. You must wait 90 days.`);
                                                        return false;
                                          }
                            }
                            return true;
              };

              const handleSubmit = async (e) => {
                            e.preventDefault();
                            if (!validateForm()) return;

                            setLoading(true);

                            // Call Firebase Service
                            const result = await addDonor(formData);

                            setLoading(false);
                            if (result.success) {
                                          setSubmitted(true);
                                          setTimeout(() => {
                                                        navigate('/emergency'); // Redirect after success
                                          }, 2000);
                            } else {
                                          alert("Error registering donor: " + result.error);
                            }
              };

              if (submitted) {
                            return (
                                          <>
                                                        <Navbar />
                                                        <div className="container" style={{ marginTop: '5rem', textAlign: 'center', maxWidth: '600px' }}>
                                                                      <motion.div
                                                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                      >
                                                                                    <CheckCircle size={80} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem' }} />
                                                                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>You are a Hero!</h2>
                                                                                    <p style={{ color: '#64748b' }}>Thank you for registering as a blood donor. We will notify you when there is an emergency near you.</p>
                                                                      </motion.div>
                                                        </div>
                                          </>
                            );
              }

              return (
                            <>
                                          <Navbar />
                                          <div className="container" style={{ marginTop: '3rem', maxWidth: '600px' }}>
                                                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                                                      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Become a Donor</h1>
                                                                      <p style={{ color: '#64748b' }}>Join our community of life-savers.</p>
                                                        </div>

                                                        <motion.div
                                                                      initial={{ y: 20, opacity: 0 }}
                                                                      animate={{ y: 0, opacity: 1 }}
                                                                      style={{
                                                                                    background: 'white',
                                                                                    borderRadius: 'var(--radius-lg)',
                                                                                    padding: '2rem',
                                                                                    boxShadow: 'var(--shadow-lg)',
                                                                                    border: '1px solid #e2e8f0'
                                                                      }}
                                                        >
                                                                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                                                                    {/* Name */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Full Name</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <input
                                                                                                                              type="text"
                                                                                                                              name="fullName"
                                                                                                                              required
                                                                                                                              placeholder="John Doe"
                                                                                                                              value={formData.fullName}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    {/* Blood Group */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Blood Group</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Droplet size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <select
                                                                                                                              name="bloodGroup"
                                                                                                                              required
                                                                                                                              value={formData.bloodGroup}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none', background: 'white' }}
                                                                                                                >
                                                                                                                              <option value="">Select Blood Group</option>
                                                                                                                              <option value="A+">A+</option>
                                                                                                                              <option value="A-">A-</option>
                                                                                                                              <option value="B+">B+</option>
                                                                                                                              <option value="B-">B-</option>
                                                                                                                              <option value="O+">O+</option>
                                                                                                                              <option value="O-">O-</option>
                                                                                                                              <option value="AB+">AB+</option>
                                                                                                                              <option value="AB-">AB-</option>
                                                                                                                </select>
                                                                                                  </div>
                                                                                    </div>

                                                                                    {/* Address */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Pincode</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <input
                                                                                                                              type="text"
                                                                                                                              name="pincode"
                                                                                                                              required
                                                                                                                              placeholder="400001"
                                                                                                                              value={formData.pincode}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    {/* Contact Number */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Contact Number</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <input
                                                                                                                              type="tel"
                                                                                                                              name="contact"
                                                                                                                              required
                                                                                                                              placeholder="98765 43210"
                                                                                                                              value={formData.contact}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    {/* Age & Weight Row */}
                                                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                                                                  <div style={{ flex: 1 }}>
                                                                                                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Age (18+)</label>
                                                                                                                <div style={{ position: 'relative' }}>
                                                                                                                              <input
                                                                                                                                            type="number"
                                                                                                                                            name="age"
                                                                                                                                            min="18"
                                                                                                                                            required
                                                                                                                                            placeholder="Age"
                                                                                                                                            value={formData.age}
                                                                                                                                            onChange={handleChange}
                                                                                                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                              />
                                                                                                                </div>
                                                                                                  </div>
                                                                                                  <div style={{ flex: 1 }}>
                                                                                                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Weight (45kg+)</label>
                                                                                                                <div style={{ position: 'relative' }}>
                                                                                                                              <input
                                                                                                                                            type="number"
                                                                                                                                            name="weight"
                                                                                                                                            min="45"
                                                                                                                                            required
                                                                                                                                            placeholder="Kg"
                                                                                                                                            value={formData.weight}
                                                                                                                                            onChange={handleChange}
                                                                                                                                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                              />
                                                                                                                </div>
                                                                                                  </div>
                                                                                    </div>

                                                                                    {/* Gender */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Gender</label>
                                                                                                  <select
                                                                                                                name="gender"
                                                                                                                required
                                                                                                                value={formData.gender || ''}
                                                                                                                onChange={handleChange}
                                                                                                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none', background: 'white' }}
                                                                                                  >
                                                                                                                <option value="">Select Gender</option>
                                                                                                                <option value="Male">Male</option>
                                                                                                                <option value="Female">Female</option>
                                                                                                                <option value="Other">Other</option>
                                                                                                  </select>
                                                                                    </div>

                                                                                    {/* Last Donation */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Last Donation Date (Optional)</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <input
                                                                                                                              type="date"
                                                                                                                              name="lastDonation"
                                                                                                                              value={formData.lastDonation}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none' }}
                                                                                                                />
                                                                                                  </div>
                                                                                                  <small style={{ color: '#94a3b8' }}>Must be greater than 90 days</small>
                                                                                    </div>

                                                                                    {/* Illness / Medical Conditions */}
                                                                                    <div>
                                                                                                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>Any Medical Conditions? (Optional)</label>
                                                                                                  <div style={{ position: 'relative' }}>
                                                                                                                <Activity size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                                                                                                                <textarea
                                                                                                                              name="illness"
                                                                                                                              rows="2"
                                                                                                                              placeholder="e.g. Diabetes, Hypertension..."
                                                                                                                              value={formData.illness}
                                                                                                                              onChange={handleChange}
                                                                                                                              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }}
                                                                                                                />
                                                                                                  </div>
                                                                                    </div>

                                                                                    <motion.button
                                                                                                  whileHover={{ scale: 1.02 }}
                                                                                                  whileTap={{ scale: 0.98 }}
                                                                                                  type="submit"
                                                                                                  style={{
                                                                                                                background: 'var(--color-primary)',
                                                                                                                color: 'white',
                                                                                                                padding: '1rem',
                                                                                                                borderRadius: 'var(--radius-md)',
                                                                                                                fontWeight: 700,
                                                                                                                fontSize: '1rem',
                                                                                                                marginTop: '1rem',
                                                                                                                boxShadow: '0 4px 6px -1px rgba(220, 20, 60, 0.4)'
                                                                                                  }}
                                                                                    >
                                                                                                  Register as Donor
                                                                                    </motion.button>

                                                                      </form>
                                                        </motion.div>
                                          </div>
                            </>
              );
};

export default DonorRegister;
