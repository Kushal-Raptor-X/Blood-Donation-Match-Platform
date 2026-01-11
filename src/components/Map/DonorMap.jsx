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

/**
 * DonorMap Component
 * Purely presentational.
 * Controlled by parent via 'selectedDonorId' and 'onMarkerClick'.
 */
const DonorMap = ({ donors, selectedDonorId, onMarkerClick }) => {
              const [map, setMap] = useState(null);
              const [activeDonor, setActiveDonor] = useState(null);

              // Sync Active Donor with selectedDonorId prop
              useEffect(() => {
                            if (selectedDonorId) {
                                          const donor = donors.find(d => d.id === selectedDonorId);
                                          if (donor) {
                                                        setActiveDonor(donor);
                                                        // Optional: Pan to donor
                                                        if (map && donor.location) {
                                                                      map.panTo(donor.location);
                                                                      map.setZoom(13); // Zoom in when selected
                                                        }
                                          }
                            } else {
                                          setActiveDonor(null);
                            }
              }, [selectedDonorId, donors, map]);

              const onLoad = React.useCallback(function callback(map) {
                            setMap(map);
              }, []);

              const onUnmount = React.useCallback(function callback(map) {
                            setMap(null);
              }, []);

              return (
                            <GoogleMap
                                          mapContainerStyle={containerStyle}
                                          center={defaultCenter}
                                          zoom={11}
                                          onLoad={onLoad}
                                          onUnmount={onUnmount}
                                          options={{
                                                        zoomControl: true,
                                                        streetViewControl: false,
                                                        mapTypeControl: false,
                                                        fullscreenControl: false,
                                          }}
                            >
                                          {donors.map((donor) => {
                                                        // Only render valid locations
                                                        if (!donor.location || typeof donor.location.lat !== 'number') return null;

                                                        const isSelected = selectedDonorId === donor.id;

                                                        return (
                                                                      <Marker
                                                                                    key={donor.id}
                                                                                    position={donor.location}
                                                                                    animation={isSelected ? window.google.maps.Animation.BOUNCE : null}
                                                                                    onClick={() => {
                                                                                                  onMarkerClick && onMarkerClick(donor);
                                                                                    }}
                                                                      />
                                                        );
                                          })}

                                          {activeDonor && activeDonor.location && (
                                                        <InfoWindow
                                                                      position={activeDonor.location}
                                                                      onCloseClick={() => {
                                                                                    // We might want to clear selection here, but for now just close info window visually
                                                                                    // Ideally we callback to parent to clear ID
                                                                                    setActiveDonor(null);
                                                                      }}
                                                        >
                                                                      <div style={{ padding: '0.5rem' }}>
                                                                                    <h3 style={{ margin: '0 0 5px', color: '#DC143C' }}>{activeDonor.bloodGroup} Donor</h3>
                                                                                    <p style={{ margin: 0 }}>{activeDonor.fullName || activeDonor.name}</p>
                                                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
                                                                                                  {activeDonor.distance ? `${activeDonor.distance} km away` : activeDonor.pincode}
                                                                                    </p>
                                                                      </div>
                                                        </InfoWindow>
                                          )}
                            </GoogleMap>
              );
};

export default React.memo(DonorMap);
