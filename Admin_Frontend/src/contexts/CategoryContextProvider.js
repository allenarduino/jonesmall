import React from "react";
import { categoryReducer } from "../reducers/CategoryReducer";

export const CategoryContext = React.createContext();
const initialState = {
  categories: []
};

const CategoryContextProvider = props => {
  const [category_state, category_dispatch] = React.useReducer(
    categoryReducer,
    initialState
  );

  return (
    <CategoryContext.Provider value={{ category_state, category_dispatch }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
