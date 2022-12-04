let defaultState = {
  switch: { nav: 'true' },
};

let SwitchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_SWITCH': {
      let newState = { ...state };
      newState.switch = {
        nav: action.payload.switch,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default SwitchReducer;
