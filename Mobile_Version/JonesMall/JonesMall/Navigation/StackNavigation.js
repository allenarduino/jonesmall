import React from 'react';
import {Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "@react-navigation/stack";
import {createAppContainer,NavigationContainer} from 'react-navigation'; 
import Products from '../Screens/Products';
import Cart  from '../Screens/Cart';

 
const Stack =createStackNavigator();

const MainStackNavigator=()=>{
  return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:"#fff"},
      headerTintColor:"black"

    }}
    
    >
       <Stack.Screen name="Products" component={Products}
        options={{
          headerRight:(props)=>(
            <Icon name="cart"   size={26} style={{marginRight:20}} />
          )
        }}
       />
      <Stack.Screen name="Cart" component={Cart} 
     
      />
    
      
    </Stack.Navigator>
  )
}

export default MainStackNavigator;