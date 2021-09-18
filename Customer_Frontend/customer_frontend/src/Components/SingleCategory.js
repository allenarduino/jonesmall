import React from 'react';
import '../Styles/Products.css';
import {Row,Col} from 'react-grid-system';
import Modal from './Modal';
import '../Styles/Products.css';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {addToCart} from '../Actions/CartActions';











//Creating the product class
class SingleCategory extends React.Component{
 
  constructor(props){
    super(props);
    this.state={
      SingleCategory:[]
    }
  }
 
   
  componentDidMount(){
    this.fetchSingleCategory();
 
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

  fetchSingleCategory=()=>{
    const k=localStorage["SC"]?JSON.parse(localStorage.getItem("SC")):[];

    this.setState({
      SingleCategory:k
    })
    fetch(`https://jonesmall.pythonanywhere.com/categories/${this.props.match.params.id}`,
    {
        method:"GET",
        "Content-Type":"application/json",
    
    }
 )
 .then(res=>res.json())
 .then((data)=>{
   this.setState({
       SingleCategory:data
   });
   /*If category item is still in local storage,
   remove it and push new item or data from the server
   into local storage
   */
   localStorage.removeItem("SC")
   localStorage.setItem("SC",JSON.stringify(data))
 })
 .catch(err=>alert(err))
}




  
    
  render(){

  return(
 
  
    <Row style={{marginTop:100}}>
      {
        this.state.SingleCategory.map(t=>
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
         this.state.SingleCategory.length==0?
         <div className="col text-center"><b>Loading items....</b></div>:
        this.state.SingleCategory.map(t=>
          
          
              
            <Col onClick={()=>this.getModal(t.id)} key={t.id} xs={6} sm={4} md={4} lg={3} xl={2} style={{marginTop:10}}>
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


  )
  }
}



export default connect(
  (state)=>({
    cart:state.cart,
  }),
  {
    addToCart
  }
)(SingleCategory);


