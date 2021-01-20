import React, { useState, useEffect, useRef } from 'react';
import request from '../services/util/request';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import { Container, Button, CircularProgress, Grid } from '@material-ui/core';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    marginVertical: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  heading2: {
    paddingTop: 10,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightRegular
  },
  column: {
    flexBasis: '25%'
  },
  heading3: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(2, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  colorPrimary: {
    backgroundColor: '#000000'
  },
  gridRoot: {
    width: '100%'
  }
}));

export const FlightDetail = () => {
  const [getData, setGetData] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const prevData = useRef();

  const statusColor = (elm) => {
    switch (elm) {
      case 'DELAYED':
        return { backgroundColor: '#ffff05', color: 'black' };
      default:
        return { backgroundColor: '#009400', color: 'white' };
    }
  };

  useEffect(() => {
    const pollDetails = async () => {
      const getDetails = request({
        method: 'GET',
        route: '/api/flight/all'
      }).then((res) => {
        setData(res.data);
      });
    };

    pollDetails();
  }, []);
  return (
    <Container>
      {!data && <CircularProgress />}
      {data &&
        data.flights.map((elm) => {
          return (
            <Accordion key={elm.id} className={classes.root}>
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <Grid container alignItems="center" spacing={2} className={classes.gridRoot}>
                  <Grid item className={classes.column}>
                    <Typography className={classes.heading}>
                      {moment(elm.scheduledArrival).format('LT')}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.column}>
                    <Typography className={classes.heading}>{elm.sourcePortName}</Typography>
                    <Typography className={classes.heading2}>
                      {elm.flightCode} {elm.flightProvider}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.column}>
                    <Typography className={classes.heading3}>
                      <Chip label={elm.status} style={statusColor(elm.status)} />
                    </Typography>
                  </Grid>
                  <Grid item className={classes.column}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Typography variant="body2">
                          {' '}
                          <a href={`flight/${elm.id}`}>More Info</a>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TrendingFlat />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionSummary>
            </Accordion>
          );
        })}
    </Container>
  );
};
