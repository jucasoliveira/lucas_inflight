import mongoose, { Schema, model, Model } from 'mongoose';
import { IFlight } from '@entities/Flight';

const FlightSchema: Schema = new Schema(
  {
    id: Schema.Types.String,
    flightCode: Schema.Types.String,
    flightProvider: Schema.Types.String,
    sourcePortName: Schema.Types.String,
    sourcePortCode: Schema.Types.String,
    destinationPortName: Schema.Types.String,
    destinationPortCode: Schema.Types.String,
    scheduledArrival: Schema.Types.Date,
    scheduledDeparture: Schema.Types.Date,
    status: Schema.Types.String
  },
  { timestamps: true }
);

const Flight: Model<IFlight> = model('Flight', FlightSchema);

export default Flight;
