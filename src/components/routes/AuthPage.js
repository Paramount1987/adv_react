import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, moduleName } from '../../ducks/auth';

import SignInForm from '../auth/SigninForm';
import SignUpForm from '../auth/SignupForm';
import Loader from '../common/Loader';

class AuthPage extends Component {
  state = {  }
  render() {
    const { loading } = this.props;
    return (
      <div>
        <div>Auth Page</div>
        <NavLink to="/auth/signin" activeStyle={{color: 'red'}}>sign in</NavLink>
        <NavLink to="/auth/signup" activeStyle={{color: 'red'}}>sign up</NavLink>

        <Route path="/auth/signin" render={() => <SignInForm onSubmit={this.handleSignIn} />}/>
        <Route path="/auth/signup" render={() => <SignUpForm onSubmit={this.handleSignUp} />}/>
        {loading && <Loader />}
      </div>
    );
  }

  handleSignIn = (values) => console.log('--', values); 

  handleSignUp = ({email, password}) => this.props.signUp(email, password); 
}

export default connect(state => ({
  loading: state[moduleName].loading
}), { signUp })(AuthPage);