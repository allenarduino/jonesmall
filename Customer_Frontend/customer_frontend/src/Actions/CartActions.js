import {ADD_TO_CART, 
  DECREMENT_QTY, INCREMENT_QTY,
  SHOW_CART,
  DELETE_ITEM,
} from './types';


export const addToCart=(product)=>dispatch=>{
    
 dispatch({
   type:ADD_TO_CART,
   payload:product
 })

};

export const showCart=()=>dispatch=>{
  
  dispatch({
    type:SHOW_CART,
    payload:localStorage["mycart"]?JSON.parse(localStorage.getItem("mycart")):[]
  })
}

export const increaseItem=(product)=>dispatch=>{
  dispatch({
    type:INCREMENT_QTY,
    payload:product
  })
}

export const decreaseItem=(product)=>dispatch=>{
  dispatch({
    type:DECREMENT_QTY,
    payload:product
  })
}

export const deleteItem=(product)=>dispatch=>{
  dispatch({
    type:DELETE_ITEM,
    payload:product
  })
}


