import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
              const [isOpen, setIsOpen] = React.useState(false);

              const toggleMenu = () => setIsOpen(!isOpen);

              const menuVariants = {
                            closed: { opacity: 0, x: "100%" },
                            open: { opacity: 1, x: 0 }
              };

              return (
                            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-sm" style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)', height: '80px' }}>
                                          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                                                        {/* Logo */}
                                                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                                                      <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                                                      <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--color-primary)' }}>
                                                                                    Blood<span style={{ color: 'var(--color-text-dark)' }}>Connect</span>
                                                                      </span>
                                                        </Link>

                                                        {/* Desktop Links (Hidden on Mobile) */}
                                                        <div className="desktop-only" style={{ gap: '2rem', alignItems: 'center' }}>
                                                                      <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-dark)', textDecoration: 'none' }}>Home</Link>
                                                                      <Link to="/about" style={{ fontWeight: 600, color: 'var(--color-text-dark)', textDecoration: 'none' }}>About</Link>
                                                                      <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>Login</Link>
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
                                                                      <Link to="/register-bank">
                                                                                    <motion.button
                                                                                                  whileHover={{ scale: 1.05 }}
                                                                                                  whileTap={{ scale: 0.95 }}
                                                                                                  style={{
                                                                                                                background: 'transparent',
                                                                                                                border: '2px solid #2563eb', // Blue to distinguish?
                                                                                                                color: '#2563eb',
                                                                                                                padding: '0.6rem 1.2rem',
                                                                                                                borderRadius: 'var(--radius-md)',
                                                                                                                fontWeight: 700
                                                                                                  }}
                                                                                    >
                                                                                                  For Blood Bank
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

                                                        {/* Mobile Menu Toggle */}
                                                        <div className="mobile-only">
                                                                      <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dark)' }}>
                                                                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                                                      </button>
                                                        </div>
                                          </div>

                                          {/* Mobile Menu Overlay */}
                                          <AnimatePresence>
                                                        {isOpen && (
                                                                      <motion.div
                                                                                    initial="closed"
                                                                                    animate="open"
                                                                                    exit="closed"
                                                                                    variants={menuVariants}
                                                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                                                    style={{
                                                                                                  position: 'fixed',
                                                                                                  top: '80px',
                                                                                                  left: 0,
                                                                                                  right: 0,
                                                                                                  bottom: 0,
                                                                                                  height: 'calc(100vh - 80px)',
                                                                                                  backgroundColor: '#ffffff', // Explicit color
                                                                                                  padding: '2rem',
                                                                                                  display: 'flex',
                                                                                                  flexDirection: 'column',
                                                                                                  gap: '2rem',
                                                                                                  zIndex: 100, // Higher Z-Index
                                                                                                  borderTop: '1px solid #e2e8f0',
                                                                                                  overflowY: 'auto' // Handle small screens scrolling
                                                                                    }}
                                                                      >
                                                                                    <Link to="/" onClick={toggleMenu} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>Home</Link>
                                                                                    <Link to="/about" onClick={toggleMenu} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>About</Link>
                                                                                    <Link to="/login" onClick={toggleMenu} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>Login</Link>

                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                                                                                  <Link to="/register-donor" onClick={toggleMenu}>
                                                                                                                <button style={{ width: '100%', padding: '1rem', border: '2px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1rem' }}>
                                                                                                                              Be a Donor
                                                                                                                </button>
                                                                                                  </Link>
                                                                                                  <Link to="/emergency" onClick={toggleMenu}>
                                                                                                                <button style={{ width: '100%', padding: '1rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1rem', border: 'none' }}>
                                                                                                                              Find Blood
                                                                                                                </button>
                                                                                                  </Link>
                                                                                    </div>
                                                                      </motion.div>
                                                        )}
                                          </AnimatePresence>
                            </nav>
              );
};

export default Navbar;
