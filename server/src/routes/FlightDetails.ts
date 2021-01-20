import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { paramMissingError, IRequest } from '@shared/constants';
import FlightDao from '@daos/Flight/FlightDao';

const router = Router();
const flightDao = new FlightDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Flight Details - "GET /api/flight/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
  const flights = await flightDao.getAll();
  return res.status(OK).json({ flights });
});

/******************************************************************************
 *                      Get One Flight - "GET /api/flight/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const flight = await flightDao.getOne(id.toString());
  return res.status(OK).json({ flight });
});

/******************************************************************************
 *                       Add One - "POST /api/flight/add"
 ******************************************************************************/

router.post('/add', async (req: IRequest, res: Response) => {
  const { flight } = req.body;
  console.log('here');
  if (!flight) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }
  await flightDao.add(flight);
  return res.status(CREATED).end();
});

/******************************************************************************
 *                       Update - "PUT /api/flight/update"
 ******************************************************************************/

router.post('/update', async (req: IRequest, res: Response) => {
  const { flight } = req.body;
  if (!flight) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }
  await flightDao.update(flight);
  return res.status(OK).end();
});

/******************************************************************************
 *                    Delete - "DELETE /api/flight/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: IRequest, res: Response) => {
  const { id } = req.params;
  await flightDao.delete(id.toString());
  return res.status(OK).end();
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
