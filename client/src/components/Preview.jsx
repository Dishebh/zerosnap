import { CircularProgress } from '@material-ui/core';
import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendSnap } from '../actions';
import { RESET_CAMERA_IMAGE } from '../actions/types';
import './Preview.css';

const Preview = ({ cameraImage, sendSnap }) => {
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    !Object.keys(cameraImage).length && history.replace('/');
  }, [history, cameraImage]);

  const closePreview = () => {
    dispatch({ type: RESET_CAMERA_IMAGE });
    history.replace('/');
  };

  const sendPost = async () => {
    if (!progress) {
      setProgress(true);
      await sendSnap(cameraImage);
      history.replace('/chats');
    }

    setProgress(false);
  };

  return (
    <div className='preview'>
      <Close className='preview__close' onClick={closePreview} />
      <div className='preview__toolbarRight'>
        <TextFields className='toolbarRightIcon' />
        <Create className='toolbarRightIcon' />
        <Note className='toolbarRightIcon' />
        <MusicNote className='toolbarRightIcon' />
        <AttachFile className='toolbarRightIcon' />
        <Crop className='toolbarRightIcon' />
        <Timer className='toolbarRightIcon' />
      </div>
      <img src={cameraImage} alt='preview' />
      <div className='preview__footer' onClick={sendPost}>
        <h2>Send Now</h2>
        {progress ? (
          <CircularProgress className='preview__progress' />
        ) : (
          <Send fontSize='small' className='preview__sendIcon' />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cameraImage: state.camera,
});

export default connect(mapStateToProps, { sendSnap })(Preview);
