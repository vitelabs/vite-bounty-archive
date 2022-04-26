import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../UI/loader/Loader';
import { privateRoutes, publicRoutes } from '../routes';
import { AuthContext } from '../context';

const AppRouter = function() {
     const {isAuth, isLoading} = useContext(AuthContext);
    if(isLoading) {
        return <Loader />
    }
    console.log(isAuth);
    return (
        isAuth
        ?  <Switch>
            {privateRoutes.map(route => 
                <Route 
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
             )}
            <Redirect to='/alltokens' />
           </Switch>
        : <Switch>
         {publicRoutes.map(route => 
            <Route 
                component={route.component}
                path={route.path}
                exact={route.exact}
                key={route.path}
            />
         )}
          <Redirect to='/connect' />
       </Switch>
    )
}

export default AppRouter;