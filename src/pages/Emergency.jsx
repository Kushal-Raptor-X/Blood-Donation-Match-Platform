import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import DonorMap from '../components/Map/DonorMap';
import GeminiAdvisor from '../components/AI/GeminiAdvisor';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, AlertTriangle, Heart } from 'lucide-react';
import { useJsApiLoader } from '@react-google-maps/api';

import { getDonors, createEmergencyAlert } from '../services/donorService';

const libraries = ['places', 'geometry'];

const Emergency = () => {
    const location = useLocation();
    const [donors, setDonors] = useState([]);
    const [processedDonors, setProcessedDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recipientBloodGroup, setRecipientBloodGroup] = useState(location.state?.bloodGroup || 'O+');
    const [patientLocation, setPatientLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('Initializing...');
    const [selectedDonorId, setSelectedDonorId] = useState(null);
    // Removed SOS local state


    // Load Maps Script
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    });

    // 1. Fetch Donors & Patient Location
    useEffect(() => {
        let mounted = true;

        const fetchInitialData = async () => {
            try {
                const data = await getDonors();
                if (mounted) setDonors(data || []);

                // Safe Geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            if (mounted) {
                                console.log("Patient Location:", position.coords);
                                setPatientLocation({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                });
                                setLocationStatus('Location Found');
                            }
                        },
                        (err) => {
                            console.error("Loc Error:", err);
                            if (mounted) setLocationStatus('Location Denied');
                            // Fallback to Mumbai Center if denied, so map still works of course
                            if (mounted) setPatientLocation({ lat: 19.0760, lng: 72.8777 });
                        }
                    );
                } else {
                    if (mounted) {
                        setLocationStatus('Geo Unsupported');
                        setPatientLocation({ lat: 19.0760, lng: 72.8777 });
                    }
                }
            } catch (e) {
                console.error("Init Error:", e);
            }
        };

        fetchInitialData();

        return () => { mounted = false; };
    }, []);

    // 2.5 Handle Incoming Alert from Home Page
    useEffect(() => {
        if (location.state?.alertSent && !loading && finalDisplayList.length > 0) {
            // Auto Select Nearest
            const nearest = finalDisplayList[0];
            handleSelectDonor(nearest);
        }
    }, [location.state, loading, processedDonors]); // Dependencies to ensure logic runs after load

    // 2. Geocode & Process (Only when Script Loaded)
    useEffect(() => {
        if (!isLoaded || donors.length === 0) return;
        if (!window.google || !window.google.maps) return;

        const processDonors = async () => {
            try {
                const geocoder = new window.google.maps.Geocoder();

                const geocodedResults = await Promise.all(donors.map(async (donor) => {
                    // Reuse existing
                    if (donor.location && typeof donor.location.lat === 'number') return donor;

                    // Skip bad data
                    if (!donor.pincode) return { ...donor, location: null };

                    // Geocode
                    return new Promise((resolve) => {
                        geocoder.geocode({ address: `${donor.pincode}, Mumbai, India` }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                const loc = results[0].geometry.location;
                                resolve({
                                    ...donor,
                                    location: { lat: loc.lat(), lng: loc.lng() }
                                });
                            } else {
                                // Fallback / Mock
                                const pinVal = parseInt(donor.pincode.replace(/\D/g, '') || '0');
                                resolve({
                                    ...donor,
                                    location: {
                                        lat: 19.07 + (pinVal % 100) * 0.001,
                                        lng: 72.87 + (pinVal % 50) * 0.001
                                    },
                                    isMock: true
                                });
                            }
                        });
                    });
                }));

                // Calculate Distance logic (Safe Check)
                const sorted = geocodedResults.map(d => {
                    if (!patientLocation || !d.location) return { ...d, distance: 999, time: 999 };

                    const dist = calculateDistance(patientLocation.lat, patientLocation.lng, d.location.lat, d.location.lng);
                    return {
                        ...d,
                        distance: dist,
                        time: Math.round((dist / 20) * 60)
                    };
                }).sort((a, b) => a.distance - b.distance);

                setProcessedDonors(sorted);
                setLoading(false);
            } catch (err) {
                console.error("Processing Error:", err);
                setLoading(false);
            }
        };

        processDonors();

    }, [isLoaded, donors, patientLocation]);

    // Helper: Haversine
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10;
    };

    const getCompatibleBloodGroups = (recipientGroup) => {
        switch (recipientGroup) {
            case 'O-': return ['O-'];
            case 'O+': return ['O-', 'O+'];
            case 'A-': return ['O-', 'A-'];
            case 'A+': return ['O-', 'O+', 'A-', 'A+'];
            case 'B-': return ['O-', 'B-'];
            case 'B+': return ['O-', 'O+', 'B-', 'B+'];
            case 'AB-': return ['O-', 'B-', 'A-', 'AB-'];
            case 'AB+': return ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
            default: return [];
        }
    };

    const finalDisplayList = recipientBloodGroup
        ? processedDonors.filter(d => getCompatibleBloodGroups(recipientBloodGroup).includes(d.bloodGroup))
        : processedDonors;

    // Handle Selection (Bi-directional)
    const handleSelectDonor = (donor) => {
        setSelectedDonorId(donor.id);

        // Auto-Scroll list
        const listItem = document.getElementById(`donor-item-${donor.id}`);
        if (listItem) {
            listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    // SOS LOGIC
    const handleSOS = async () => {
        if (!patientLocation) {
            alert("Location not found yet. Please wait.");
            return;
        }

        // 1. Find Nearest Donor
        if (finalDisplayList.length > 0) {
            const nearest = finalDisplayList[0];
            setSelectedDonorId(nearest.id); // Highlight on Map & List

            // Auto-scroll
            const listItem = document.getElementById(`donor-item-${nearest.id}`);
            if (listItem) listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // 2. Mock Backend Alert
        const alertData = {
            location: patientLocation,
            bloodGroup: recipientBloodGroup || 'Unknown',
            type: 'SOS'
        };

        // Fire and forget (awaiting for demo feedback)
        const res = await createEmergencyAlert(alertData);
        if (res.success) {
            setAlertSent(true);
        }

        // 3. UI
        setSosModalOpen(true);
    };

    // Safety check for Map Loading
    if (loadError) return <div>Map Load Error: {loadError.message}</div>;

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="emergency-layout">

                {/* LIST PANEL */}
                <div className="emergency-sidebar">
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0 }}>Emergency Search</h2>
                            <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: '#f0f9ff', color: '#0369a1', borderRadius: '12px' }}>
                                {locationStatus}
                            </span>
                        </div>

                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>Patient's Blood Type</label>
                            <select
                                value={recipientBloodGroup}
                                onChange={(e) => setRecipientBloodGroup(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: 'bold', color: '#334155' }}
                            >
                                <option value="">Select Patient Type</option>
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

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        {!isLoaded || loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                <p>Finding nearest donors...</p>
                            </div>
                        ) : finalDisplayList.length === 0 ? (
                            <p style={{ color: '#64748b', textAlign: 'center' }}>No compatible donors found nearby.</p>
                        ) : (
                            finalDisplayList.map((donor) => {
                                const isSelected = selectedDonorId === donor.id;
                                return (
                                    <motion.div
                                        key={donor.id}
                                        id={`donor-item-${donor.id}`} // Hook for auto-scroll
                                        onClick={() => handleSelectDonor(donor)}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: isSelected ? 1.02 : 1,
                                            borderColor: isSelected ? '#3b82f6' : '#f1f5f9'
                                        }}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            background: isSelected ? '#eff6ff' : 'white',
                                            boxShadow: isSelected ? '0 4px 6px -1px rgba(59, 130, 246, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                                            marginBottom: '1rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{donor.fullName || "Donor"}</h3>
                                            <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.25rem 0.5rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>{donor.bloodGroup}</span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0f172a', fontWeight: 600, fontSize: '0.9rem' }}>
                                                <MapPin size={14} color="#2563eb" />
                                                <span>
                                                    {donor.distance < 999 ? `${donor.distance} km` : 'Unknown'}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                <Clock size={14} />
                                                <span>
                                                    {donor.time < 999 ? `~${donor.time} min` : '--'}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                                            {donor.pincode} • {donor.gender || 'Donor'} • {donor.age ? `${donor.age} yrs` : ''}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{ flex: 1, padding: '0.5rem', background: '#e11d48', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                                                <Phone size={14} /> Call
                                            </button>
                                            <button style={{ flex: 1, padding: '0.5rem', background: '#2563eb', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                                                <MessageCircle size={14} /> Chat
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* MAP PANEL */}
                <div className="emergency-map">
                    {isLoaded && (
                        <DonorMap
                            donors={finalDisplayList}
                            selectedDonorId={selectedDonorId}
                            onMarkerClick={handleSelectDonor}
                            recipientLocation={patientLocation}
                        />
                    )}

                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10 }}>
                        <GeminiAdvisor />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Emergency;
