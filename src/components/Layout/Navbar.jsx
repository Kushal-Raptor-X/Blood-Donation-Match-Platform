import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
              const [isOpen, setIsOpen] = React.useState(false);

              return (
                            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-sm" style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)' }}>
                                          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                                                        {/* Logo */}
                                                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                                                      <div style={{ background: 'var(--color-primary)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Heart color="white" fill="white" size={24} />
                                                                      </div>
                                                                      <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--color-primary)' }}>
                                                                                    Blood<span style={{ color: 'var(--color-text-dark)' }}>Match</span>
                                                                      </span>
                                                        </Link>

                                                        {/* Desktop Links */}
                                                        <div className="hidden md:flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                                      <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>Home</Link>
                                                                      <Link to="/about" style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>About</Link>
                                                                      <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Login</Link>
                                                                      <Link to="/register-donor">
                                                                                    <motion.button
                                                                                                  whileHover={{ scale: 1.05 }}
                                                                                                  whileTap={{ scale: 0.95 }}
                                                                                                  style={{
                                                                                                                background: 'transparent',
                                                                                                                border: '2px solid var(--color-primary)',
                                                                                                                color: 'var(--color-primary)',
                                                                                                                padding: '0.6rem 1.2rem',
                                                                                                                borderRadius: 'var(--radius-md)',
                                                                                                                fontWeight: 700
                                                                                                  }}
                                                                                    >
                                                                                                  Be a Donor
                                                                                    </motion.button>
                                                                      </Link>
                                                                      <Link to="/emergency">
                                                                                    <motion.button
                                                                                                  whileHover={{ scale: 1.05 }}
                                                                                                  whileTap={{ scale: 0.95 }}
                                                                                                  style={{
                                                                                                                background: 'var(--color-primary)',
                                                                                                                color: 'white',
                                                                                                                padding: '0.6rem 1.5rem',
                                                                                                                borderRadius: 'var(--radius-md)',
                                                                                                                boxShadow: '0 4px 14px 0 rgba(220, 20, 60, 0.39)',
                                                                                                                fontWeight: 700,
                                                                                                                border: 'none'
                                                                                                  }}
                                                                                    >
                                                                                                  Find Blood
                                                                                    </motion.button>
                                                                      </Link>
                                                        </div>
                                          </div>
                            </nav>
              );
};

export default Navbar;
