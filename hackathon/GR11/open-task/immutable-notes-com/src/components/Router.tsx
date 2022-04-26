import { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import Home from '../pages/Home';

type Props = RouteComponentProps;

const ScrollToTop = ({ history }: Props) => {
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

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Route path="/" component={ScrollToTop} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default Router;
