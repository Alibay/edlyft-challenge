import { Request, Response } from 'express';
import WaterJugService from '../services/water-jug.service';
import waterJugValidator from '../validators/water-jug.validator';
export default class WaterJugController {

  public constructor(
    private readonly waterJugService: WaterJugService,
  ) {}

  public async solve(req: Request, res: Response) {
    const { error, value } = waterJugValidator.validate(req.query);
    if (error) {
      res.status(400).json(error);
      return;
    }

    const solution = await this.waterJugService.solve(value.x, value.y, value.z);
    res.json({ solvable: !!solution.length, solution });
  }
}
