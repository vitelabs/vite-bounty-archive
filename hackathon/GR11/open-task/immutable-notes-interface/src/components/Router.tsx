import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import Hash from '../pages/Hash';
import Address from '../pages/Address';
import Home from '../pages/Home';

const ScrollToTop = ({ history }: RouteComponentProps) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);
  return null;
};

const Router = React.memo(() => {
  return (
    <BrowserRouter>
      <>
        <Route path="/" component={ScrollToTop} />
        <Switch>
          <Route exact path="/hash/:hash" component={Hash} />
          <Route exact path="/address/:author" component={Address} />
          <Route exact path="/" component={Home} />
          <Route path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      </>
    </BrowserRouter>
  );
});

export default Router;
