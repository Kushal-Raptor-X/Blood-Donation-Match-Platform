import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiAdvisor = () => {
              const [isOpen, setIsOpen] = useState(false);
              const [loading, setLoading] = useState(false);
              const [advice, setAdvice] = useState(null);

              // TODO: Replace with your actual Gemini API Key from Google AI Studio
              const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

              // MOCKED for Hackathon Stability
              const getAdvice = () => {
                            setLoading(true);
                            setTimeout(() => {
                                          setAdvice("Based on proximity and compatibility, **Rahul Sharma** (1.2km) is your fastest option. O- is also available as backup.");
                                          setLoading(false);
                            }, 1500);
              };

              return (
                            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
                                          {/* ... keeping the rest of the UI same ... */}
                                          <AnimatePresence>
                                                        {isOpen && (
                                                                      <motion.div
                                                                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                                                                    style={{
                                                                                                  background: 'white',
                                                                                                  padding: '1.5rem',
                                                                                                  borderRadius: '16px',
                                                                                                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                                                                                  marginBottom: '1rem',
                                                                                                  width: '320px',
                                                                                                  border: '2px solid transparent',
                                                                                                  backgroundClip: 'padding-box',
                                                                                                  position: 'relative'
                                                                                    }}
                                                                      >
                                                                                    {/* Gradient Border Trick */}
                                                                                    <div style={{
                                                                                                  position: 'absolute',
                                                                                                  inset: '-2px',
                                                                                                  zIndex: -1,
                                                                                                  background: 'linear-gradient(to right, #4285F4, #DB4437, #F4B400, #0F9D58)',
                                                                                                  borderRadius: '18px',
                                                                                    }} />

                                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                                                                                                                <Sparkles size={18} fill="url(#sparkle-gradient)" color="#4285F4" />
                                                                                                                <span>Gemini Smart Assist</span>
                                                                                                  </div>
                                                                                                  <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
                                                                                    </div>

                                                                                    {loading ? (
                                                                                                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', padding: '1rem' }}>
                                                                                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '8px', height: '8px', background: '#4285F4', borderRadius: '50%' }} />
                                                                                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '8px', height: '8px', background: '#DB4437', borderRadius: '50%' }} />
                                                                                                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '8px', height: '8px', background: '#F4B400', borderRadius: '50%' }} />
                                                                                                  </div>
                                                                                    ) : advice ? (
                                                                                                  <div>
                                                                                                                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>{advice}</p>
                                                                                                                <button style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }} onClick={() => setAdvice(null)}>Ask again</button>
                                                                                                  </div>
                                                                                    ) : (
                                                                                                  <div>
                                                                                                                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>I can analyze donor proximity and traffic to suggest the best match (Compatible with O+).</p>
                                                                                                                <button
                                                                                                                              onClick={getAdvice}
                                                                                                                              style={{ width: '100%', padding: '0.75rem', background: 'var(--color-google-blue)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                                                                                                                              Analyze Best Match
                                                                                                                </button>
                                                                                                  </div>
                                                                                    )}
                                                                      </motion.div>
                                                        )}
                                          </AnimatePresence>

                                          <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setIsOpen(!isOpen)}
                                                        style={{
                                                                      width: '56px',
                                                                      height: '56px',
                                                                      borderRadius: '50%',
                                                                      background: 'white',
                                                                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                                      border: 'none',
                                                                      display: 'flex',
                                                                      alignItems: 'center',
                                                                      justifyContent: 'center',
                                                                      cursor: 'pointer'
                                                        }}
                                          >
                                                        {isOpen ? <X color="#64748b" /> : <Sparkles color="#4285F4" />}
                                          </motion.button>
                            </div>
              );
};

export default GeminiAdvisor;
