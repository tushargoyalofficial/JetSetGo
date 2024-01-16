import React, {memo, type FC, useCallback} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import NotificationScreen from './src/screens/Notification/Notification';

const Tab = createBottomTabNavigator();

const Blank = () => {
  return <View />;
};

const App: FC = () => {
  const customTabIcon = useCallback(
    ({name, size, color}: {name: string; size: number; color: string}) => {
      return <Entypo name={name} size={size} color={color} />;
    },
    [],
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#FB7200',
            tabBarInactiveTintColor: '#464962',
          }}>
          <Tab.Screen
            name="Explore"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
              tabBarIcon: props => customTabIcon({...props, name: 'home'}),
            }}
          />
          <Tab.Screen
            name="Watchlist"
            component={Search}
            options={{
              tabBarLabel: 'Watchlist',
              headerShown: false,
              tabBarIcon: props => customTabIcon({...props, name: 'heart'}),
            }}
          />
          <Tab.Screen
            name="Details"
            component={Blank}
            options={{
              tabBarLabel: 'Details',
              headerShown: false,
              tabBarIcon: props => customTabIcon({...props, name: 'price-tag'}),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              tabBarLabel: 'Notification',
              headerShown: false,
              tabBarIcon: props => customTabIcon({...props, name: 'bell'}),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default memo(App);
