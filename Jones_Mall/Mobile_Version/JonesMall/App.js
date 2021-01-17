import React from 'react';
//import 'react-native-gesture-handler';
import { StyleSheet, Text, View,Dimensions,AsyncStorage } from 'react-native';
//import {AsyncStorage} from '@react-native-community/async-storage';
import BottomTab from './Navigation/BottomNav';
import {NavigationContainer} from '@react-navigation/native';




//For disabling the warnings
console.disableYellowBox=true;



export default class App extends React.Component{
    render(){
       {
           return(
               <NavigationContainer>
                   <BottomTab/>
               </NavigationContainer>
           
           )
       }
    }
}

