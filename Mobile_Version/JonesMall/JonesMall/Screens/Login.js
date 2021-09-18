import React,{Component} from 'react';
import {Text,View,ScrollView,TextInput,StyleSheet,TouchableOpacity,Image,Button,
    ImageBackground,AsyncStorage
} from 'react-native';
import MyProfile from './MyProfile';

//import AsyncStorage from "@react-native-community/async-storage";




//I'm using this for email validation
const validEmailRegex= 
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);




class Login extends React.Component{
  
 

        constructor(props){
            super(props);
            this.state={
                email:"",
                password:"",
                email_is_valid:true,
                error:"",//Error from server
                emailerr:"",
                passworderr:"",
                
            }
        }
    
     
        emailInputchange=(val)=>{
            if(validEmailRegex.test(val)){
                this.setState({
                    email_is_valid:true,
                });
                
            }
            else{
                this.setState({
                    email_is_valid:false,
                })
            }
          
         }
    
         passwordInputchange=(val)=>{
            if(val.trim().length>=6){
                this.setState({
                    password_is_valid:true,
                });
                
            }
            else{
                this.setState({
                    password_is_valid:false,
                })
            }
          
         }
    
        





        login=()=>{
            const data=new FormData();
            data.append("email",this.state.email)
            data.append("password",this.state.password)
    
            if(
                this.state.email_is_valid==true&&
            !this.state.email.trim().length==0&&!this.state.password.trim().length==0){
    
                fetch("https://jonesmall.pythonanywhere.com/customer_login",{
                    method:"POST",
                    body:data,
                 
                })
                .then(res=>res.json())
                .then((data)=> {
                    if (data.error==null){
                     
                      AsyncStorage.removeItem("token")   
                      AsyncStorage.setItem("token",JSON.stringify(data))
                      alert("Logged in")
                      
                        this.props.navigation.navigate("Profile");
                     
                    }
                    else{
                        this.setState({error:data.error})
                    }
                }).catch((err)=>{alert(err)});
                  
        
            }
        else{
            alert("Form is invalid")
        }
        
            
    }
    




    
       
    
    
        render(){
            
        return(
            <ImageBackground source={require("../Images/Homeimage.jpeg")} style={styles.background}>
                <View style={{alignItems:"center"}}>
                   
                <View style={styles.formcontainer}>
                    <Text style={{fontSize:15,color:"grey"}}>Log in for Jones Mall</Text>
                    
                    <TextInput name="email" 
                    value={this.state.email} 
                    onChangeText={(email)=>{this.emailInputchange(email);this.setState({email})}}
                     style={styles.forminput}  
                     placeholder="Email"/>
                       {this.state.email_is_valid==false? <Text style={{color:"red",fontSize:14}}>Please your email is not valid</Text>:null}

                    <Text style={{color:"red",fontSize:15}}>{this.state.emailerr}</Text>
                    <TextInput 
                      style={styles.forminput}
                      placeholder="Password" 
                      name="password" 
                      value={this.state.password}
                      secureTextEntry={true}
                      onChangeText={(password)=>{this.setState({password})}}
                      password={true}/>
                        <Text style={{color:"red",fontSize:15}}>{this.state.error}</Text>
    <TouchableOpacity style={styles.formbutton} onPress={this.login}><Text style={{color:"#fff",fontSize:20}}>Log in</Text></TouchableOpacity>           
                        
                      
   <Text style={{marginTop:30}}> Don't have an account?<Text style={{color:"rgb(179, 7, 127)",marginTop:30}} onPress={()=>{this.props.navigation.navigate("Signup")}}>join</Text></Text>
                     
                        
                      
                </View>

    </View>
                
      </ImageBackground>         
            
        )
        }



       
    }

  

const styles=StyleSheet.create({

   

    logo:{
        textAlign:"left",
        height:40,
        width:40,
        borderRadius:40,
        marginLeft:10,
        
    },

background:{
flex:1,
zIndex:12,
top:0

},






    formcontainer:{
        textAlign:"center",
        marginTop:50,
        backgroundColor:"#ffffff",
        width:350,
        height:"75%",
        padding:30,
        zIndex:2,
        borderRadius:10,
        alignItems:"center",
        
        
    },

   
    forminput:{
       width:250,
       borderColor:"whitesmoke",
       borderWidth:1,
       backgroundColor:"whitesmoke",
       borderRadius:20,
       paddingBottom:5,
       paddingTop:5,
       paddingLeft:10,
       marginTop:20,

    },

    formbutton:{
        width:250,
       borderRadius:20,
       paddingBottom:5,
       paddingTop:5,
       paddingLeft:5,
       marginTop:20,
       alignItems:"center",
       backgroundColor:"rgb(179, 7, 127)"
    }


});

   





export default Login;