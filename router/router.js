import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../views/Home/Home';
import FavoritesScreen from '../views/Favorites/Favorites';
import CartScreen from '../views/Cart/Cart';
import ItemProfileScreen from '../views/ItemProfile/ItemProfile';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Favorites"
        options={{
          headerShown: false,
        }}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="Cart"
        options={{
          headerShown: false,
        }}
        component={CartScreen}
      />
      <Stack.Screen
        name="ItemProfile"
        options={{
          title:"Shop"
        }}
        component={ItemProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default Router;
