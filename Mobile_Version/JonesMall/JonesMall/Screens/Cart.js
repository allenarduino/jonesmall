import React,{useState} from 'react';

import {
    Text,View,
    TouchableOpacity,
    AsyncStorage
    
    
    
    
} from 'react-native';



class Cart extends React.Component{

constructor(props){
    super(props);
    this.state={
        isIn:false
    }
}


componentDidMount() {
   this.getToken();
}


componentDidUpdate(prevProps,prevState){
if(prevState.isIn==!this.state.isIn){
    this.getToken()
}
}
getToken=async ()=>{
    
 let user=await AsyncStorage.getItem("token")
 if(user!==null){
     this.setState({
         isIn:true
     })
 }
}






    render(){
        return(
            <View style={{alignItems:"center",marginTop:200}}>
                <TouchableOpacity onPress={async()=>await AsyncStorage.removeItem("token")}><Text>logout</Text></TouchableOpacity>
                <TouchableOpacity style={{marginTop:40}} onPress={async ()=>(await AsyncStorage.getItem("token").then(value=>alert(value)))} >
      {this.state.isIn==false?<Text>out</Text>:<Text>in</Text>}
                </TouchableOpacity>
            </View>
         
        )
    }
}

export default Cart;