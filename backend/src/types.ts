export enum OperationType {
  Init = 'Init',
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
  { type: OperationType.Init; } |
  { type: OperationType.Fill, params: TSingleBucketOperationParams, } |
  { type: OperationType.Drop, params: TSingleBucketOperationParams, } |
  { type: OperationType.Transfer, params: TTransferOperationParams, };

export interface IState {
  x: number;
  y: number;
  op: IOperation;
}

export type StateWithPath = IState & { path: StateWithPath[]; };
