import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import navigatorReducer from './reducers/NavigatorReducer';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './reducers/DataReducer';
import thunk from 'redux-thunk';
import {getData} from './thunk/DataThunk';


export default configureStore({
  reducer: {
    navigator: navigatorReducer,
    data: dataReducer,
  },
});
