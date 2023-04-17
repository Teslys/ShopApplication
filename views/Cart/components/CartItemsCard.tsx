import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCart, setCartCount, setFavoriteStorage} from '../../../store/thunk/DataThunk';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {HStack, Button, Pressable, IconButton} from 'native-base';
import {useNavigation} from '@react-navigation/native';

interface props {
  title: string;
  photo: string;
  price: number;
  id: number;
  count: number;
}
function setCount(type: string, count: number, callback: any) {
  let countValue = count;
  if (type == 'increment') {
    countValue = count + 1;
  }
  if (type == 'decrement') {
    if (countValue > 1) {
      countValue = count - 1;
    }
  }

  return callback(countValue);
}

const CartItemsCard = ({photo, title, price, id, count}: props) => {
  // const favorites = useSelector((state: any) => state.data.favorites);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.listItem}>
      <Pressable
        onPress={() =>
          navigation.navigate('ItemProfile', {
            itemId: id,
          })
        }>
        <Image
          source={{uri: photo}}
          style={{width: 60, height: 60, borderRadius: 30}}
        />
      </Pressable>
      <View style={{marginLeft: '4%', justifyContent: 'center', flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      </View>
      <HStack space={3} alignItems={'center'}>
        <Button
          onPress={() =>
            setCount('decrement', count, (value: number) => {
              dispatch(setCartCount({id, count: value}));
            })
          }>
          -
        </Button>
        <Text>{count}</Text>
        <Button
          onPress={() =>
            setCount('increment', count, (value: number) => {
              dispatch(setCartCount({id, count: value}));
            })
          }>
          +
        </Button>
        <IconButton
          size={"sm"}
          variant="solid"
          background="red.500"
          _icon={{
            as: MaterialCommunityIcons,
            name: 'delete',
          }}
          onPress={() => dispatch(deleteCart({id}))}
        />
      </HStack>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});
export default CartItemsCard;
