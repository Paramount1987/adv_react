import React, { Component } from 'react';
import { Route }  from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from './routes/PersonPage';
import ProtectedRoute from './common/ProtectedRoute';

import { moduleName, signOut } from '../ducks/auth';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const { signOut, signedIn } = this.props;
    const btn = signedIn
      ? <button onClick = {signOut}>Sign Out</button>
      : <Link to="/auth/signin">Sign In</Link>
    return (
      <div>
        {btn}
        <ProtectedRoute path="/admin"  component={AdminPage} />
        <Route path="/auth"  component={AuthPage} />
        <Route path="/person"  component={PersonPage} />
      </div>
    );
  }
}

export default connect(state => ({
signedIn: !!state[moduleName].user
}), {signOut})(Root);