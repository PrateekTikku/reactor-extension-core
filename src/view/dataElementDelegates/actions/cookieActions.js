import { createAction, handleActions } from 'redux-actions';

const SET_NAME = 'dataElementDelegates/cookie/SET_NAME';

export let actionCreators = {
  setName: createAction(SET_NAME)
};

export default handleActions({
  [SET_NAME]: (state, action) => {
    return state.set('name', action.payload);
  }
});
