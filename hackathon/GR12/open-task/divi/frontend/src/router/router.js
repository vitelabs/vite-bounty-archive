import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NotFound from '../components/NotFound';
import AppRoutes from './AppRouter';

const Router = () => (
  <BrowserRouter>
    <Route
      render={({ location }) =>
        location.state && location.state.is404 ? <NotFound /> : <AppRoutes />
      }
    />
  </BrowserRouter>
);

export default Router;
