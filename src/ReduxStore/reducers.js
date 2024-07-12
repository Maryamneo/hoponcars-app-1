// import { SET_PICKER_POINT1, SET_PICKER_POINT2, PHONE_NUMBER, SET_SELECTED_ITEMS, SET_TOTAL_AMOUNT } from './actionTypes';

// const initialState = {
//   pickerPoint1: '',
//   pickerPoint2: '',
//   phoneNumber: '',
//   selectedItems: [],
//   totalAmount: 0,
// };

// const pickerPointsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_PICKER_POINT1:
//       console.log('SET_PICKER_POINT1 payload:', action.payload);
//       return { ...state, pickerPoint1: action.payload };
      
//     case SET_PICKER_POINT2:
//       return { ...state, pickerPoint2: action.payload };

//     case PHONE_NUMBER:
//       console.log('PHONE_NUMBER payload:', action.payload);
//       return { ...state, phoneNumber: action.payload };

//     case SET_SELECTED_ITEMS:
//       return { ...state, selectedItems: action.payload };

//     case SET_TOTAL_AMOUNT:
//       return { ...state, totalAmount: action.payload };

//     default:
//       return state;
//   }
// };

// export default pickerPointsReducer;
// reducers.js
import { SET_PICKER_POINT1, SET_PICKER_POINT2, PHONE_NUMBER, SET_SELECTED_ITEMS, SET_TOTAL_AMOUNT } from './actionTypes';

const initialState = {
  pickerPoint1: '',
  pickerPoint2: '',
  phoneNumber: '',
  selectedItems: [],
  totalAmount: 0,
};

const pickerPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKER_POINT1:
      return { ...state, pickerPoint1: action.payload };
    case SET_PICKER_POINT2:
      return { ...state, pickerPoint2: action.payload };
    case PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case SET_SELECTED_ITEMS:
      return { ...state, selectedItems: action.payload };
    case SET_TOTAL_AMOUNT:
      return { ...state, totalAmount: action.payload };
    default:
      return state;
  }
};

export default pickerPointsReducer;
