import { SET_PICKER_POINT1, SET_PICKER_POINT2,SET_SELECTED_ITEMS,SET_TOTAL_AMOUNT } from './actionTypes';

export const setPickerPoint1 = (point) => ({

  type: SET_PICKER_POINT1,
  payload: point,
});

export const setPickerPoint2 = (point) => ({
  type: SET_PICKER_POINT2,
  payload: point,
});


export const setSelectedItems = (selectedItems) => ({
  type: SET_SELECTED_ITEMS,
  payload: selectedItems,
});

export const setTotalAmount = (totalAmount) => ({
  type: SET_TOTAL_AMOUNT,
  payload: totalAmount,
});