import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import NetworkSwitcher from './NetworkSwitcher';
import ConnectButton from './ConnectButton';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: 'none',
    background: 'white',
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Link to='/' className='flex flex-grow'>
          <img src='/vite.svg' alt='logo' height={30} width={30} />
          <Typography variant='h6'>Marketplace</Typography>
        </Link>
        <ConnectButton />
        <NetworkSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
