import {View, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import {
  Center,
  Spinner,
  Input,
  Icon,
  Box,
  Avatar,
  VStack,
  HStack,
  Heading,
  Text,
  IconButton,
} from 'native-base';
import CartItemsCard from './components/CartItemsCard';
import {getData} from '../../store/thunk/DataThunk';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

function CartScreen() {
  // const dispatch = useDispatch<any>();
  const items = useSelector((state: any) => state.data);
  const [loading, setLoading] = useState(false);
  const [startedData, setStartedData] = useState(12);
  const [search, setSearch] = useState('');
  const filteredData = items.cart.filter((item: any) => {
    return item.name.toLowerCase().split(search).length > 1;
  });
  return (
    <SafeAreaView>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          My Cart
        </Heading>
        <View style={styles.listItem}>
          <View style={{marginLeft: '4%', justifyContent: 'center', flex: 1}}>
            <Text style={{fontWeight: 'bold'}}>Price</Text>
          </View>
          <HStack space={3} alignItems={'center'}>
            <Text>
              {filteredData
                .map(
                  (item: any) =>
                    Number(item.price.split('.').join('')) * Number(item.count),
                )
                .reduce((a: any, b: any) => a + b, 0) + ' $'}
            </Text>
            <IconButton
              size={'sm'}
              variant="solid"
              background="green.500"
              _icon={{
                as: MaterialCommunityIcons,
                name: 'cart',
              }}
            />
          </HStack>
        </View>
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <CartItemsCard
              key={item.id}
              title={item.name}
              price={item.price}
              photo={item.image}
              id={item.id}
              count={item.count}
            />
          )}
          keyExtractor={item => item.id}
        />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '45%', // is 50% of container width
    margin: '2.5%',
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});

export default CartScreen;
