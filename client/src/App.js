import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import WebcamCapture from './components/WebcamCapture';
import Chats from './components/Chats';
import Preview from './components/Preview';
import ChatView from './components/ChatView';
import { PhoneIphone } from '@material-ui/icons';
import { Login } from './components/Login';
import { Button } from '@material-ui/core';
import { fetchUser } from './actions';

import './App.css';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_DEV;

function App({ fetchUser, user }) {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = () => {};

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='App__body'>
          <Switch>
            <Route exact path='/'>
              <WebcamCapture />
            </Route>
            <Route exact path='/preview'>
              <Preview />
            </Route>
            <Route exact path='/chats'>
              <Chats />
            </Route>
            <Route exact path='/chats/view'>
              <ChatView />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
          </Switch>
          <div className='phone__container'>
            <PhoneIphone className='phone' />
          </div>
        </div>
      </BrowserRouter>

      <div className='app__logo'>
        {Object.keys(user).length !== 0 && (
          <img
            src='https://www.freepnglogos.com/uploads/snapchat-icon-logo-png-15.png'
            alt=''
          />
        )}
      </div>

      <div className='logout__container'>
        {Object.keys(user).length !== 0 && (
          <Button
            className='logout__button'
            color='primary'
            variant='contained'
            onClick={logout}
          >
            <a href={`${baseUrl}/auth/logout`} className='href'>
              Logout
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { fetchUser })(App);
