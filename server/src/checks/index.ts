import { IFlight } from '@entities/Flight';
import Flight from '../models/Flights';
import mockData from '../daos/MockDb/MockDb.json';

export default async () => {
  try {
    const flights: IFlight[] | any = await Flight.find({});

    const run = async function () {
      if (flights.length === 0) {
        await Promise.all(
          mockData.flight.map(async (flight) => {
            await Flight.create(flight);
          })
        );
      }
    };

    await run();
  } catch (err) {
    console.error(err);
  }
};
