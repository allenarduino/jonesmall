import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage
}
from 'react-native';



class Modal extends React.Component{
render(){
    return(
        
        
            <View>
                {this.props.show&&
                
              <View  style={styles.my_modal}>
              <TouchableOpacity onPress={this.props.onHide} style={styles.close_modal}>
             <Text style={styles.cancel_star}>&times;</Text>
         </TouchableOpacity>
         <Image 
         source={{uri:`https://jonesmall.pythonanywhere.com${this.props.product_img}`}}
         style={styles.modal_product_img} />
         <View style={styles.modal_footer}>
             <Text style={{marginTop:20}}>{this.props.name}</Text>
                 <Text>Price: ${this.props.price}</Text>

                 {this.props.itemInCart?
                 <TouchableOpacity style={styles.in_cart_button} >
            <Text style={{color:"black",fontSize:15}}>Item in cart</Text> 
         </TouchableOpacity>:
          <TouchableOpacity style={styles.add_butn} onPress={this.props.add_to_cart} >
          <Text style={{color:"white",fontSize:15}}>Add to cart</Text> 
       </TouchableOpacity>
         }
               
        </View>
        
   
     
         </View>
      
    }
    </View>
       
      
      
        
       
        
        
    )
}       
}

export default Modal;

const styles=StyleSheet.create({
 
    my_modal:{
       marginTop:350
    },

modal_product_img:{
height: 350,
borderTopLeftRadius:10,
borderTopRightRadius:10,
marginTop:-300,
overflow:"scroll"


},

modal_footer:{
alignItems:"center",
backgroundColor:"#fff",
height:150,
marginTop:0
},


add_butn:{
    backgroundColor: "rgb(184, 23, 103)",
    borderColor:"rgb(184, 23, 103)",
    borderWidth:2,
    width: 250,
    color:"white",
    borderRadius:10,
    alignItems:"center",
    width: 250,
    color:"black",
    borderRadius:30,
    position:"relative",
    paddingTop:7,
    paddingBottom:7,
    marginTop:30,
    zIndex:1
  },


in_cart_button:{
    backgroundColor:"white",
    borderColor:"black",
    borderWidth:2,
    alignItems:"center",
    width: 250,
    color:"black",
    borderRadius:30,
    position:"relative",
    paddingTop:7,
    paddingBottom:7,
    marginTop:30,
    zIndex:1
    
  },


close_modal:{
    color:"white",
    backgroundColor: "rgb(184, 23, 103)",
    borderColor:"rgb(184, 23, 103)",
    marginLeft: 10,
    width:30,
    height: 30,
    fontSize: 18,
    borderRadius: 30,
    display: "flex",
    position:"absolute",
    alignItems: "center",
    justifyContent: "center",
    padding:10,
    marginTop:-280,
    zIndex:10,

  },
  cancel_star:{
      color:"#fff",
  }
  
})







