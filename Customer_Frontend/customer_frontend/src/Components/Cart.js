import React from 'react';
import {Row,Col} from 'react-grid-system';
import "../Styles/Cart.css";
import {increaseItem,
       deleteItem,
        decreaseItem,
        showCart
}        
from '../Actions/CartActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Cart extends React.Component{

    constructor(props){
        super(props);
        this.state={
            cartItems:[]
        }
    }


  


           
    

   

    componentDidMount(){
       this.props.showCart()
    }

  
    render(){
        return(
            <div style={{marginTop:70}}>
                {   this.props.cart.cart.length==0?
                    <div className="col text-center">
                        <b>Please you have no item in cart</b>
                        <p><Link to="/products"><b>Start adding items</b></Link></p>
                        </div>:
                    this.props.cart.cart.map(t=><div>
                        <Row style={{marginTop:20}}>
                            <Col sm={6} xs={6} lg={3} xl={3} >
                              <img src={`https://jonesmall.pythonanywhere.com${t.product_img}`}  className="cart-product-img"/>
                            </Col>
                            <Col sm={6} xs={6} lg={3} xl={3}>
                                <b>{t.name}</b>
                                <p>${t.price}</p>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col sm={6} xs={6} lg={3} xl={3} onClick={()=>this.props.deleteItem(t)}><i style={{color:"rgb(184, 23, 103)"}} className="fa fa-trash ">remove</i></Col>
                            <Col sm={6} xs={6} lg={3} xl={3} style={{display:"flex"}}>
                                 <button onClick={()=>this.props.increaseItem(t)} className="plus"><i className="fa fa-plus"></i></button>
                                 <Col sm={2} xs={2} lg={2} xl={2} style={{marginRight:10}}>{t.quantity}</Col>
                                 <button onClick={()=>this.props.decreaseItem(t)} className="plus">< i className="fa fa-minus"></i></button>
                            </Col>
                       
                        </Row>
                        
                        </div>
                    )
                }
                     {!this.props.cart.cart.length==0?<div style={{marginTop:50}} className="col text-center">
                           Total price: <b> $ {
                       localStorage["mycart"]?JSON.parse(localStorage.getItem("mycart")).reduce((acc,curr)=>acc+curr.quantity*curr.price,0)
                          :null}</b><br/>
                         <Link to={`${localStorage.getItem("customer_token")?'/place_order':'/login'}`}><button className="place-order-butn">Place order</button></Link>
                            </div>:null}
            </div>
        )
    }
}


export default connect(
    (state)=>({
      cart:state.cart,
    }),
    {
      increaseItem,
      showCart,
      decreaseItem,
      deleteItem
    }
  )(Cart);
  
  
