import { ChatBubble, RadioButtonUnchecked } from '@material-ui/icons';
import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import './WebcamCapture.css';
import { CAPTURE_IMAGE } from '../actions/types';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

const WebcamCapture = ({ user }) => {
  const history = useHistory();
  const webcamRef = useRef(null);
  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch({ type: CAPTURE_IMAGE, payload: imageSrc });
    history.push('/preview');
  }, [dispatch, history]);

  useEffect(() => {
    !user && history.replace('/login');
  }, [user, history]);

  return (
    <div className='webcamCapture'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat={`image/jpeg`}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUnchecked
        className='webcamCapture__button'
        onClick={capture}
        fontSize='large'
      />
      <ChatBubble
        onClick={() => history.replace('/chats')}
        className='camera__chatIcon'
        fontSize='small'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { fetchUser })(WebcamCapture);
