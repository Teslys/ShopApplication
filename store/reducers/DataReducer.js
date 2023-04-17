import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import DataActions from '../actions/DataActions';
import {
  getData,
  setFavoriteStorage,
  setCartStorage,
  setCartCount,
  deleteCart,
} from '../thunk/DataThunk';

const initialState = {
  data: [],
  dataLength: 0,
  loading: 'idle',
  search: '',
  favorites: [],
  cart: [],
};
export const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: DataActions,
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      let getFavoritesData = action.payload.data.filter(
        item =>
          action.payload.favorites.find(res => res == item.id.toString()) !=
          undefined,
      );
      let getCartData = action.payload.data
        .filter(
          item =>
            action.payload.cart.find(res => res.id == item.id.toString()) !=
            undefined,
        )
        .map(item => {
          return {
            ...item,
            count: action.payload.cart.find(res => res.id == item.id.toString())
              .count,
          };
        });
      state.data = action.payload.data;
      state.favorites = getFavoritesData;
      state.cart = getCartData;
      state.dataLength = state.data.length;
    });
    builder.addCase(setFavoriteStorage.fulfilled, (state, action) => {
      let getData = state.data.filter(
        item => action.payload.find(res => res == item.id) != undefined,
      );
      state.favorites = getData;
    });
    builder.addCase(setCartStorage.fulfilled, (state, action) => {
      let getData = state.data
        .filter(
          item => action.payload.find(res => res.id == item.id) != undefined,
        )
        .map(item => {
          return {
            ...item,
            count: action.payload.find(res => res.id == item.id).count,
          };
        });
      state.cart = getData;
    });
    builder.addCase(setCartCount.fulfilled, (state, action) => {
      let getData = state.data
        .filter(
          item => action.payload.find(res => res.id == item.id) != undefined,
        )
        .map(item => {
          return {
            ...item,
            count: action.payload.find(res => res.id == item.id).count,
          };
        });
      state.cart = getData;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      let getData = state.data
        .filter(
          item => action.payload.find(res => res.id == item.id) != undefined,
        )
        .map(item => {
          return {
            ...item,
            count: action.payload.find(res => res.id == item.id).count,
          };
        });
      state.cart = getData;
    });
  },
});

export const {selectNavigation} = dataSlice.actions;

export default dataSlice.reducer;
