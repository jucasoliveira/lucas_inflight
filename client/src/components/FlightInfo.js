import React, { useState, useEffect } from 'react';
import request from '../services/util/request';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Container,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Divider,
  Paper,
  Grid
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { XMLNS_1_0 } from 'xmlchars';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    display: 'block'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14,
    float: 'left'
  },
  pos: {
    marginBottom: 12
  },
  formControl: {
    margin: theme.spacing(1),
    marginBottom: 10,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  alertRoot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  column: {
    flexBasis: '15%',
    display: 'inline-block',
    marginLeft: '10px',
    float: 'left'
  },
  column2: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  block: {
    backgroundColor: '#FFFFFF',
    display: 'flex'
  },
  gridRoot: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5)
    },
    '& hr': {
      margin: theme.spacing(1, 1)
    }
  }
}));

export const FlightInfo = () => {
  let { id } = useParams();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [severity, setSeverity] = useState('success');
  const objectEntries = ['LANDED', 'ON SCHEDULE', 'DELAYED'];

  // Declare a new state variable, which we'll call "count"
  const getDetails = request({
    method: 'GET',
    route: `/api/flight/${id}`
  });

  const pollDetails = async () => {
    return await getDetails;
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const saveStatus = async () => {
    try {
      data.flight.status = status;
      const updateDetails = request({
        method: 'POST',
        route: `/api/flight/update`,
        body: data
      });
      const result = await updateDetails;
      if (result.data) {
        setSeverity('success');
        handleClick();
      }
    } catch (error) {
      console.error(error, 'flightInfo/saveStatus');
      setSeverity('error');
      handleClick();
    }
  };

  const renderData = ({ flight }) => {
    return (
      <div>
        <Paper elevation={3} className={classes.block}>
          <div style={{ display: 'block', margin: '40px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h4">{flight.sourcePortName}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">{flight.sourcePortCode}</Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" variant="h5">
                    {flight.flightCode}
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={status}
                      onChange={handleChange}
                    >
                      {objectEntries.map((elm) => {
                        return <MenuItem value={elm}>{elm}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    onClick={() => saveStatus()}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Card className={classes.root} variant="outlined">
              <CardContent style={{ marginTop: '10px' }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <div style={{ display: 'block', paddingRight: '10px' }}>
                      <div className={classes.title}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                          Flight Details:{'  '}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div style={{ display: 'block' }}>
                      <Grid container alignItems="center" className={classes.gridRoot}>
                        <div className={classes.column2}>
                          <Typography variant="body2" component="p">
                            Scheduled time
                          </Typography>
                          <Typography variant="body2" component="p">
                            {moment(flight.scheduledArrival).format('LT')}
                          </Typography>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className={classes.column2}>
                          <Typography variant="body2" component="p">
                            Scheduled date
                          </Typography>
                          <Typography variant="body2" component="p">
                            {moment(flight.scheduledArrival).format('L')}
                          </Typography>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className={classes.column2}>
                          <Typography variant="body2" component="p">
                            Airline
                          </Typography>
                          <Typography variant="body2" component="p">
                            {flight.flightProvider}
                          </Typography>
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Paper>
      </div>
    );
  };

  useEffect(() => {
    !data &&
      pollDetails().then((res) => {
        setData(res.data);
        setStatus(res.data.flight.status);
      });
  }, [data, status]);

  return (
    <div className="App">
      <header className="App-header">
        <Container>{data && renderData(data)}</Container>
        {!data && <CircularProgress />}
      </header>
      <body></body>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {severity === 'success' ? 'Status saved' : 'An problem occurred'}
        </Alert>
      </Snackbar>
    </div>
  );
};
