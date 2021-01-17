import React from 'react';
import '../Styles/Products.css';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {displayProduct} from '../Actions/ProductActions';
import {addToCart} from '../Actions/CartActions';
import {Row,Col} from 'react-grid-system';



class SingleProduct extends React.Component{

    componentDidMount(){
        this.props.DisplayProduct()
    }

    render(){
        return(
            <div>
                {
                    this.props.product.product.map(
                       t=> <div>
                           {t.name}
                           </div>
                    )
                }
            </div>
        )
    }
}



export default connect(
    (state)=>({
   product:state.product
    }),
    {
      displayProduct,
      addToCart
    }
  )(Products);
  
  