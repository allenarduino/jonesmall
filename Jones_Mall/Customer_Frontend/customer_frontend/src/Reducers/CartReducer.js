import {ADD_TO_CART,
INCREMENT_QTY,
SHOW_CART,
DECREMENT_QTY,
DELETE_ITEM
} from '../Actions/types';

const initialState={
    cart:[],
}

const CartReducer=(state=initialState,action)=>{
 let cart=state.cart


    switch (action.type) {
     case ADD_TO_CART:
        if(!localStorage["mycart"]){
          cart.push(action.payload);
          localStorage.setItem("mycart",JSON.stringify(cart))
        }
        else{
            let cart=JSON.parse(localStorage.getItem("mycart"));
            cart.push(action.payload)
            localStorage.setItem("mycart",JSON.stringify(cart))
        }

        return {
            ...state,
            cart:JSON.parse(localStorage.getItem("mycart"))
        }


     case SHOW_CART:
       return{
         ...state,
         cart:action.payload
       }

    
     case INCREMENT_QTY:
        if(localStorage["mycart"]){

          let localData=JSON.parse(localStorage.getItem("mycart"));
         localData.forEach(data=>{
             if(data.id===action.payload.id){
                 return{...data, quantity:++data.quantity}
  
             }
         }
         )
        localStorage.setItem("mycart",JSON.stringify(localData))
        return {
          ...state,
          cart:JSON.parse(localStorage.getItem("mycart"))
        }
        }

        case DECREMENT_QTY:
        if(localStorage["mycart"]){

          let localData=JSON.parse(localStorage.getItem("mycart"));
         localData.forEach(data=>{
             if(data.id===action.payload.id){
                
                 if(data.quantity<1){
                  const index=localData.findIndex(item=>item.id===action.payload.id)
                  localData.splice(index,1)
                  
                 }
                 else{
                  return{...data, quantity:--data.quantity}
                 }
  
             }
         }
         )
        localStorage.setItem("mycart",JSON.stringify(localData))
        return {
          ...state,
          cart:JSON.parse(localStorage.getItem("mycart"))
        }
        }

      case DELETE_ITEM:
        if(localStorage["mycart"]){
          let localData=JSON.parse(localStorage.getItem("mycart"))
          const index=localData.findIndex(item=>item.id===action.payload.id)
          localData.splice(index,1)
           localStorage.setItem("mycart",JSON.stringify(localData))
      
        return{
          ...state,
          cart: JSON.parse(localStorage.getItem("mycart"))
        }
      }

        default:
          return state
    }
        

    
   
}

export default CartReducer;

