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
} from 'native-base';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

function ItemProfileScreen({route}: any) {
  // const dispatch = useDispatch<any>();
  const items = useSelector((state: any) => state.data);
  const {itemId} = route.params;
  let findItem = items.data.find((item: any) => item.id == itemId);
  return (
    <SafeAreaView>
      <Box color="orange.600" width="100%">
        <Box width="100%" height="250">
          <Image
            source={{uri: findItem.image}}
            style={{width: '100%', height: '100%'}}
          />
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'lg',
            }}
            position="absolute"
            bottom="0"
            right="0"
            px="3"
            py="1.5">
            {findItem.price + '$'}
          </Center>
        </Box>
        <Box
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
          padding="15"
          height="100%">
          <Heading fontSize="xl" p="4" pb="3">
            {findItem.name}
          </Heading>
          <Text>{findItem.description}</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default ItemProfileScreen;
