import { SET_PICKER_POINT1, SET_PICKER_POINT2 } from './actionTypes';

const initialState = {
  pickerPoint1: '',
  pickerPoint2: '',
};

const pickerPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKER_POINT1:
        console.log('SET_PICKER_POINT1 payload:', action.payload);
      return { ...state, pickerPoint1: action.payload };
      
    case SET_PICKER_POINT2:
      return { ...state, pickerPoint2: action.payload };
    default:
      return state;
  }
};

export default pickerPointsReducer;
