import { Router } from 'express';
import FlightRouter from './FlightDetails';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/flight', FlightRouter);

// Export the base-router
export default router;
