import { Response } from 'supertest';
import { IFlight } from '@entities/Flight';

export interface IResponse extends Response {
  body: {
    flight: IFlight[];
    error: string;
  };
}

export interface IReqBody {
  flight?: IFlight;
}
