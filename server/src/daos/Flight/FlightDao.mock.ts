import { getRandomInt } from '@shared/functions';
import { IFlightDao } from './FlightDao';
import MockDaoMock from '../MockDb/MockDao.mock';
import { IFlight } from '@entities/Flight';

class FlightDao extends MockDaoMock implements IFlightDao {
  public async getOne(id: string): Promise<IFlight | null> {
    const db = await super.openDb();
    const flight: IFlight | undefined = db.flight.find((elm) => elm.id === id);
    return flight ? flight : null;
  }

  public async getAll(): Promise<IFlight[]> {
    const db = await super.openDb();
    return db.flight;
  }

  public async add(flight: IFlight): Promise<void> {
    const db = await super.openDb();
    flight.id = getRandomInt();
    console.log(flight);
    db.flight.push(flight);
    await super.saveDb(db);
  }

  public async update(flight: IFlight): Promise<void> {
    const db = await super.openDb();
    for (let i = 0; i < db.flight.length; i++) {
      if (db.flight[i].id === flight.id) {
        db.flight[i] = flight;
        await super.saveDb(db);
        return;
      }
    }
    throw new Error('Flight not found');
  }

  public async delete(id: string): Promise<void> {
    const db = await super.openDb();
    for (let i = 0; i < db.flight.length; i++) {
      if (db.flight[i].id === id) {
        db.flight.splice(i, 1);
        await super.saveDb(db);
        return;
      }
    }
    throw new Error('Flight not found');
  }
}

export default FlightDao;
