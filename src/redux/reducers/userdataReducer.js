import {
  TOTALSCORE,
  USERDATA
} from '../types';
const initState = {
  totalScore: 0,
  user:[]
};
const userdataReducer = (state = initState, action) => {
  console.log('state of redux', state);
  switch (action.type) {
    case TOTALSCORE:
      return {
        ...state,
        totalScore: action.payload,
      };
    case USERDATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userdataReducer;
