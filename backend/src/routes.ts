import { Router } from 'express';
import { waterJugController } from './context';
const router = Router();

router.get('/water-jug', waterJugController.solve.bind(waterJugController));

export default router;
