import { Request, Response } from 'express';

export * from './generated-models';

export interface NetworkRequest {
  req: Request;
  res: Response;
}
