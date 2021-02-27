import { VIEW_SNAP } from '../actions/types';

export const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_SNAP:
      return action.payload || false;
    default:
      return state;
  }
};
