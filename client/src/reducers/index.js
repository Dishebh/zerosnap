import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { cameraReducer } from './cameraReducer';
import { snapReducer } from './snapReducer';
import { imageReducer } from './imageReducer';

export default combineReducers({
  auth: authReducer,
  camera: cameraReducer,
  snap: snapReducer,
  image: imageReducer,
});
