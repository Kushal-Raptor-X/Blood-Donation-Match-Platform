import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Home = () => {
              return (
                            <>
                                          <Navbar />
                                          <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

                                                        {/* Abstract Background Blobs */}
                                                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(220,20,60,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: -1 }}></div>
                                                        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(66,133,244,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: -1 }}></div>

                                                        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
                                                                      <motion.div
                                                                                    initial={{ opacity: 0, y: 30 }}
                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                    transition={{ duration: 0.8 }}
                                                                      >
                                                                                    <span style={{
                                                                                                  background: 'rgba(220, 20, 60, 0.1)',
                                                                                                  color: 'var(--color-primary)',
                                                                                                  padding: '0.5rem 1rem',
                                                                                                  borderRadius: '50px',
                                                                                                  fontWeight: 700,
                                                                                                  fontSize: '0.9rem',
                                                                                                  textTransform: 'uppercase',
                                                                                                  letterSpacing: '1px',
                                                                                                  display: 'inline-block',
                                                                                                  marginBottom: '1.5rem'
                                                                                    }}>
                                                                                                  #TechSprint Hackathon
                                                                                    </span>
                                                                                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                                                                                                  Connect Life in <br />
                                                                                                  <span className="text-gradient">Seconds, Not Hours.</span>
                                                                                    </h1>
                                                                                    <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                                                                                  We use <strong style={{ color: 'var(--color-text-dark)' }}>Google Maps</strong> & <strong style={{ color: 'var(--color-text-dark)' }}>Gemini AI</strong> to instantly match critical blood requests with nearby verified donors.
                                                                                                  Verified Donors. Instant alerts. No delays.
                                                                                    </p>

                                                                                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                                                                  <Link to="/emergency">
                                                                                                                <motion.button
                                                                                                                              whileHover={{ scale: 1.05 }}
                                                                                                                              whileTap={{ scale: 0.95 }}
                                                                                                                              style={{
                                                                                                                                            background: 'var(--color-primary)',
                                                                                                                                            color: 'white',
                                                                                                                                            padding: '1rem 2.5rem',
                                                                                                                                            fontSize: '1.1rem',
                                                                                                                                            borderRadius: '50px',
                                                                                                                                            boxShadow: '0 10px 25px -5px rgba(220, 20, 60, 0.4)',
                                                                                                                                            fontWeight: 700,
                                                                                                                                            border: 'none',
                                                                                                                                            display: 'flex',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            gap: '0.5rem'
                                                                                                                              }}
                                                                                                                >
                                                                                                                              <Activity size={20} />
                                                                                                                              Find Donors Now
                                                                                                                </motion.button>
                                                                                                  </Link>
                                                                                                  <Link to="/register-donor">
                                                                                                                <motion.button
                                                                                                                              whileHover={{ scale: 1.05 }}
                                                                                                                              whileTap={{ scale: 0.95 }}
                                                                                                                              style={{
                                                                                                                                            background: 'white',
                                                                                                                                            color: 'var(--color-text-dark)',
                                                                                                                                            padding: '1rem 2.5rem',
                                                                                                                                            fontSize: '1.1rem',
                                                                                                                                            borderRadius: '50px',
                                                                                                                                            boxShadow: 'var(--shadow-lg)',
                                                                                                                                            fontWeight: 700,
                                                                                                                                            border: '1px solid #e2e8f0'
                                                                                                                              }}
                                                                                                                >
                                                                                                                              Join as Donor
                                                                                                                </motion.button>
                                                                                                  </Link>
                                                                                    </div>
                                                                      </motion.div>

                                                                      {/* Features Grid */}
                                                                      <motion.div
                                                                                    initial={{ opacity: 0, y: 40 }}
                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                    transition={{ delay: 0.3, duration: 0.8 }}
                                                                                    style={{
                                                                                                  marginTop: '5rem',
                                                                                                  display: 'grid',
                                                                                                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                                                                  gap: '2rem',
                                                                                                  textAlign: 'left'
                                                                                    }}
                                                                      >
                                                                                    {[
                                                                                                  { icon: <Zap color="#f59e0b" />, title: 'Instant Matching', desc: 'AI-powered algorithm finds the fastest route.' },
                                                                                                  { icon: <ShieldCheck color="#34A853" />, title: 'Verified Donors', desc: 'Trusted community of superhero volunteers.' },
                                                                                                  { icon: <Activity color="#DC143C" />, title: 'Live Tracking', desc: 'See donors approaching on Google Maps.' }
                                                                                    ].map((feature, i) => (
                                                                                                  <div key={i} style={{
                                                                                                                background: 'rgba(255,255,255,0.6)',
                                                                                                                backdropFilter: 'blur(10px)',
                                                                                                                padding: '1.5rem',
                                                                                                                borderRadius: 'var(--radius-md)',
                                                                                                                border: '1px solid white',
                                                                                                                boxShadow: 'var(--shadow-sm)'
                                                                                                  }}>
                                                                                                                <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
                                                                                                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{feature.title}</h3>
                                                                                                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{feature.desc}</p>
                                                                                                  </div>
                                                                                    ))}
                                                                      </motion.div>
                                                        </div>
                                          </div>
                            </>
              );
};

export default Home;
