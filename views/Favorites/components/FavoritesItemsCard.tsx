import React from 'react';
import {
  Box,
  HStack,
  IconButton,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Button,
  Pressable,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setFavoriteStorage,
  setCartStorage,
} from '../../../store/thunk/DataThunk';
import {useNavigation} from '@react-navigation/native';

interface props {
  title: string;
  photo: string;
  price: number;
  id: number;
}
const FavoritesItemsCard = ({photo, title, price, id}: props) => {
  const items = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const findedCartById = items.cart.find((item: any) => item.id == id);

  return (
    <Box alignItems="center" style={{marginTop: '1%'}}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
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
        }}>
        <Box>
          <Pressable
            onPress={() =>
              navigation.navigate('ItemProfile', {
                itemId: id,
              })
            }>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: photo,
                }}
                alt="image"
              />
            </AspectRatio>
          </Pressable>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            {price + '$'}
          </Center>
          <Center
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            top="0"
            right="0"
            px="3"
            py="3">
            <IconButton
              variant="solid"
              borderRadius="full"
              colorScheme="red"
              size="sm"
              onPress={() => dispatch(setFavoriteStorage({id}))}
              _icon={{
                as: <MaterialCommunityIcons size={35} name={'close'} />,
              }}
            />
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2} height={50}>
            <Heading size="sm" ml="-1">
              {title}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <HStack alignItems="center">
              <Button
                width="100%"
                disabled={findedCartById != undefined}
                color={
                  findedCartById != undefined ? 'primary.600' : 'green.600'
                }
                onPress={() => dispatch(setCartStorage({id}))}>
                {findedCartById == undefined ? 'Add To Cart' : 'Added'}
              </Button>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default FavoritesItemsCard;
