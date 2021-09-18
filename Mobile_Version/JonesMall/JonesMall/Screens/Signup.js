import React,{Component} from 'react';
import {Text,View,ScrollView,TextInput,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import Login from './Login';




//I'm using this for email validation
const validEmailRegex= 
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);






class Signup extends React.Component{

   




    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            name_is_valid:true,
            email_is_valid:true,
            password_is_valid:true,
            form_is_valid:true,
            error:false,//Error  from server is false
            message:"",//Success message from server
            
          
        }
    }

  

    

     nameInputChange=(val)=>{
        if(val.trim().length>=6){
            this.setState({
                name_is_valid:true,
                form_is_valid:true
 
            })
          }
          else{
              this.setState({
                  name_is_valid:false,
                  form_is_valid:false,
              })
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


   


    signup=()=>{
        const data=new FormData();
        data.append("name",this.state.name)
        data.append("email",this.state.email)
        data.append("password",this.state.password)

        if(
            this.state.name_is_valid==true&&this.state.email_is_valid==true&&this.state.password_is_valid==true&&
            !this.state.name.trim().length==0&&!this.state.email.trim().length==0&&!this.state.password.trim().length==0){

        
      fetch("https://jonesmall.pythonanywhere.com/customer_signup",
      {
          method:"POST",
          body:data
         
      
      })
      .then(res=>res.json())
      .then(data=>{
          this.setState({
              loading:false
          })
          
          if (data.error==null){
              alert(data.message);
              this.props.navigation.navigate("Login")
            
          }
          else{
              this.setState({error:!this.state.error})
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
            <Text style={{fontSize:20,color:"grey"}}>Sign up for Jones Mall</Text>
                    
                
                <TextInput
                name="name"
                value={this.state.name}
                onChangeText={(name)=>{this.nameInputChange(name);this.setState({name})}}
                style={styles.forminput}  
                  placeholder="Name" />

               {this.state.name_is_valid==false? <Text style={{color:"red",fontSize:14}}>Name must not be less than 6 characters</Text>:null}
 
              
                  <TextInput
                  name="email"
                   value={this.state.email}
                   onChangeText={(email)=>{this.emailInputchange(email);this.setState({email})}}
                   style={styles.forminput}
                   placeholder="Email"/>
                 {this.state.error==true?<Text style={{color:"red",fontSize:14}}>User with email already exists</Text>:null}
                   
                

                     {this.state.email_is_valid==false? <Text style={{color:"red",fontSize:14}}>Please your email is not valid</Text>:null}
            
                <TextInput 
                  style={styles.forminput}
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password}
                  secureTextEntry={true}
                  onChangeText={(password)=>{this.passwordInputchange(password);this.setState({password})}}
                  password={true}/>
                 
                 {this.state.password_is_valid==false?<Text style={{color:"red",fontSize:14}}>Password must not be less than 6 characters</Text>:null}
                   
                  
                 <TouchableOpacity style={styles.formbutton} onPress={this.signup}><Text style={{color:"#fff",fontSize:20}}>Sign up</Text></TouchableOpacity>
                  
                    
                  
                 <Text style={{marginTop:30}}> Already have an account?<Text style={{color:"rgb(179, 7, 127)",marginTop:30}} onPress={()=>{this.props.navigation.navigate("Login")}}>log in</Text></Text>
                  
                    
                  
            </View>
            
      </View>  
      </ImageBackground>    
        
    )
    }
}

const styles=StyleSheet.create({

    











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
        height:"80%",
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
       marginTop:30,

    },

    error_forminput:{
       width:250,
       borderColor:"red",
       borderWidth:2,
       backgroundColor:"whitesmoke",
       borderRadius:20,
       paddingBottom:5,
       paddingTop:5,
       paddingLeft:10,
       marginTop:30,
     
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



})



//createStackNavigator({
 //   Login:{screen:Login},
 //   Signup:{screen:Signup},
//});

createStackNavigator({
    
    Signup:Signup
});







export default Signup;