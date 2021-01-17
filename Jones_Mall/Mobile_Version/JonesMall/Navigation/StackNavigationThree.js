import React from 'react';
import {Text,View,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "@react-navigation/stack";
import {createAppContainer,NavigationContainer} from 'react-navigation'; 
import MyProfile from '../Screens/MyProfile';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';

 
const Stack =createStackNavigator();

const MainStackNavigatorThree=()=>{
  return(
    
  !AsyncStorage.getItem("token")?(<Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:"#fff"},
      headerTintColor:"black"

    }}
    
    >
  
     <Stack.Screen name="Profile" component={MyProfile}/>
    </Stack.Navigator>):


(<Stack.Navigator
screenOptions={{
  headerStyle:{backgroundColor:"#fff"},
  headerTintColor:"black"

}}

>

<Stack.Screen name="Signup" component={Signup}/>
<Stack.Screen name="Login" component={Login}/>
</Stack.Navigator>)



  )
}

export default MainStackNavigatorThree;