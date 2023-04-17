import {SafeAreaView} from 'react-native';
import {useEffect} from 'react';
import {getData} from '../store/thunk/DataThunk';
import BottomNavigator from './navigator/BottomNavigator';
import Router from '../router/router';
import {useDispatch} from 'react-redux';

function LayoutScreen(): JSX.Element {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getData());
    // dispatch(getFavorites());
  }, [dispatch]);
  return (
    <>
      <Router />
      <BottomNavigator></BottomNavigator>
    </>
  );
}

export default LayoutScreen;
