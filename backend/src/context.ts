import WaterJugController from './controllers/water-jug.controller';
import WaterJugService from './services/water-jug.service';

export const waterJugService = new WaterJugService();
export const waterJugController = new WaterJugController(waterJugService);
