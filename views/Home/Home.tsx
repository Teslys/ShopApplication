import {View, StyleSheet, ScrollView} from 'react-native';
import {Center, Spinner, Input, Icon} from 'native-base';
import ItemsCard from './components/ItemsCard';
import {getData} from '../../store/thunk/DataThunk';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function handleInfinityScroll(event: any) {
  let mHeight = event.nativeEvent.layoutMeasurement.height;
  let cSize = event.nativeEvent.contentSize.height;
  let Y = event.nativeEvent.contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) return true;
  return false;
}

function HomeScreen() {
  const dispatch = useDispatch<any>();
  const items = useSelector((state: any) => state.data);
  const [loading, setLoading] = useState(false);
  const [startedData, setStartedData] = useState(12);
  const [search, setSearch] = useState('');
  const filteredData = items.data.filter((item: any) => {
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
      <Center>
        <Input
          w={{
            base: '95%',
            md: '25%',
          }}
          marginTop="2%"
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
      <View style={styles.container}>
        {filteredData
          .filter((item: any, key: number) => key < startedData)
          .map((elem: any, key: number) => {
            return (
              <View style={styles.item} key={key}>
                <ItemsCard
                  title={elem.name}
                  photo={elem.image}
                  price={elem.price}
                  id={elem.id}></ItemsCard>
              </View>
            );
          })}
      </View>
      {loading ? (
        <Center>
          <Spinner size="lg" accessibilityLabel="Loading posts" />
        </Center>
      ) : (
        <></>
      )}
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

export default HomeScreen;
