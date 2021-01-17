import React from 'react';
import '../Styles/Products.css';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {fetchProducts} from '../Actions/ProductActions';
import {addToCart} from '../Actions/CartActions';
import {displayProduct} from '../Actions/ProductActions';
import {Row,Col} from 'react-grid-system';
import Modal from './Modal';
import { throwStatement } from '@babel/types';
import { mustBeValid } from 'json-schema';










//Creating the product class
class Products extends React.Component{
 
  constructor(props){
    super(props);
    this.state={
      isAdded:false,
      showModal:0,
      searched_products:[],
      name:"",
      message:false,
      loadingItems:null,
      server_message:""
     
    }
  }
 
  componentDidMount(){
    this.props.fetchProducts();
   
  }

  AddItem=(product)=>{
    this.props.addToCart(product);
    
  }

  getModal=value=>{
    this.setState({
      showModal:value
    })
  }


  hideModal=value=>{
    this.setState({showModal:0})
  }
//This method is to check if item is in cart or not
  check_item=(id)=>{
    if(localStorage["mycart"]){

    const cartItems=JSON.parse(localStorage.getItem("mycart"))
    const exists = cartItems.find(item => item.id === id);
    if(exists){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
  }




  handleinput=(e)=>{
   
    this.setState({
        [e.target.name]:e.target.value
    })
    
    
    
    }






/*Function to throw message if search result is empty and
to set products array state to an empty array if the search 
result is empty.This will throw an empty page with message
*/
check=()=>{
  this.props.products.products=[];
/*If we return empty products, send the message 
by changing the state
*/
  if(this.state.searched_products.length===0){
    this.setState({
        message:true
    })
  }
}


//Function to search for products.........................
search=()=>{
  //Please look at this function at the top it's  very important
 this.check();
 
  
 const data=new FormData();
 data.append("name",this.state.name)
 fetch("https://jonesmall.pythonanywhere.com/search_products",

 {
     method:"POST",
   
     "Content-Type":"application/json",
     
     body:data
 }
 )
 .then(res=>res.json())
 .then(data=>{
    if(data.products==[]){
      this.setState({
        searched_products:[]
      })
    }
    else if(!data.products==[]){
      this.setState({
        searched_products:data.products
      });
      this.props.products.products=[];
    
    }
    else{
      this.setState({
        server_message:data,
        searched_products:[]
      })
     

    }
  
     
     
     //I did this because of testing in the console
     console.log(data)

     
     
 })
 .catch(err=>console.log(err))
 

 
 
}







  
    
  render(){

  return(
 <div>
   <div className="col text-center search-nav" style={{marginTop:70}}>
<input type="text"
         value ={this.state.name}
         name="name"
         onChange={this.handleinput}
         onKeyUp={this.search}
         placeholder="Search products......" 
         className="search-input"/>
         <button className="search-button" onClick={this.search}>Search</button>
  </div>

    <Row style={{marginTop:10}}>
 



      {
        //Modal for a loading product
        this.props.products.products.map(t=>
          <div>
             <Modal
              show={this.state.showModal===t.id}
              onHide={()=>this.hideModal(t.id)}
              add_to_cart={()=>this.AddItem(t)}
              product_img={t.product_img}
              name={t.name}
              price={t.price}
              itemInCart={this.check_item(t.id)}
              />
          </div>
          )
      }


{      //Modal for a searched product
        this.state.searched_products.map(t=>
          <div>
             <Modal
              show={this.state.showModal===t.id}
              onHide={()=>this.hideModal(t.id)}
              add_to_cart={()=>this.AddItem(t)}
              product_img={t.product_img}
              name={t.name}
              price={t.price}
              itemInCart={this.check_item(t.id)}
              />
          </div>
          )
      }



         {
           
           this.state.searched_products.map(t=>
            <Col onClick={()=>this.getModal(t.id)} onClick={()=>this.getModal(t.id)} key={t.id} xs={6} sm={4} md={4} lg={3} xl={2} style={{marginTop:10}}>
            <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.product_img}`}/>
            <div className="product-footer  col text-center">
              
              <b className=" mytext">{t.name}</b>
              <p className=" mytext">${t.price}</p>
              {!this.check_item(t.id)?
                <button  className="add-to-cart"  onClick={()=>this.AddItem(t)}> Add to cart </button>
                :<button className="added">Item in cart</button>
              }
                </div>
               <div>                   
            </div>
        
          
     
            </Col>
            )
         }
         
{
        this.props.products.products.length==0?
    <div className="col text-center"><b>{this.state.server_message==""||!this.state.searched_products.length==0?<b>{this.state.searched_products.length==0?<b>loading items...</b>:null}</b>:<b>No result</b>}</b></div>:
        this.props.products.products.map(t=>
          
            <Col onClick={()=>this.getModal(t.id)} onClick={()=>this.getModal(t.id)} key={t.id} xs={6} sm={4} md={4} lg={3} xl={2} style={{marginTop:10}}>
                 <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.product_img}`}/>
                 <div className="product-footer  col text-center">
                   
                   <b className=" mytext">{t.name}</b>
                   <p className=" mytext">${t.price}</p>
                   {!this.check_item(t.id)?
                     <button  className="add-to-cart"  onClick={()=>this.AddItem(t)}> Add to cart </button>
                     :<button className="added">Item in cart</button>
                   }
                     </div>
                    <div>                   
                 </div>
             
                       
          
                 </Col>
           
              
         
            )
            
    }
</Row>
</div>

  )
  }
}


export default connect(
  (state)=>({
    products:state.products,
    loading:state.loading,
    cart:state.cart,
  }),
  {
    fetchProducts,
    addToCart
  }
)(Products);


