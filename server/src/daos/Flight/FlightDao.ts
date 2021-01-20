import { IFlight } from '@entities/Flight';
import Flight from '../../models/Flights';
import { getRandomInt } from '@shared/functions';

export interface IFlightDao {
  getOne: (id: string) => Promise<IFlight | null>;
  getAll: () => Promise<IFlight[]>;
  add: (flight: IFlight) => Promise<void>;
  update: (flight: IFlight) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

class FlightDao implements IFlightDao {
  /**
   * @param id
   */
  public async getOne(id: string): Promise<IFlight | null> {
    const getFlightById: IFlight = await Flight.findOne({ id });
    return Promise.resolve(getFlightById);
  }

  /**
   *
   */
  public async getAll(): Promise<IFlight[]> {
    const getFlights: IFlight[] = await Flight.find({});
    return Promise.resolve(getFlights);
  }

  /**
   *
   * @param flight
   */
  public async add(flight: IFlight): Promise<void> {
    if (!flight.id) {
      flight.id = getRandomInt();
    }
    const createFlight: IFlight | any = await Flight.create(flight);
    return Promise.resolve(createFlight);
  }

  /**
   *
   * @param flight
   */
  public async update(flight: IFlight): Promise<void> {
    const updateFlight: IFlight | any = await Flight.updateOne(
      { id: flight.id },
      { status: flight.status }
    );
    return Promise.resolve(updateFlight);
  }

  /**
   *
   * @param id
   */
  public async delete(id: string): Promise<void> {
    const deleteFlight: IFlight | any = await Flight.deleteOne({ id });
    return Promise.resolve(deleteFlight);
  }
}

export default FlightDao;
