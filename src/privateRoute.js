/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router';
import {useOktaAuth} from '@okta/okta-react';
import Spinner from 'react-bootstrap/Spinner';
// import axios from 'axios';

// const ENV = process.env;

export default function PrivateRoute({children, ...rest}) {
  const {oktaAuth, authState} = useOktaAuth();
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    if (oktaAuth && authState) {
          authState.isAuthenticated ? setIsTokenValid(true) : setIsTokenValid(false);
    } else {
      setIsTokenValid(false);
    }
  }, []);


  return (

    <Route
      {...rest}
      render={({location}) =>(

          isTokenValid ===true ?
          children :
           (
            isTokenValid === false ?
            <Redirect
              to={{
                pathname: '/signin',
                state: {from: location},
              }}
            /> :

            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>

            )
      )
      }
    />
  );
}
