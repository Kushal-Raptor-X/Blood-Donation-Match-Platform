import React, { useState } from 'react'; // Updated
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, ShieldCheck, Zap, X, AlertTriangle } from 'lucide-react';
import { createEmergencyAlert } from '../services/donorService';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [sosModalOpen, setSosModalOpen] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('O+');
    const [alerting, setAlerting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSOSClick = () => {
        setSosModalOpen(true);
    };

    const handleConfirmSOS = async () => {
        setAlerting(true);

        // 1. Get Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // 2. Send Alert
                const alertData = {
                    location,
                    bloodGroup,
                    type: 'SOS'
                };

                await createEmergencyAlert(alertData);

                setAlerting(false);
                setSuccess(true);

                // 3. Redirect after short delay
                setTimeout(() => {
                    navigate('/emergency', { state: { alertSent: true, bloodGroup } });
                }, 1500);

            }, (err) => {
                console.error("Loc Error", err);
                alert("Could not get location. Redirecting to manual search.");
                navigate('/emergency');
            });
        } else {
            alert("Geolocation not supported.");
            navigate('/emergency');
        }
    };

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

                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Saving Lives in <br />
                            <span className="text-gradient">Seconds, Not Hours.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            We use <strong style={{ color: 'var(--color-text-dark)' }}>Google Maps</strong> to instantly match critical blood requests with nearby verified donors.
                            Verified Donors. Instant alerts. No delays.
                        </p>

                        {/* EMERGENCY SOS CTA */}
                        {/* EMERGENCY SOS CTA */}
                        <div style={{ marginBottom: '2rem' }}>
                            {/* Replaced Link with Button Trigger */}
                            <motion.button
                                onClick={handleSOSClick}
                                animate={{
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        "0 0 0 0px rgba(220, 38, 38, 0.7)",
                                        "0 0 0 10px rgba(220, 38, 38, 0)",
                                        "0 0 0 0px rgba(220, 38, 38, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                                style={{
                                    background: '#dc2626',
                                    color: 'white',
                                    padding: '1.25rem 3rem',
                                    fontSize: '1.5rem',
                                    borderRadius: '50px',
                                    fontWeight: 800,
                                    border: '4px solid #fecaca',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <Zap size={28} fill="white" />
                                EMERGENCY SOS
                            </motion.button>
                            <p style={{ marginTop: '0.5rem', color: '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>
                                Instant Alert to Nearest Donors
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                            <Link to="/emergency" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        color: '#2563eb', // Blue
                                        padding: '1rem 1.5rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        fontWeight: 700,
                                        border: '2px solid #2563eb', // Blue
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Activity size={20} />
                                    Find Blood Now
                                </motion.button>
                            </Link>
                            <Link to="/register-donor" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        color: '#2563eb', // Blue
                                        padding: '1rem 1.5rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        fontWeight: 700,
                                        border: '2px solid #2563eb' // Blue
                                    }}
                                >
                                    Join as Donor
                                </motion.button>
                            </Link>

                            <Link to="/register-bank" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        color: '#2563eb', // Blue
                                        padding: '1rem 1.5rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        fontWeight: 700,
                                        border: '2px solid #2563eb' // Blue
                                    }}
                                >
                                    Join as Blood Bank
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

            <Footer />

            {/* SOS ENTRY MODAL */}
            {
                sosModalOpen && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', textAlign: 'center', maxWidth: '450px', width: '90%', position: 'relative' }}
                        >
                            {!success ? (
                                <>
                                    <button onClick={() => setSosModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#94a3b8" /></button>

                                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ padding: '1rem', background: '#fee2e2', borderRadius: '50%', marginBottom: '1rem' }}>
                                            <AlertTriangle size={40} color="#dc2626" />
                                        </div>
                                        <h2 style={{ fontSize: '1.8rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>Broadcast Emergency</h2>
                                        <p style={{ color: '#64748b' }}>Select patient data to match nearest donors.</p>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: '#475569' }}>Blood Group Required</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                                <button
                                                    key={bg}
                                                    onClick={() => setBloodGroup(bg)}
                                                    style={{
                                                        padding: '0.75rem',
                                                        borderRadius: '8px',
                                                        border: bloodGroup === bg ? '2px solid #dc2626' : '1px solid #e2e8f0',
                                                        background: bloodGroup === bg ? '#fef2f2' : 'white',
                                                        fontWeight: 'bold',
                                                        color: bloodGroup === bg ? '#dc2626' : '#64748b',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {bg}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleConfirmSOS}
                                        disabled={alerting}
                                        style={{
                                            width: '100%',
                                            padding: '1.25rem',
                                            background: alerting ? '#94a3b8' : '#dc2626',
                                            color: 'white',
                                            fontSize: '1.1rem',
                                            fontWeight: 800,
                                            border: 'none',
                                            borderRadius: '16px',
                                            cursor: alerting ? 'wait' : 'pointer',
                                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {alerting ? 'Sending Alert...' : <> <Zap fill="white" size={20} /> SEND ALERT NOW </>}
                                    </button>
                                </>
                            ) : (
                                <div style={{ padding: '1rem 0' }}>
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}
                                    >
                                        <Zap size={40} fill="#16a34a" />
                                    </motion.div>
                                    <h2 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '0.5rem' }}>Alert Sent!</h2>
                                    <p style={{ color: '#64748b', marginBottom: '1rem' }}>Redirecting you to the nearest donor...</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )
            }
        </>
    );
};

export default Home;
