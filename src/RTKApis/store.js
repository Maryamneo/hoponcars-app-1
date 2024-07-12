// // store.js

// import { configureStore } from '@reduxjs/toolkit';
// import { vehicleApi } from './services/vehicleApi';
// import { userApi } from './services/userApi';

// const store = configureStore({
//   reducer: {
//     [vehicleApi.reducerPath]: vehicleApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(vehicleApi.middleware, userApi.middleware),
// });

// export default store;


// import { configureStore } from '@reduxjs/toolkit';
// import { vehicleApi } from './services/vehicleApi';

// import { userApi } from './services/userApi';
// // import pickerPointsReducer from '../ReduxStore/reducers/pickerPointsReducer';
// // import selectedItemsReducer from '../ReduxStore/reducers/selectedItemsReducer';
// // import totalAmountReducer from '../ReduxStore/reducers/totalAmountReducer';

// const store = configureStore({
//   reducer: {
//     [vehicleApi.reducerPath]: vehicleApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//     //  [userAppi.reducerPath]: userAppi.reducer,
//     // pickerPoints: pickerPointsReducer,
//     // selectedItems: selectedItemsReducer,
//     // totalAmount: totalAmountReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(vehicleApi.middleware).concat(userApi.middleware),
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { vehicleApi } from './services/vehicleApi';
import {userApi} from './services/userApi'; // Ensure the correct import

const store = configureStore({
  reducer: {
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [userApi.reducerPath]: userApi.reducer, // Use userApi.reducerPath here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehicleApi.middleware).concat(userApi.middleware), // Ensure userApi middleware is added
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { vehicleApi } from './services/vehicleApi';
// import { userApi } from './services/userApi'; // Corrected import path

// const store = configureStore({
//   reducer: {
//     [vehicleApi.reducerPath]: vehicleApi.reducer,
//     // [userApi.reducerPath]: userApi.reducer, // Corrected to use `userApi` instead of `userAppi`
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(vehicleApi.middleware, userApi.middleware), // Ensure userApi middleware is added
// });

// export default store;
