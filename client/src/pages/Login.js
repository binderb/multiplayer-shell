import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);


    // update state based on form input changes
  const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  console.log(data)
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };

  return (
    <div className='p-4'>
      <h1>Login</h1>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="login-form">
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              className='textfield'
              id='email'
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
            name='password'
              type='password'
              className='textfield'
              id='password'
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='rounded bg-green-800 p-1 px-2 hover:bg-green-700'>
            Login
          </button>
        </form>
      )}
      {error && (
        <div className='alert alert-danger mt-4' role='alert'>
          {error.Message}
        </div>
      )}
    </div>
  );
      }

export default Login;
