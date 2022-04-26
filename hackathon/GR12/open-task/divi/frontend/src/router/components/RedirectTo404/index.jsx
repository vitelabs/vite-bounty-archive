import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom';
import routes from '../../routeList';
import './styles.css'

const RedirectTo404 = () => {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Container>
        <h3 className="header">Not Found Page - 404</h3>
        <Link className="link" to={routes.landing}>
          <h5 className="header">Back to Home</h5>
        </Link>
        <Image className="image" src={'/images/example5.png'} fluid></Image>
      </Container> 
    </Stack>
  )
};

RedirectTo404.propTypes = {
  location: PropTypes.object,
};

export default RedirectTo404;
