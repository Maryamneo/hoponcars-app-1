import { combineReducers } from 'redux';
import pickerPointsReducer from './reducers';

const rootReducer = combineReducers({
  pickerPoints: pickerPointsReducer,
});

export default rootReducer;
