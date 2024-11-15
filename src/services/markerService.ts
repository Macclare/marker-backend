import Marker, { MarkerAttributes } from '../models/marker';

// Create a marker
export const createMarker = async (markerData: MarkerAttributes) => {
    try {
      // Create a new marker in the database
      const newMarker = await Marker.create(markerData);
      return newMarker;
    } catch (error) {
      console.error('Error in addMarkerService:', error);
      throw new Error('Failed to add marker');
    }
  };

// Get all markers
export const getAllMarkers = async () => {
  return await Marker.findAll();
};

// Get a single marker by ID
export const getMarkerById = async (id: string) => {
  return await Marker.findByPk(id);
};

// Update a marker
export const updateMarker = async (id: string, markerData: Partial<MarkerAttributes>) => {
    try {
      // Find the marker by ID
      const marker = await Marker.findByPk(id);
      if (!marker) {
        throw new Error('Marker not found');
      }
  
      // Update the marker with the provided data
      const updatedMarker = await marker.update(markerData);
  
      return updatedMarker;
    } catch (error: any) {
      console.error('Error in updateMarkerService:', error);
      throw new Error(error.message || 'Failed to update marker');
    }
  };

// Delete a marker
export const deleteMarker = async (id: string) => {
  const marker = await Marker.findByPk(id);
  if (!marker) return null;
  await marker.destroy();
  return true;
};

// Service function to handle bulk creation of markers
export const bulkCreateMarkersService = async (markersData: any[]): Promise<any> => {
  try {
    // Use Sequelize's bulkCreate method to insert data into the table
    const createdMarkers = await Marker.bulkCreate(markersData, {
      validate: true, // Perform model validation on each item before saving (optional)
    });

    return createdMarkers;  // Return the created markers
  } catch (error) {
    console.error('Error in bulk creation service:', error);
    throw new Error('Failed to create markers');
  }
};

