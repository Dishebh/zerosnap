import { GET_SNAPS, READ_SNAP, SEND_SNAP } from '../actions/types';

export const snapReducer = (state = [], action) => {
  switch (action.type) {
    case SEND_SNAP:
      return action.payload || false;
    case GET_SNAPS:
      return [...action.payload];
    case READ_SNAP:
      return action.payload || false;
    default:
      return state;
  }
};
