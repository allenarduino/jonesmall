import React from 'react';

import{Text,StyleSheet,View,ScrollView,
    AsyncStorage,
    TouchableHighlight,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row,Col} from 'react-native-responsive-grid-system';
import Modal from '../Components/Modal';




class SingleCategory extends React.Component{

    

    constructor(props){
        super(props);
        this.state={
            products:[],
            showModal:0,
        }
    }

    //Fetch products as the component mounts
    componentDidMount(){
    
    
     
    //Function for fetching products from the back end API

        fetch(`https://jonesmall.pythonanywhere.com/categories/${this.props.route.params.cat_name}`,
        {
            method:"GET",
            
            headers:{
             
                "Content-Type":"Application/json",
            }
        }
        )
        .then(res=>res.json())
        .then(data=>{this.setState({products:data});
        
       }
        )
        .catch(err=>{console.log(err)});
      
   
}




getModal=value=>{
    this.setState({
      showModal:value
    })
  }


  hideModal=value=>{
    this.setState({showModal:0})
  }

    
    render(){
        return(
            <View style={{flex:1}}>

            {
        //Modal for a loading product
        this.state.products.map(p=>
             <Modal
              show={this.state.showModal===p.id}
              onHide={()=>this.hideModal(p.id)}
              /*add_to_cart={()=>this.AddItem(t)}*/
              product_img={p.product_img}
              name={p.name}
              price={p.price}
              /*itemInCart={this.check_item(t.id)}*/
              />
          
          )
        }
        
            <ScrollView> 
            <Row rowStyles={styles.productsHolder}>

              {

                  this.state.products.map(p=>
                     
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
}

export default SingleCategory;




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




