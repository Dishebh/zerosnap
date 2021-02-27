import axios from 'axios';
import {
  FETCH_USER,
  FETCH_ERROR,
  SEND_SNAP,
  GET_SNAPS,
  READ_SNAP,
  VIEW_SNAP,
} from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const sendSnap = (cameraImage) => async (dispatch) => {
  try {
    const res = await axios.post('/api/snap', {
      imageUrl: cameraImage,
    });

    dispatch({ type: SEND_SNAP, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const getSnaps = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/snaps');

    dispatch({ type: GET_SNAPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const readSnap = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/snap/${_id}`);

    dispatch({ type: READ_SNAP, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const viewSnap = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/snap/${id}`);

    dispatch({ type: VIEW_SNAP, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};
