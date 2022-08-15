// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Auth/Splash/Splash';
import BottomTab from './BottomTab';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import Bookcar from '../screens/Dashboard/Home/Bookcar';
import Addcar from '../screens/Dashboard/LearnandEarn/Addcar';
import Editcar from '../screens/Dashboard/LearnandEarn/Editcar';
import Showbokkdetail from '../screens/Dashboard/Burnandearn/Showbokkdetail';
import Edituser from '../screens/Dashboard/Home/Edituser';
import UserBottom from './UserBottom';
const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Bookcar" component={Bookcar} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="UserBottom" component={UserBottom} />
        <Stack.Screen name="Addcar" component={Addcar} />
        <Stack.Screen name="Editcar" component={Editcar} />
        <Stack.Screen name="Showbokkdetail" component={Showbokkdetail} />
        <Stack.Screen name="Edituser" component={Edituser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;