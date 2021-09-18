import React from 'react';
import {Text,Image,View,ImageBackground,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Signup from './Signup';

 class Welcome extends React.Component{

  
 
    render(){
        return(
            <ImageBackground  source={require("../Images/welcome_background.jpg")} style={styles.background}>
            <Text style={styles.text}>Connect People</Text>
             
            
             <TouchableOpacity style={styles.joinbutton} onPress={()=>{this.props.navigation.navigate("Signup")}} >
                 <Text style={{color:"#fff"}}>Join</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.loginbutton} onPress={()=>{this.props.navigation.navigate("Login")}}  >
                 <Text style={{color:"rgb(179, 7, 127)"}}>Login</Text>
             </TouchableOpacity>

            </ImageBackground>
        )
    }
}

export default Welcome;

const styles=StyleSheet.create({
    logo:{
        textAlign:"left",
        height:40,
        width:40,
        borderRadius:40,
        marginLeft:10,
        
    },

    joinbutton:{
        backgroundColor:"rgb(179, 7, 127)",
       
        
        borderRadius:20,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        height:30,
        marginTop:300,

    },

    loginbutton:{
        backgroundColor:"#fff",
       
        
        borderRadius:20,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        height:30,
        marginTop:10,
    },

    text:{
        color:"#fff",
        fontSize:35,
        marginTop:50,
    },

background:{
flex:1,
alignItems:"center",
},
})


