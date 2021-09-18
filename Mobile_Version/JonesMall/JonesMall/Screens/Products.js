import React from 'react';

import{Text,StyleSheet,View,ScrollView,
    AsyncStorage,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Row,Col} from 'react-native-responsive-grid-system';
import Modal from '../Components/Modal';


export const Products=()=>{

const [products,fetchProducts]=React.useState([])






        return(
            <View style={{flex:1}}>

       
        
            <ScrollView> 
            <Row rowStyles={styles.productsHolder}>

              {

                       this.props.products.products.map(p=>
                     
                         <Col xs={6} sm={4} md={4} lg={2} xl={2}  >
                         <View style={styles.productHeader}>
                         <TouchableOpacity onPress={()=>this.getModal(p.id)}>
                             <Image 
                            source={{uri:`https://jonesmall.pythonanywhere.com${p.product_img}`}}
                             style={styles.productImg}
                          
                             />
                             </TouchableOpacity>
                          
                         </View>
                         <View style={styles.productFooter}>
                             
                             <Text style={styles.mytext}>{p.name}</Text>
                            <Text style={styles.mytext}>$ {p.price}</Text>
                           
                             
                  </View>
                         </Col>
                      
                         
                      )
              }
          </Row>
              </ScrollView>

          </View>
          
        )
    

            }


const styles=StyleSheet.create({
    
    iconContainer:{
       display:"flex",
       alignItems:"flex-start",
    },
    searchIcon:{
     fontSize:25,
     marginLeft:10,
     color:"white"
    },

    productsHolder:{
        padding:10,
        marginTop:50,
        //flexDirection:"row",
        //flexWrap:"wrap",
        backgroundColor:"whitesmoke",
        justifyContent:"space-between",
      
    },
    productsContainer:{
        marginTop:3,
        overflow:"hidden",
        
    },
    productHeader:{
    
    },
    productImg:{
        height: 150,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginTop:10,
        
    },
    productFooter:{
        backgroundColor:"white",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingTop:8,
        paddingBottom:8,
        
    },
    mytext:{
        textAlign:"center",
    },
  
    
})




