/* eslint-disable max-len */
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import {LoginCallback, Security, SecureRoute} from '@okta/okta-react';
// import {ErrorBoundary} from 'react-error-boundary';

import OktaLogin from './OktaLogin';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme/index';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import RolesAccess from './components/Configurations/RolesAccess/RolesAccess';
// import Home from './Pages/Home';

const ENV = process.env;
// console.log('ISSUER ------------ ', ENV.REACT_APP_OKTAUTH_ISSUER);
const oktaAuth = new OktaAuth({
  issuer: ENV.REACT_APP_OKTAUTH_ISSUER,
  clientId: ENV.REACT_APP_OKTAUTH_CLIENTID,
  redirectUri: window.location.origin + ENV.REACT_APP_OKTAUTH_REDIRECT_URI_PATH,
  pkce: true,
  scopes: ['openid', 'email', 'profile', 'offline_access'],
  responseType: ['code'], // ['id_token', 'token']
  devMode: false,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      justLogin: false,
    };
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      this.setState({justLogin: true});
      props.history.replace(
          toRelativeUrl(originalUri || '/', window.location.origin),
      );
    };
  }

  render() {
    return (
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={this.restoreOriginalUri}
      >
        <>
          <Header history={this.props.history} justLogin={this.state.justLogin}/>
          <Switch>
            <Route path="/" exact={true} component={OktaLogin} />
            <Route path="/login" exact={true} component={OktaLogin} />
            <Route path="/login/callback" exact={true} component={LoginCallback} />
            <SecureRoute path="/home" component={Home} />
            <SecureRoute path="/roles" component={RolesAccess} />
          </Switch>
        </>
      </Security>
      // </ErrorBoundary>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <AppWithRouterAccess />
        </Router>
      </ThemeProvider>
    );
  }
}

export default RouterApp;
