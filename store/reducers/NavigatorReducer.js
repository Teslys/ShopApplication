import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import NavigatorActions from '../actions/NavigatorActions';

const initialState = {
  selected: 0,
};
export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState: initialState,
  reducers: NavigatorActions,
});

export const {selectNavigation} = navigatorSlice.actions;

export default navigatorSlice.reducer;
