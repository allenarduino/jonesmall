import React from "react";
import { productReducer } from "../reducers/ProductReducer";

export const ProductContext = React.createContext();
const initialState = {
  posts: [],
  url: "http://localhost:5000/"
};

const ProductContextProvider = props => {
  const [product_state, product_dispatch] = React.useReducer(
    productReducer,
    initialState
  );

  return (
    <ProductContext.Provider value={{ product_state, product_dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
