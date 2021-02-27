import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { readSnap, viewSnap } from '../actions';

import './Chat.css';

const Chat = ({ post, readSnap, viewSnap }) => {
  const history = useHistory();

  const open = async () => {
    if (!post.read) {
      await readSnap(post._id);
      await viewSnap(post._id);
      history.push('/chats/view');
    }
  };

  return (
    <div onClick={open} className='chat'>
      <Avatar src={post.profilePic} className='chat__avatar' />
      <div className='chat__info'>
        <h4>{post.name}</h4>
        <p>
          {!post.read && <span>New Snap - </span>}
          <ReactTimeago date={new Date(post.date).toUTCString()} />
        </p>
      </div>
      {!post.read && <StopRounded className='chat__readIcon' />}
    </div>
  );
};

export default connect(null, { readSnap, viewSnap })(Chat);
