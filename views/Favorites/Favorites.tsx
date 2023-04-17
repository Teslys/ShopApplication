import {View, StyleSheet, ScrollView} from 'react-native';
import {Center, Spinner, Input, Icon} from 'native-base';
import FavoritesItemsCard from './components/FavoritesItemsCard';
import {getData} from '../../store/thunk/DataThunk';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FlatList,
  Box,
  Avatar,
  VStack,
  HStack,
  Heading,
  Text,
} from 'native-base';

function handleInfinityScroll(event: any) {
  let mHeight = event.nativeEvent.layoutMeasurement.height;
  let cSize = event.nativeEvent.contentSize.height;
  let Y = event.nativeEvent.contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) return true;
  return false;
}

function FavoritesScreen() {
  // const dispatch = useDispatch<any>();
  const items = useSelector((state: any) => state.data);
  const [loading, setLoading] = useState(false);
  const [startedData, setStartedData] = useState(12);
  const [search, setSearch] = useState('');
  const filteredData = items.favorites.filter((item: any) => {
    return item.name.toLowerCase().split(search).length > 1;
  });
  return (
    <ScrollView
      onScroll={e => {
        if (handleInfinityScroll(e) && filteredData.length > startedData) {
          setLoading(true);
          setStartedData(startedData + 12);
        } else {
          setLoading(false);
        }
      }}>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          My Favorites
        </Heading>
        <Center>
          <Input
            w={{
              base: '95%',
              md: '25%',
            }}
            marginTop="2%"
            marginBottom="2%"
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="magnify" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Search"
            onEndEditing={e => setSearch(e.nativeEvent.text)}
          />
        </Center>
        {filteredData.map((item: any, key: number) => {
          return (
            <FavoritesItemsCard
              key={key}
              title={item.name}
              price={item.price}
              photo={item.image}
              id={item.id}></FavoritesItemsCard>
          );
        })}
      </Box>
    </ScrollView>
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
});

export default FavoritesScreen;
