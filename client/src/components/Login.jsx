import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.app && state.app.user);

  const signIn = () => {};

  useEffect(() => {
    user && history.replace('/');
  }, [user, history]);

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          alt='login'
          src='https://www.freepnglogos.com/uploads/snapchat-icon-logo-png-15.png'
          className='login__img'
        />
        <Button
          color='primary'
          variant='contained'
          onClick={signIn}
          className='login__button'
        >
          <a href={`/auth/google`}>Sign In</a>
        </Button>
      </div>
    </div>
  );
};
