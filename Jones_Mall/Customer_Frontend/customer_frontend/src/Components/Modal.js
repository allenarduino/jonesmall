import React from 'react';
import '../Styles/Modal.css';

class Modal extends React.Component{
render(){
    return(
        
        <div>
        {this.props.show&&
            <div  className="my-modal"> 
        <img src={`https://jonesmall.pythonanywhere.com${this.props.product_img}`} className="modal-product-img"/>
        <button onClick={this.props.onHide} className="close-modal">&times;</button>
        <div style={{marginTop:330}} className="col text-center"><b>{this.props.name}</b>
        <p><b>Price: ${this.props.price}</b></p>
         {!this.props.itemInCart?
        <button onClick={this.props.add_to_cart} className="add-butn">Add to cart</button>:
        <button className="in-cart-butn">Item in cart</button>
         }
        </div>
            </div>
        }
        </div>
        
    )
}
}

export default Modal