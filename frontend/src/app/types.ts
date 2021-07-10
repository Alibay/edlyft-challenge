export interface IRequest {
  x: string;
  y: string;
  z: string;
}

export interface IResult<TOperation> {
  solvable: boolean;
  solution?: IState<TOperation>[];
}

export enum OperationType {
  Fill = 'Fill',
  Drop = 'Drop',
  Transfer = 'Transfer',
}

export enum BucketName {
  X = 'x',
  Y = 'y',
}

export type TSingleBucketOperationParams = { bucket: BucketName };
export type TTransferOperationParams =
  { from: BucketName.X, to: BucketName.Y } |
  { from: BucketName.Y, to: BucketName.X };

export type IOperation =
  { type: OperationType.Fill, params: TSingleBucketOperationParams, } |
  { type: OperationType.Drop, params: TSingleBucketOperationParams, } |
  { type: OperationType.Transfer, params: TTransferOperationParams, };

export type THumanReadableOperation = string;

export interface IState<TOperation> {
  x: number;
  y: number;
  op: TOperation;
}
