import { Router } from 'express';
import { createMarkerController, getAllMarkersController, updateMarkerController, getMarkerByIdController, deleteMarkerController, bulkCreateMarkersController } from '../controller/markerController';


const router = Router();

router.post('/create', createMarkerController);
router.get('/', getAllMarkersController);
router.get('/:id', getMarkerByIdController);
router.put('/update/:id', updateMarkerController);
router.delete('/delete/:id', deleteMarkerController);
router.post('/bulk-upload', bulkCreateMarkersController);

export default router;
