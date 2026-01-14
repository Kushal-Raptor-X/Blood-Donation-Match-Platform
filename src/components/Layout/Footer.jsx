import React from 'react';
import { Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
              const creators = [
                            { name: 'Kushal', url: 'https://github.com/Kushal-Raptor-X' },
                            { name: 'Saloni', url: 'https://github.com/2024salonisherkhane-byte' },
                            { name: 'Manaswini', url: 'https://github.com/Manas-wini-code' },
                            { name: 'Puneet', url: 'https://github.com/Puneet-26' }
              ];

              return (
                            <footer style={{
                                          background: 'linear-gradient(to right, #0f172a, #1e293b)',
                                          color: 'white',
                                          padding: '4rem 1rem 2rem',
                                          marginTop: 'auto',
                                          borderTop: '1px solid #334155'
                            }}>
                                          <div className="container" style={{
                                                        maxWidth: '1200px',
                                                        margin: '0 auto',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '2.5rem'
                                          }}>
                                                        {/* Brand Section */}
                                                        <div style={{ textAlign: 'center' }}>
                                                                      <div style={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    gap: '0.75rem',
                                                                                    marginBottom: '1rem'
                                                                      }}>
                                                                                    <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                                                                                                  <Heart fill="#dc2626" color="#dc2626" size={24} />
                                                                                    </div>
                                                                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                                                                                                  Blood<span style={{ color: '#ef4444' }}>Connect</span>
                                                                                    </h3>
                                                                      </div>
                                                                      <p style={{ color: '#94a3b8', maxWidth: '500px', lineHeight: '1.6' }}>
                                                                                    Connecting donors with those in need. Saving lives through technology and community.
                                                                      </p>
                                                        </div>

                                                        {/* Creators Section */}
                                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                                                      <h4 style={{
                                                                                    fontSize: '0.9rem',
                                                                                    textTransform: 'uppercase',
                                                                                    letterSpacing: '1px',
                                                                                    color: '#64748b',
                                                                                    marginBottom: '1.5rem',
                                                                                    fontWeight: 700
                                                                      }}>
                                                                                    Built with ❤️ by Team
                                                                      </h4>

                                                                      <div style={{
                                                                                    display: 'flex',
                                                                                    flexWrap: 'wrap',
                                                                                    justifyContent: 'center',
                                                                                    gap: '1rem'
                                                                      }}>
                                                                                    {creators.map((creator) => (
                                                                                                  <a
                                                                                                                key={creator.name}
                                                                                                                href={creator.url}
                                                                                                                target="_blank"
                                                                                                                rel="noopener noreferrer"
                                                                                                                style={{ textDecoration: 'none' }}
                                                                                                  >
                                                                                                                <motion.button
                                                                                                                              whileHover={{ scale: 1.05, y: -2 }}
                                                                                                                              whileTap={{ scale: 0.95 }}
                                                                                                                              style={{
                                                                                                                                            display: 'flex',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            gap: '0.6rem',
                                                                                                                                            padding: '0.75rem 1.25rem',
                                                                                                                                            background: 'rgba(255,255,255,0.05)',
                                                                                                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                                                                                                            borderRadius: '12px',
                                                                                                                                            color: '#e2e8f0',
                                                                                                                                            cursor: 'pointer',
                                                                                                                                            transition: 'all 0.2s ease',
                                                                                                                                            fontSize: '0.95rem',
                                                                                                                                            fontWeight: 500
                                                                                                                              }}
                                                                                                                >
                                                                                                                              <Github size={18} />
                                                                                                                              <span>{creator.name}</span>
                                                                                                                </motion.button>
                                                                                                  </a>
                                                                                    ))}
                                                                      </div>
                                                        </div>

                                                        {/* Copyright */}
                                                        <div style={{
                                                                      borderTop: '1px solid rgba(255,255,255,0.1)',
                                                                      width: '100%',
                                                                      paddingTop: '2rem',
                                                                      textAlign: 'center',
                                                                      color: '#64748b',
                                                                      fontSize: '0.85rem'
                                                        }}>
                                                                      <p>© {new Date().getFullYear()} BloodConnect. Hackathon Project.</p>
                                                        </div>
                                          </div>
                            </footer>
              );
};

export default Footer;
