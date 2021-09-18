import {FETCH_PRODUCTS} from './types';
import {DISPLAY_PRODUCT} from './types';

export const fetchProducts=()=>dispatch=>{
    
    fetch("https://jonesmall.pythonanywhere.com/products",
    {
        method:"GET",
        "Content-Type":"application/json",
    
    }
 )
 .then(res=>res.json())
 .then((data)=>{
    dispatch({
        type:FETCH_PRODUCTS,
        payload:data
    })
 })

}

export const displayProduct=(product)=>dispatch=>{
    dispatch({
        type:DISPLAY_PRODUCT,
        payload:product
    })
}

