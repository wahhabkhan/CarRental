import {
  TOTALSCORE,
  USERDATA
} from '../types';

export const savePoints = data => {
  return {
    type: TOTALSCORE,
    payload: data,
  };
};

export const adduserinfo = data => {
  return {
    type: USERDATA,
    payload: data,
  };
};
