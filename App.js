
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Search from './screens/Search'
import Home from './screens/Home'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Splash from './screens/Splach';
import RootStack from './screens/RootStack'
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();
function SPLASH({ navigation }) {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />

      </Stack.Navigator>
    </>
  );
}
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
};


export default App;
