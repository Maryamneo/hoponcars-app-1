import { SET_PICKER_POINT1, SET_PICKER_POINT2 } from './actionTypes';

export const setPickerPoint1 = (point) => ({

  type: SET_PICKER_POINT1,
  payload: point,
});

export const setPickerPoint2 = (point) => ({
  type: SET_PICKER_POINT2,
  payload: point,
});
