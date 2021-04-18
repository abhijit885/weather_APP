import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from './Search'
import Home from './Home'
import Splach from '../screens/Splach';
import Icon from 'react-native-vector-icons/FontAwesome';
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator()
function HOMEDROWER({ navigation }) {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#e300ff" />

            <Tab.Navigator
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "home") {
                            iconName = focused ? 'home' : 'home'
                        } else if (route.name === "search") {
                            iconName = focused ? "search" : "search"
                        }
                        return <Icon name={iconName} size={25} color={color} />
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "white",
                    inactiveTintColor: "black",
                    activeBackgroundColor: "#e300ff",
                    inactiveBackgroundColor: "#e300ff"
                }}
            >
                <Tab.Screen name="home" component={Home}
                    initialParams={{ city: "london" }}
                />
                <Tab.Screen name="search" component={Search} />
            </Tab.Navigator>
        </>
    );
}
const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Splach" component={Splach} />
        <RootStack.Screen name="home" component={HOMEDROWER} />
    </RootStack.Navigator>
);

export default RootStackScreen;