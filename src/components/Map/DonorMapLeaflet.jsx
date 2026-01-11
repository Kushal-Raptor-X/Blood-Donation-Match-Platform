import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
              iconUrl: icon,
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const containerStyle = {
              width: '100%',
              height: '100%',
              borderRadius: '12px'
};

const center = [19.0760, 72.8777]; // Mumbai coordinates

// Helper to update map view when props change
const MapUpdater = ({ center }) => {
              const map = useMap();
              useEffect(() => {
                            map.setView(center, 13);
              }, [center, map]);
              return null;
};

const DonorMapLeaflet = ({ donors, onMarkerClick }) => {
              return (
                            <MapContainer center={center} zoom={13} style={containerStyle}>
                                          <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                          />

                                          {donors.map((donor) => (
                                                        <Marker
                                                                      key={donor.id}
                                                                      position={[donor.location.lat, donor.location.lng]}
                                                                      eventHandlers={{
                                                                                    click: () => {
                                                                                                  onMarkerClick && onMarkerClick(donor);
                                                                                    },
                                                                      }}
                                                        >
                                                                      <Popup>
                                                                                    <div style={{ padding: '0.2rem' }}>
                                                                                                  <h3 style={{ margin: '0 0 5px', color: '#DC143C' }}>{donor.bloodGroup} Donor</h3>
                                                                                                  <p style={{ margin: 0 }}>{donor.name}</p>
                                                                                                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{donor.distance} away</p>
                                                                                    </div>
                                                                      </Popup>
                                                        </Marker>
                                          ))}
                                          <MapUpdater center={center} />
                            </MapContainer>
              );
};

export default DonorMapLeaflet;
