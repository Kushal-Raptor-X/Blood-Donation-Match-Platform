import { supabase } from './supabase';

// MOCK BACKEND SERVICE (Local Storage)
// Bypassing Firebase Billing requirements for Hackathon Demo

const TABLE_NAME = 'donors';

export const addDonor = async (donorData) => {
              try {
                            const dataToSave = {
                                          ...donorData,
                                          // Sanitize optional fields for Supabase (Empty string != NULL for Date types)
                                          lastDonation: donorData.lastDonation || null,
                                          illness: donorData.illness || null,
                                          age: donorData.age ? parseInt(donorData.age) : null,
                                          weight: donorData.weight ? parseInt(donorData.weight) : null
                            };

                            console.log("Attempting to insert donor data:", dataToSave);

                            const { data, error } = await supabase
                                          .from(TABLE_NAME)
                                          .insert([dataToSave])
                                          .select();

                            if (error) throw error;

                            console.log("Donor saved to Supabase:", data);
                            return { success: true, id: data[0].id };
              } catch (e) {
                            console.error("Error adding donor: ", e);
                            return { success: false, error: e.message };
              }
};

export const getDonors = async () => {
              try {
                            const { data, error } = await supabase
                                          .from(TABLE_NAME)
                                          .select('*')
                                          .order('created_at', { ascending: false });

                            if (error) throw error;

                            return data || [];
              } catch (e) {
                            console.error("Error fetching donors: ", e);
                            return [];
              }
};

// Blood Bank Service
export const addBloodBank = async (bankData) => {
              try {
                            const { data, error } = await supabase
                                          .from('blood_banks')
                                          .insert([bankData])
                                          .select();

                            if (error) throw error;
                            return { success: true, id: data[0].id };
              } catch (e) {
                            console.error("Error adding blood bank:", e);
                            return { success: false, error: e.message };
              }
};

export const getBloodBanks = async () => {
              try {
                            // Try fetching from real table first
                            const { data, error } = await supabase
                                          .from('blood_banks')
                                          .select('*');

                            if (!error && data && data.length > 0) {
                                          // Map to match the map struct (type='Blood Bank')
                                          return data.map(b => ({
                                                        ...b,
                                                        type: 'Blood Bank',
                                                        // Ensure default location logic if needed (assumes stored location)
                                                        location: b.location || { lat: 19.0760, lng: 72.8777 }
                                          }));
                            }

                            // Fallback to Mock if table empty or error (for demo continuity)
                            console.warn("Using Mock Blood Banks (Real table empty or error)");
                            return [
                                          {
                                                        id: 'bb-1',
                                                        type: 'Blood Bank',
                                                        name: 'Lilavati Hospital Blood Bank',
                                                        location: { lat: 19.0505, lng: 72.8286 },
                                                        address: 'Bandra West, Mumbai',
                                                        contact: '022-26751000',
                                                        website: 'https://lilavatihospital.com',
                                                        inventory: { 'A+': true, 'A-': true, 'B+': true, 'B-': false, 'O+': true, 'O-': false, 'AB+': true, 'AB-': false }
                                          },
                                          {
                                                        id: 'bb-2',
                                                        type: 'Blood Bank',
                                                        name: 'KEM Hospital Blood Bank',
                                                        location: { lat: 18.9997, lng: 72.8397 },
                                                        address: 'Parel, Mumbai',
                                                        contact: '022-24107000',
                                                        website: 'https://kem.edu',
                                                        inventory: { 'A+': false, 'A-': false, 'B+': true, 'B-': true, 'O+': true, 'O-': true, 'AB+': true, 'AB-': true }
                                          },
                                          {
                                                        id: 'bb-3',
                                                        type: 'Blood Bank',
                                                        name: 'Tata Memorial Blood Bank',
                                                        location: { lat: 19.0035, lng: 72.8407 },
                                                        address: 'Parel, Mumbai',
                                                        contact: '022-24177000',
                                                        website: 'https://tmc.gov.in',
                                                        inventory: { 'A+': true, 'A-': true, 'B+': true, 'B-': true, 'O+': true, 'O-': true, 'AB+': true, 'AB-': true }
                                          },
                                          {
                                                        id: 'bb-4',
                                                        type: 'Blood Bank',
                                                        name: 'Nanavati Hospital Blood Bank',
                                                        location: { lat: 19.0968, lng: 72.8397 },
                                                        address: 'Vile Parle, Mumbai',
                                                        contact: '022-26267500',
                                                        website: 'https://nanavatihospital.org',
                                                        inventory: { 'A+': true, 'A-': false, 'B+': false, 'B-': false, 'O+': true, 'O-': true, 'AB+': false, 'AB-': false }
                                          },
                                          {
                                                        id: 'bb-5',
                                                        type: 'Blood Bank',
                                                        name: 'Hiranandani Hospital Blood Bank',
                                                        location: { lat: 19.1189, lng: 72.9118 },
                                                        address: 'Powai, Mumbai',
                                                        contact: '022-25763300',
                                                        website: 'https://hiranandanihospital.org',
                                                        inventory: { 'A+': true, 'A-': true, 'B+': true, 'B-': true, 'O+': false, 'O-': false, 'AB+': true, 'AB-': true }
                                          },
                                          {
                                                        id: 'bb-6',
                                                        type: 'Blood Bank',
                                                        name: 'Breach Candy Hospital',
                                                        location: { lat: 18.9712, lng: 72.8048 },
                                                        address: 'Breach Candy, Mumbai',
                                                        contact: '022-23667788',
                                                        website: 'https://breachcandyhospital.org',
                                                        inventory: { 'A+': false, 'A-': true, 'B+': true, 'B-': false, 'O+': true, 'O-': true, 'AB+': false, 'AB-': true }
                                          },
                                          {
                                                        id: 'bb-7',
                                                        type: 'Blood Bank',
                                                        name: 'Kokilaben Dhirubhai Ambani',
                                                        location: { lat: 19.1311, lng: 72.8256 },
                                                        address: 'Andheri West, Mumbai',
                                                        contact: '022-30999999',
                                                        website: 'https://kokilabenhospital.com',
                                                        inventory: { 'A+': true, 'A-': true, 'B+': true, 'B-': true, 'O+': true, 'O-': true, 'AB+': true, 'AB-': true }
                                          },
                                          {
                                                        id: 'bb-8',
                                                        type: 'Blood Bank',
                                                        name: 'Fortis Hospital Blood Bank',
                                                        location: { lat: 19.1617, lng: 72.9427 },
                                                        address: 'Mulund, Mumbai',
                                                        contact: '022-43654365',
                                                        website: 'https://fortishealthcare.com',
                                                        inventory: { 'A+': true, 'A-': false, 'B+': true, 'B-': false, 'O+': false, 'O-': false, 'AB+': true, 'AB-': true }
                                          }
                            ];
              } catch (e) {
                            console.error("Error fetching banks:", e);
                            return [];
              }
};

export const createEmergencyAlert = async (alertData) => {
              try {
                            const { data, error } = await supabase
                                          .from('alerts')
                                          .insert([{
                                                        ...alertData,
                                                        created_at: new Date().toISOString(),
                                                        status: 'ACTIVE'
                                          }])
                                          .select();

                            if (error) {
                                          // If table doesn't exist, we fallback to just logging success for demo
                                          console.warn("Alert table might not exist (Supabase Error):", error.message);
                                          return { success: true, mock: true };
                            }

                            return { success: true, data };
              } catch (e) {
                            console.error("Error creating alert:", e);
                            return { success: false, error: e.message };
              }
};
