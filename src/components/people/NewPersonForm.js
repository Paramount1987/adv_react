import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class NewPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="firstName" component={ErrorField} /> 
          <Field name="lastName" component={ErrorField} /> 
          <Field name="email" component={ErrorField} /> 
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}

function validate({firstName, email}) {
  const errors = {};

  if (!firstName) errors.firstName = 'firstName is required';

  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  return errors;
}

export default reduxForm({
  form: 'person',
  validate
})(NewPersonForm);