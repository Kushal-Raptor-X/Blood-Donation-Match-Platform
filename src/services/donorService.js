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
