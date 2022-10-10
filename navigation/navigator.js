import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Write from '../screens/Write';

const Tabs = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Write' component={Write} />
    </Tabs.Navigator>
  );
};

export default Navigator;
