
import React from 'react';
import { StyleSheet, Text, View,Dimensions,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from '../Screens/Search';
import Cart from '../Screens/Cart';
import   MainStackNavigator  from './StackNavigation';
import   MainStackNavigatorTwo  from './StackNavigationTwo';
import   MainStackNavigatorThree  from './StackNavigationThree';







import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProfile from '../Screens/MyProfile';
import Products from '../Screens/Products';
import Categories from '../Screens/Categories';

const Tab=createBottomTabNavigator();

function BottomTab(){
    return(
        
   <Tab.Navigator
  tabBarOptions={{
      activeTintColor:"rgb(179, 7, 127)",
      
  }}
  
   >
<Tab.Screen
name="Products"
component={MainStackNavigator}
options={{
    tabBarLabel:"Products",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black", 
    tabBarIcon:({color})=>(
        <Icon name="ios-home"  color={color} size={26} />
    )
    
}}
/>



<Tab.Screen
name="Categories"
component={MainStackNavigatorTwo}
options={{
    tabBarLabel:"Categories",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black",
    tabBarIcon:({color})=>(
        <Icon name="basket"  color={color} size={26} />
    )
    
}}
/>



<Tab.Screen
name="Search"
component={Search}
options={{
    tabBarLabel:"Search",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black",

    tabBarIcon:({color})=>(
        <Icon name="ios-search"  color={color} size={26} />
    )
}}
/>



<Tab.Screen
name="Cart"
component={Cart}
options={{
    tabBarLabel:"Cart",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black",
    
    tabBarIcon:({color})=>(
        <Icon name="cart"  color={color} size={26} />
    )
}}
/>



<Tab.Screen
name="My Profile"
component={MainStackNavigatorThree}
options={{
    tabBarLabel:"My Profile",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black",
   
    tabBarIcon:({color})=>(
        <Icon name="ios-person"  color={color} size={26} />
    )
   
    
}}
/>
</Tab.Navigator>
   
    )
}



  


export default  BottomTab;


  
 


