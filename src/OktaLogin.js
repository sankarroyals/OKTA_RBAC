import React, {Component} from 'react';
import {withOktaAuth} from '@okta/okta-react';
import './App.css';

export default withOktaAuth(class OktaLogin extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    await this.props.oktaAuth.signInWithRedirect({originalUri: '/home'});
  }

  async logout() {
    await this.props.oktaAuth.signOut();
  }


  render() {
    if (this.props.authState?.isAuthenticated) {
      this.props.history.push('/home');
    } else {
      this.login();
    }
    return (
      <></>
    );
  }
});
