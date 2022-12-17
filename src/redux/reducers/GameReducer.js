let defaultState = {
  gameItems: { score1: 0, score2: 0, key: "", player: 1 },
};

// change players after each dispatch/win
const changePlayers = (player) => (player === 1 ? 2 : 1);

let GameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INCREASE_SCORE": {
      let newState = { ...state };
      if (action.payload.player === 1) {
        newState.gameItems = {
          score1: action.payload.score1,
          score2: action.payload.score2,
          key: action.payload.key,
          player: changePlayers(action.payload.player),
        };
      } else if (action.payload.player === 2) {
        newState.gameItems = {
          score1: action.payload.score1,
          score2: action.payload.score2,
          key: action.payload.key,
          player: changePlayers(action.payload.player),
        };
      } else {
        newState.gameItems = {
          score1: 0,
          score2: 0,
          player: 1,
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
