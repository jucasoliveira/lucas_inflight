import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import FlightDao from '@daos/Flight/FlightDao.mock';
import { IFlight } from '@entities/Flight';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import { IReqBody, IResponse } from '../support/types';
import Flight from 'src/models/Flights';

describe('Flights Routes', () => {
  const flightPath = '/api/flight';
  const getFlightPath = `${flightPath}/all`;
  const addFlightPath = `${flightPath}/add`;
  const updateFlightPath = `${flightPath}/update`;
  const deleteFlightPath = `${flightPath}/delete/:id`;

  const { BAD_REQUEST, CREATED, OK } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`"GET:${getFlightPath}"`, () => {
    it(`should return a JSON object with all the flights and a status code of "${OK}" if the
            request was successful.`, (done) => {
      // Setup spy
      const flights = [
        new Flight({
          id: '12309182803',
          flightCode: 'test',
          flightProvider: 'test',
          sourcePortName: 'test',
          sourcePortCode: 'test',
          destinationPortName: 'test',
          destinationPortCode: 'test',
          scheduledArrival: new Date(),
          scheduledDeparture: new Date(),
          status: 'DELAYED'
        })
      ];
      spyOn(FlightDao.prototype, 'getAll').and.returnValue(Promise.resolve(flights));
      // Call API
      agent.get(getFlightPath).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(OK);
        // Caste instance-objects to 'User' objects
        const respUsers = res.body.flight;
        const retUsers: IFlight[] = respUsers.map((flight: IFlight) => {
          return new Flight(flight);
        });
        expect(retUsers).toEqual(flights);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
      // Setup spy
      const errMsg = 'Could not fetch users.';
      spyOn(FlightDao.prototype, 'getAll').and.throwError(errMsg);
      // Call API
      agent.get(getFlightPath).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"POST:${addFlightPath}"`, () => {
    const callApi = (reqBody: IReqBody) => {
      return agent.post(addFlightPath).type('form').send(reqBody);
    };
    const flightData = {
      flight: new Flight({
        id: '12309182093',
        flightCode: 'test',
        flightProvider: 'test',
        sourcePortName: 'test',
        sourcePortCode: 'test',
        destinationPortName: 'test',
        destinationPortCode: 'test',
        scheduledArrival: new Date(),
        scheduledDeparture: new Date(),
        status: 'ON SCHEDULE'
      })
    };

    it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
      // Setup Spy
      spyOn(FlightDao.prototype, 'add').and.returnValue(Promise.resolve());
      // Call API
      agent
        .post(addFlightPath)
        .type('form')
        .send(flightData)
        .end((err: Error, res: IResponse) => {
          pErr(err);
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          done();
        });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
      // Call API
      callApi({}).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
      // Setup spy
      const errMsg = 'Could not add user.';
      spyOn(FlightDao.prototype, 'add').and.throwError(errMsg);
      // Call API
      callApi(flightData).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"PUT:${updateFlightPath}"`, () => {
    const callApi = (reqBody: IReqBody) => {
      return agent.put(updateFlightPath).type('form').send(reqBody);
    };

    const flightData = {
      flight: new Flight({
        id: '12309182093',
        flightCode: '123Ads',
        flightProvider: 'update',
        sourcePortName: 'TAP',
        sourcePortCode: '123',
        destinationPortName: 'YES',
        destinationPortCode: 'PORT',
        scheduledArrival: new Date(),
        scheduledDeparture: new Date(),
        status: 'LANDED'
      })
    };

    it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
      // Setup spy
      spyOn(FlightDao.prototype, 'update').and.returnValue(Promise.resolve());
      // Call Api
      callApi(flightData).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
      // Call api
      callApi({}).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
      // Setup spy
      const updateErrMsg = 'Could not update user.';
      spyOn(FlightDao.prototype, 'update').and.throwError(updateErrMsg);
      // Call API
      callApi(flightData).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(updateErrMsg);
        done();
      });
    });
  });

  describe(`"DELETE:${deleteFlightPath}"`, () => {
    const callApi = (id: number) => {
      return agent.delete(deleteFlightPath.replace(':id', id.toString()));
    };

    it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
      // Setup spy
      spyOn(FlightDao.prototype, 'delete').and.returnValue(Promise.resolve());
      // Call api
      callApi(12309182803).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
      // Setup spy
      const deleteErrMsg = 'Could not delete flight.';
      spyOn(FlightDao.prototype, 'delete').and.throwError(deleteErrMsg);
      // Call Api
      callApi(1).end((err: Error, res: IResponse) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(deleteErrMsg);
        done();
      });
    });
  });
});
