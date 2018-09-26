import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from 'firebase';
import db from '../firestore';
import history from '../history';

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  handleSignup = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      db.collection('users').doc(`${newUser.user.uid}`).set({
        email: email,
        name: username
      })
      return history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className='login-signup-container'>
        <div className='form-container'>
          <h1>Signup</h1>
          <Form onSubmit={this.handleSignup}>
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
              icon='user'
              iconPosition='left'
              placeholder='Name'
              name='username'
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
            <Button type='submit'>Signup</Button>
            <p>Or <a href='/login'>login</a></p>
          </Form>
        </div>
      </div>
    );
  }
}
