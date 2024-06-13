import { LOGIN_GOTO_RECOVERY_START } from '../actions/dictionary';

const initialState = {
  recovery: false,
};

export default (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOGIN_GOTO_RECOVERY_START:
      newState.recovery = !state.recovery;
      return newState;
    default:
      return newState;
  }
};
