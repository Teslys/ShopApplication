import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = createAsyncThunk('data/getData', async () => {
  const res = await axios(
    'https://5fc9346b2af77700165ae514.mockapi.io/products',
  );
  const data = await res.data;
  let favorites = await AsyncStorage.getItem('favorites');
  var favoritesArray = favorites == null ? [] : JSON.parse(favorites);
  let cart = await AsyncStorage.getItem('cart');
  var cartArray = cart == null ? [] : JSON.parse(cart);
  return {
    favorites:
      favoritesArray?.data == undefined ? favoritesArray : favoritesArray.data,
    cart: cartArray?.data == undefined ? cartArray : cartArray.data,
    data: data,
  };
});

export const setFavoriteStorage = createAsyncThunk(
  'data/setFavoriteStorage',
  async ({id}, {rejectWithValue}) => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');

      if (favorites !== null) {
        var favoritesArray = JSON.parse(favorites);
        var findItem = favoritesArray.data.find(item => item == id);
        // console.log(favoritesArray);
        if (!findItem) {
          favoritesArray.data.push(id.toString());
          let favoritesStringify = JSON.stringify({data: favoritesArray.data});
          AsyncStorage.setItem('favorites', favoritesStringify);
        } else {
          favoritesArray.data = favoritesArray.data.filter(
            item => item != id.toString(),
          );
          let favoritesStringify = JSON.stringify({
            data: favoritesArray.data,
          });
          AsyncStorage.setItem('favorites', favoritesStringify);
        }
        return favoritesArray.data;
      } else {
        let favoritesStringify = JSON.stringify({data: [id]});
        AsyncStorage.setItem('favorites', favoritesStringify);
        return [id];
      }
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const setCartStorage = createAsyncThunk(
  'data/setCartStorage',
  async ({id}, {rejectWithValue}) => {
    try {
      let cart = await AsyncStorage.getItem('cart');

      if (cart !== null) {
        var cartArray = JSON.parse(cart);
        var findItem = cartArray.data.find(item => item.id == id);
        // console.log(cartArray);
        if (!findItem) {
          cartArray.data.push({id: id.toString(), count: 1});
          let cartStringify = JSON.stringify({data: cartArray.data});
          AsyncStorage.setItem('cart', cartStringify);
        }

        return cartArray.data;
      } else {
        let cartStringify = JSON.stringify({
          data: [{id: id.toString(), count: 1}],
        });
        AsyncStorage.setItem('cart', cartStringify);
        return [id];
      }
    } catch (err) {
      rejectWithValue(err);
    }
  },
);
export const setCartCount = createAsyncThunk(
  'data/setCartCount',
  async ({id, count}, {rejectWithValue}) => {
    try {
      let cart = await AsyncStorage.getItem('cart');

      if (cart !== null) {
        var cartArray = JSON.parse(cart);
        var findItem = cartArray.data.find(item => item.id == id);
        // console.log(cartArray);
        if (findItem) {
          findItem.count = count;
          let cartStringify = JSON.stringify({data: cartArray.data});
          AsyncStorage.setItem('cart', cartStringify);
        }

        return cartArray.data;
      }
    } catch (err) {
      rejectWithValue(err);
    }
  },
);
export const deleteCart = createAsyncThunk(
  'data/deleteCart',
  async ({id}, {rejectWithValue}) => {
    try {
      let cart = await AsyncStorage.getItem('cart');

      if (cart !== null) {
        var cartArray = JSON.parse(cart);
        var findItem = cartArray.data.find(item => item.id == id);
        // console.log(cartArray);
        if (findItem) {
          cartArray.data = cartArray.data.filter(
            item => item.id != id.toString(),
          );
          let cartStringify = JSON.stringify({
            data: cartArray.data,
          });
          AsyncStorage.setItem('cart', cartStringify);
        }

        return cartArray.data;
      }
    } catch (err) {
      rejectWithValue(err);
    }
  },
);
