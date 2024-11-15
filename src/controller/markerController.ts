import { Request, Response } from 'express';
import { createMarker, getAllMarkers, getMarkerById, updateMarker, deleteMarker, bulkCreateMarkersService } from '../services/markerService';
import { addMarkerSchema, updateMarkerSchema } from '../utils/types';

export const createMarkerController = async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate the request body against the schema
    const { error } = addMarkerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    // Extract validated data
    const markerData = req.body;

    // Call the service to add the marker
    const newMarker = await createMarker(markerData);

    return res.status(201).json({ message: 'Marker successfully created', data: newMarker });
  } catch (error: any) {
    console.error('Error in addMarkerController:', error);
    return res.status(500).json({ message: 'An error occurred while adding the marker', error: error.message });
  }
};

export const getAllMarkersController = async (_req: Request, res: Response) => {
  try {
    const markers = await getAllMarkers();
    res.status(200).json(markers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMarkerByIdController = async (req: Request, res: Response):Promise<any> => {
  try {
    const marker = await getMarkerById(req.params.id);
    if (!marker) return res.status(404).json({ message: 'Marker not found' });
    res.status(200).json(marker);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMarkerController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params; // Get the marker ID from URL parameters

    // Validate the request body using the update schema
    const { error } = updateMarkerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    // Extract validated marker data
    const markerData = req.body;

    // Call the service to update the marker
    const updatedMarker = await updateMarker(id, markerData);

    return res.status(200).json({ message: 'Marker successfully updated', data: updatedMarker });
  } catch (error: any) {
    console.error('Error in updateMarkerController:', error);
    return res.status(500).json({ message: 'An error occurred while updating the marker', error: error.message });
  }
};

export const deleteMarkerController = async (req: Request, res: Response):Promise<any> => {
  try {
    const success = await deleteMarker(req.params.id);
    if (!success) return res.status(404).json({ message: 'Marker not found' });
    res.status(200).json({ message: 'Marker deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk upload API

export const bulkCreateMarkersController = async (req: Request, res: Response): Promise<any> => {
  try {
    const markersData = req.body;  // Get the array of markers from the request body

    // Validate incoming data (check if it’s an array)
    if (!Array.isArray(markersData)) {
      return res.status(400).json({ message: 'Data must be an array of markers.' });
    }

    // Optional: Validate individual marker fields if necessary
    const isValid = markersData.every(marker => {
      return marker.millName && marker.latitude && marker.longitude && marker.p1Amount && marker.numTransactions && marker.p1PriceTon && marker.lastTransactionDate;
    });

    if (!isValid) {
      return res.status(400).json({ message: 'Each marker must have the required fields.' });
    }

    // Call the service to create markers
    const createdMarkers = await bulkCreateMarkersService(markersData);

    // Return a success response with the created markers
    return res.status(201).json({ message: 'Markers successfully uploaded.', data: createdMarkers });
  } catch (error:any) {
    console.error('Error uploading markers:', error);
    return res.status(500).json({ message: 'An error occurred while uploading markers.', error: error.message });
  }
};
