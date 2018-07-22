import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import SignInForm from '../auth/SigninForm';
import SignUpForm from '../auth/SignupForm';

class AuthPage extends Component {
  state = {  }
  render() {
    return (
      <div>
        <div>Auth Page</div>
        <NavLink to="/auth/signin" activeStyle={{color: 'red'}}>sign in</NavLink>
        <NavLink to="/auth/signup" activeStyle={{color: 'red'}}>sign up</NavLink>

        <Route path="/auth/signin" render={() => <SignInForm onSubmit={this.handleSignIn} />}/>
        <Route path="/auth/signup" render={() => <SignUpForm onSubmit={this.handleSignUp} />}/>
      </div>
    );
  }

  handleSignIn = (values) => console.log('--', values); 

  handleSignUp = (values) => console.log('--', values); 
}

export default AuthPage;