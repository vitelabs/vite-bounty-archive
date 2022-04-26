import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Landing from '@pages/Landing';
import Profile from '@pages/Profile';
import Mint from '@pages/Mint';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '1200px',
    margin: '0 auto',
    padding: '80px 0 30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '70px 0 10px',
      width: 'auto',
    },
    '& a': {
      textDecoration: 'none',
    },
    '& .MuiInputLabel-shrink': {
      right: 0,
      transform: 'translate(0, 1.5px) scale(1)',
      transformOrigin: 'top left',
      fontSize: 12,
    },
    '& td, th': {
      borderColor: 'transparent',
    },
  },
}));

const Layout: FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <Box className={classes.container}>
        <Header />

        <Switch>
          <Route exact path={'/'} component={Landing} />
          <Route exact path={'/profile/:walletAddress'} component={Profile} />
          <Route exact path={'/mint/:tokenId'} component={Mint} />
        </Switch>
      </Box>
    </Router>
  );
};

export default Layout;
