import React from 'react';
import {Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "@react-navigation/stack";
import {createAppContainer,NavigationContainer} from 'react-navigation'; 
import SingleCategory from '../Screens/SingleCategory';
import Categories from '../Screens/Categories';


 
const Stack =createStackNavigator();

const MainStackNavigatorTwo=()=>{
  return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:"#fff"},
      headerTintColor:"black"

    }}
    
    >

      <Stack.Screen name="Categories" component={Categories}/>
      <Stack.Screen name="SingleCategory" component={SingleCategory}/>
      

    </Stack.Navigator>
  )
}

export default MainStackNavigatorTwo;