import { BucketName, IState, OperationType, StateWithPath } from '../types';

export default class WaterJugService {

  public async solve(x: number, y: number, z: number): Promise<IState[]> {
    const visited = new Set<string>();
    const queue: StateWithPath[] = [];

    // initial state
    queue.push({
      x: 0,
      y: 0,
      op: { type: OperationType.Init },
      path: []
    });

    while (queue.length) {
      // process each vertex in a separate callback in order not to block the event loop
      const result = await this.processVertexAsync(x, y, z, queue, visited);

      if (result) {
        return result;
      }
    }

    return [];
  }

  private stateToKey(state: IState): string {
    return `${state.x}-${state.y}`;
  }

  private prepareResponse(p: StateWithPath[]) {
    // remove initial state
    p.shift();

    // remove additional info
    return p.map(({ path, ...rest  }) => rest);
  }

  private processVertexAsync(x: number, y: number, z: number, queue: StateWithPath[], visited: Set<string>) {
    return new Promise<IState[] | null>(resolve => {
      const currentState = queue[0];
      const path = currentState.path;
      queue.shift();

      const stateKey = this.stateToKey(currentState);

      // we have already visited this vertex
      if (visited.has(stateKey)) {
        return resolve(null);
      }

      visited.add(stateKey);

      if (currentState.x === z || currentState.y === z) {
        return resolve(this.prepareResponse([ ...path, currentState ]));
      }

      if (currentState.x < x) {
        queue.push({
          x,
          y: currentState.y,
          op: { type: OperationType.Fill, params: { bucket: BucketName.X }},
          path: [ ...path, currentState ],
        });
      }

      if (currentState.x > 0) {
        queue.push({
          x: 0,
          y: currentState.y,
          op: { type: OperationType.Drop, params: { bucket: BucketName.X }},
          path: [ ...path, currentState ],
        });
      }

      if (currentState.y < y) {
        queue.push({
          x: currentState.x,
          y,
          op: { type: OperationType.Fill, params: { bucket: BucketName.Y }},
          path: [ ...path, currentState ],
        });
      }

      if (currentState.y > 0) {
        queue.push({
          x: currentState.x,
          y: 0,
          op: { type: OperationType.Drop, params: { bucket: BucketName.Y }},
          path: [ ...path, currentState ],
        });
      }

      if (currentState.x > 0 && currentState.y < y) {
        const maxPossible = y - currentState.y;
        const transfer = Math.min(currentState.x, maxPossible);

        queue.push({
          x: currentState.x - transfer,
          y: currentState.y + transfer,
          op: { type: OperationType.Transfer, params: { from: BucketName.X, to: BucketName.Y }},
          path: [ ...path, currentState ],
        });
      }

      if (currentState.x < x && currentState.y > 0) {
        const maxPossible = x - currentState.x;
        const transfer = Math.min(currentState.y, maxPossible);

        queue.push({
          x: currentState.x + transfer,
          y: currentState.y - transfer,
          op: { type: OperationType.Transfer, params: { from: BucketName.Y, to: BucketName.X }},
          path: [ ...path, currentState ],
        });
      }

      resolve(null);
    });
  }
}
