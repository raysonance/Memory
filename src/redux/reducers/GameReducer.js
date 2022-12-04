let defaultState = {
  gameItems: { score: 0, key: '' },
};

let GameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREASE_SCORE': {
      let newState = { ...state };

      if (action.payload.point) {
        newState.gameItems = {
          score: action.payload.point,
          key: action.payload.key,
        };
      } else {
        newState.gameItems = {
          score: 0,
          key: action.payload.key,
        };
      }
      return newState;
    }
    default:
      return state;
  }
};

export default GameReducer;
