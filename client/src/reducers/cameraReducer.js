import {
  CAPTURE_IMAGE,
  FETCH_ERROR,
  RESET_CAMERA_IMAGE,
} from '../actions/types';

export const cameraReducer = (state = {}, action) => {
  switch (action.type) {
    case CAPTURE_IMAGE:
      return action.payload || false;
    case RESET_CAMERA_IMAGE:
      return null;
    case FETCH_ERROR:
      return state;
    default:
      return state;
  }
};
