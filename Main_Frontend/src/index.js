import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContext from "./contexts/AuthContextProvider";
import ProductContext from "./contexts/ProductContextProvider";
import CategoryContext from "./contexts/CategoryContextProvider";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ProductContext>
    <AuthContext>
      <CategoryContext>
        <App />
      </CategoryContext>
    </AuthContext>
  </ProductContext>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
