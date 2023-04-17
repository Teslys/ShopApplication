import {Text, Icon, Center, Pressable, Badge} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {selectNavigation} from '../../../store/reducers/NavigatorReducer';
import {useNavigation} from '@react-navigation/native';

interface props {
  title: string;
  defaultIcon: string;
  selectedIcon: string;
  id: number;
  location: string;
}
function NavigatorItem({
  title,
  defaultIcon,
  selectedIcon,
  id,
  location,
}: props): JSX.Element {
  const selected = useSelector(state => state.navigator.selected);
  const cart = useSelector(state => state.data.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      opacity={selected === id ? 1 : 0.5}
      py="3"
      flex={1}
      onPress={() => {
        dispatch(selectNavigation(id));
        navigation.navigate(location, {});
      }}>
      <Center>
        {id == 2 ? (
          <Badge // bg="red.400"
            colorScheme="danger"
            rounded="full"
            mb={-4}
            mr={6}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 12,
            }}>
            {cart.length}
          </Badge>
        ) : (
          <></>
        )}
        <Icon
          mb="1"
          as={
            <MaterialCommunityIcons
              name={selected === id ? defaultIcon : selectedIcon}
            />
          }
          color="white"
          size="lg"
        />
        <Text color="white" fontSize="12">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}

export default NavigatorItem;
