import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOperation, IRequest, IResult, IState, OperationType, THumanReadableOperation } from './types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WaterJugService {

  private url = 'api/v1/water-jug'

  constructor(private readonly http: HttpClient) {}

  public solve(params: IRequest) {
    return this.http
      .get<IResult<IOperation>>(this.url, { params: { ...params } })
      .pipe(map<IResult<IOperation>, IResult<THumanReadableOperation>>(this.humanizeResult.bind(this)));
  }

  private humanizeOperation(op: IOperation): THumanReadableOperation {
    switch (op.type) {
      case OperationType.Fill:
        return `Fill bucket ${op.params.bucket}`;
      case OperationType.Drop:
        return `Dump bucket ${op.params.bucket}`;
      case OperationType.Transfer:
        return `Transfer bucket ${op.params.from} to bucket ${op.params.to}`;
    }
  }

  private humanizeState(state: IState<IOperation>): IState<THumanReadableOperation> {
    return {
      x: state.x,
      y: state.y,
      op: this.humanizeOperation(state.op),
    };
  }

  private humanizeResult(result: IResult<IOperation>): IResult<THumanReadableOperation> {
    return {
      solvable: result.solvable,
      solution: result.solution?.map(this.humanizeState.bind(this)),
    };
  }
}
