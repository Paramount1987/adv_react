import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class SignUpForm extends Component {
  state = {  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="email" component={ErrorField} />
          </div>
          <div>
            <Field name="password" component={ErrorField} type="password" />
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({email, password}) => {
  const errors = {};

  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if (!password) errors.password = 'password is required';
  else if (password.length < 8) errors.password = 'too short';

  return errors;
}

export default reduxForm({
  form: 'auth', // TODO: change name form to reg
  validate
})(SignUpForm);