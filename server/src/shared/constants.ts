import { Request } from 'express';
import { IFlight } from '@entities/Flight';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        flight: IFlight;
    }
} 
