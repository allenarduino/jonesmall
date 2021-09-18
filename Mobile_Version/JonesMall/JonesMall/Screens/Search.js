import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,TextInput,Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';




class Search extends React.Component{
    render(){
        return(
    
        <View style={{alignItems:"center"}} >
     <TextInput 
     style={styles.searchinput}
     placeholder="Search....."
      />  

      <TouchableOpacity onPress={()=>{AsyncStorage.removeItem("token");}}>
          <Text>Log out</Text>
          </TouchableOpacity> 
      </View> 
                
        )
    }
}


const styles=StyleSheet.create({
    header:{
        width:300,
        backgroundColor:"#fff",
        justifyContent:"center",
        marginTop:100
             
    },
    searchinput:{
     alignItems:"center",
     marginTop:100,
     backgroundColor:"#fff",
     width:300,
     paddingTop:10,
     paddingBottom:10,
     paddingLeft:8,
     borderRadius:20
    },

    searchbutton:{
       paddingLeft:20,
       marginTop:10
    },

  

})



export default Search;