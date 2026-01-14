import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award } from 'lucide-react';

const About = () => {
              return (
                            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                                          <Navbar />

                                          <div style={{ flex: 1, background: '#f8fafc', padding: '4rem 1rem' }}>
                                                        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                                                                      {/* Hero Section */}
                                                                      <motion.div
                                                                                    initial={{ opacity: 0, y: 20 }}
                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                                                                      >
                                                                                    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
                                                                                                  About <span style={{ color: '#dc2626' }}>BloodConnect</span>
                                                                                    </h1>
                                                                                    <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                                                                                                  We are a team of passionate developers participating in a hackathon to solve the critical issue of blood shortage and emergency response times.
                                                                                    </p>
                                                                      </motion.div>

                                                                      {/* Mission Grid */}
                                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                                                                                    {[
                                                                                                  { icon: <Heart size={32} color="#dc2626" />, title: "Our Mission", desc: "To bridge the gap between donors and patients with real-time geolocation technology." },
                                                                                                  { icon: <Users size={32} color="#2563eb" />, title: "The Team", desc: "A dedicated group of 4 innovators: Kushal, Saloni, Manaswini, and Puneet." },
                                                                                                  { icon: <Globe size={32} color="#16a34a" />, title: "Impact", desc: "Reducing emergency response times from hours to minutes using Google Maps integration." }
                                                                                    ].map((item, i) => (
                                                                                                  <motion.div
                                                                                                                key={i}
                                                                                                                initial={{ opacity: 0, y: 20 }}
                                                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                                                transition={{ delay: i * 0.1 }}
                                                                                                                style={{
                                                                                                                              background: 'white',
                                                                                                                              padding: '2rem',
                                                                                                                              borderRadius: '16px',
                                                                                                                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                                                                                              textAlign: 'center'
                                                                                                                }}
                                                                                                  >
                                                                                                                <div style={{ background: '#fef2f2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                                                                                                              {item.icon}
                                                                                                                </div>
                                                                                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>{item.title}</h3>
                                                                                                                <p style={{ color: '#64748b', lineHeight: '1.5' }}>{item.desc}</p>
                                                                                                  </motion.div>
                                                                                    ))}
                                                                      </div>

                                                                      {/* Story Section */}
                                                                      <motion.div
                                                                                    initial={{ opacity: 0 }}
                                                                                    animate={{ opacity: 1 }}
                                                                                    transition={{ delay: 0.4 }}
                                                                                    style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                                                      >
                                                                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>Why We Built This</h2>
                                                                                    <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '1.1rem' }}>
                                                                                                  Every few seconds, someone needs blood. Yet, finding a donor in a specific location during an emergency is often a chaotic process involving frantic phone calls and social media posts.
                                                                                    </p>
                                                                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.1rem' }}>
                                                                                                  <strong>BloodConnect</strong> solves this by creating a direct, digital bridge. We treat blood donation like a ride-sharing service—instant, location-aware, and reliable.
                                                                                    </p>
                                                                      </motion.div>

                                                        </div>
                                          </div>

                                          <Footer />
                            </div>
              );
};

export default About;
