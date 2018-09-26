import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from 'firebase';
import history from '../history';

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  handleLogin = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => (
        firebase.auth().signInWithEmailAndPassword(email, password)
      ))
      .then(() => console.log('Login successful'))
      .then(() => history.push('/'));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className='login-signup-container'>
        <div className='form-container'>
          <h1>Login</h1>
          <Form onSubmit={this.handleLogin}>
            <Form.Field className='input-container'>
              <Input
              icon='mail'
              iconPosition='left'
              placeholder='Email'
              name='email'
              onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='input-container'>
              <Input
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              onChange={this.handleChange}/>
            </Form.Field>
            <Button type='submit'>Login</Button>
            <p>Or <a href='/signup'>signup</a></p>
          </Form>
        </div>
      </div>
    );
  }
}

