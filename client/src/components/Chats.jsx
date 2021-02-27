import { Avatar } from '@material-ui/core';
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RESET_CAMERA_IMAGE } from '../actions/types';
import { getSnaps } from '../actions';
import Chat from './Chat';
import './Chats.css';

const Chats = ({ user, getSnaps, posts }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    !user && history.replace('/login');
  }, [user, history]);

  useEffect(() => {
    getSnaps();
  }, [getSnaps]);

  const takeSnap = () => {
    dispatch({ type: RESET_CAMERA_IMAGE });
    history.push('/');
  };

  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar src={user.profilePic} className='chats__avatar' />
        <div className='chats__search'>
          <Search className='chats__searchIcon' />
          <input className='chats__input' placeholder='Friends' type='text' />
        </div>
        <ChatBubble className='chats__chatIcon' fontSize='small' />
      </div>

      <div className='chats__posts'>
        {posts &&
          Array.isArray(posts) &&
          posts.map((post, key) => <Chat key={key} post={post} />)}
      </div>

      <RadioButtonUnchecked
        className='webcamCapture__button camera__button'
        fontSize={`large`}
        onClick={takeSnap}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
  posts: state.snap,
});

export default connect(mapStateToProps, { getSnaps })(Chats);
