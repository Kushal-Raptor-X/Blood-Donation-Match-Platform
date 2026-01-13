import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
              width: '100%',
              height: '100%',
              borderRadius: '12px'
};

const defaultCenter = {
              lat: 19.0760, // Mumbai coordinates (example)
              lng: 72.8777
};

// If you have a custom marker, you can use it, otherwise default styling
// import donorMarker from '../../assets/donor-marker.png';

/**
 * DonorMap Component
 * Purely presentational.
 * Controlled by parent via 'selectedDonorId' and 'onMarkerClick'.
 * 
 * Features Merged:
 * 1. Donors Display (Red Makers)
 * 2. Blood Banks Display (Blue Icons)
 * 3. Recipient Location (Blue Dot)
 */
const DonorMap = ({ donors, bloodBanks = [], selectedDonorId, onMarkerClick, recipientLocation }) => {
              const [map, setMap] = useState(null);
              const [activeItem, setActiveItem] = useState(null);

              // Sync Active Item with selectedDonorId prop
              useEffect(() => {
                            if (selectedDonorId) {
                                          const item = [...donors, ...bloodBanks].find(d => d.id === selectedDonorId);
                                          if (item) {
                                                        setActiveItem(item);
                                                        // Optional: Pan to item
                                                        if (map && item.location) {
                                                                      map.panTo(item.location);
                                                                      map.setZoom(14); // Zoom in when selected
                                                        }
                                          }
                            } else {
                                          setActiveItem(null);
                            }
              }, [selectedDonorId, donors, bloodBanks, map]);

              const onLoad = React.useCallback(function callback(map) {
                            setMap(map);
              }, []);

              const onUnmount = React.useCallback(function callback(map) {
                            setMap(null);
              }, []);

              return (
                            <GoogleMap
                                          mapContainerStyle={containerStyle}
                                          center={recipientLocation || defaultCenter}
                                          zoom={11}
                                          onLoad={onLoad}
                                          onUnmount={onUnmount}
                                          options={{
                                                        zoomControl: true,
                                                        streetViewControl: false,
                                                        mapTypeControl: false,
                                                        fullscreenControl: false,
                                                        styles: [
                                                                      {
                                                                                    "featureType": "poi.medical",
                                                                                    "elementType": "geometry",
                                                                                    "stylers": [{ "color": "#fde2e2" }]
                                                                      }
                                                        ]
                                          }}
                            >
                                          {/* 1. Recipient / User Location Marker (Blue Dot) */}
                                          {recipientLocation && (
                                                        <Marker
                                                                      position={recipientLocation}
                                                                      icon={{
                                                                                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                                                      }}
                                                                      zIndex={100} // Keep on top
                                                                      title="Your Location"
                                                        />
                                          )}

                                          {/* 2. Render Items (Donors & Blood Banks) */}
                                          {donors.map((item) => {
                                                        if (!item.location || typeof item.location.lat !== 'number') return null;
                                                        const isSelected = activeItem && activeItem.id === item.id;
                                                        const isBank = item.type === 'Blood Bank';

                                                        return (
                                                                      <Marker
                                                                                    key={item.id}
                                                                                    position={item.location}
                                                                                    icon={isBank ? {
                                                                                                  // Data URI for a Blue Rounded Square with a White Plus Sign
                                                                                                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#2563eb"/><path fill="#ffffff" d="M11 7h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/></svg>'),
                                                                                                  scaledSize: new window.google.maps.Size(40, 40),
                                                                                                  anchor: new window.google.maps.Point(20, 20)
                                                                                    } : undefined} // Default Red Marker if undefined
                                                                                    animation={isSelected && window.google ? window.google.maps.Animation.BOUNCE : null}
                                                                                    onClick={() => {
                                                                                                  onMarkerClick && onMarkerClick(item);
                                                                                    }}
                                                                      />
                                                        );
                                          })}

                                          {/* 4. Info Window (Shared for Donors & Banks) */}
                                          {activeItem && activeItem.location && (
                                                        <InfoWindow
                                                                      position={activeItem.location}
                                                                      onCloseClick={() => {
                                                                                    setActiveItem(null);
                                                                      }}
                                                        >
                                                                      <div style={{ padding: '0.5rem', maxWidth: '200px' }}>
                                                                                    <h3 style={{ margin: '0 0 5px', color: activeItem.type === 'Blood Bank' ? '#2563eb' : '#DC143C', fontSize: '1rem' }}>
                                                                                                  {activeItem.type === 'Blood Bank' ? 'Blood Bank' : `${activeItem.bloodGroup} Donor`}
                                                                                    </h3>
                                                                                    <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>{activeItem.fullName || activeItem.name}</p>
                                                                                    <p style={{ margin: '0 0 5px', fontSize: '0.85rem', color: '#475569' }}>
                                                                                                  {activeItem.address || activeItem.pincode}
                                                                                    </p>
                                                                                    {activeItem.contact && (
                                                                                                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                                                                                                                📞 {activeItem.contact}
                                                                                                  </p>
                                                                                    )}
                                                                                    {activeItem.website && (
                                                                                                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                                                                                                                <a href={activeItem.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                                                                                                                              🌐 Visit Website
                                                                                                                </a>
                                                                                                  </p>
                                                                                    )}
                                                                                    {activeItem.distance && (
                                                                                                  <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                                                                                                {activeItem.distance} km away
                                                                                                  </p>
                                                                                    )}
                                                                      </div>
                                                        </InfoWindow>
                                          )}
                            </GoogleMap>
              );
};

export default React.memo(DonorMap);
