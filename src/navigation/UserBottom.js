import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Dashboard/Home/Home';
import LearnandEarn from '../screens/Dashboard/LearnandEarn/LearnandEarn';
import BurnandEarn from '../screens/Dashboard/Burnandearn/Burnandearn';
import Wallet from '../screens/Dashboard/Wallet/Wallet';
import { AppTheme } from '../theme/theme';
import { hp, wp } from '../FontResponsiveness/FontResponsiveness';
import { iconPath } from '../Constants/iconandImages';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Mybookingstatus from '../screens/Dashboard/Mybookingstatus/Mybookingstatus';
const UserBottom = () => {
    const Tab = createBottomTabNavigator();
    return (


        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            tabBarStyle: {
                backgroundColor: AppTheme.tabBackGroundcolor,  overflow: 'hidden', borderTopWidth: 0,
                         
             },
            
          }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="home" size={25} color={AppTheme.iconcolor} />
            ) : (
              <Icon name="home" size={25} color={AppTheme.iconcolor1} />
            ),
        }}
      />
      

<Tab.Screen
        name="Mybookingstatus"
        component={Mybookingstatus}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="car" size={25} color={AppTheme.iconcolor} />
            ) : (
              <Icon name="car" size={25} color={AppTheme.iconcolor1} />
            ),
        }}
      />



    </Tab.Navigator>

    );
}

export default UserBottom;

const styles = StyleSheet.create({
    TabStyle: {
        backgroundColor: AppTheme.tabBackGroundcolor,
        borderTopWidth: 0,
        height: wp(10),
    },
    iconSize: {
        width: wp(6),
        height: wp(6),
        marginTop: 5,
    },
});

