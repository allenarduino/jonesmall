import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import DrawerNav from "./components/DrawerNav";
import { AuthContext } from "./contexts/AuthContextProvider";
import Login from "./pages/login/Login";
import CreateProduct from "./pages/createproduct/CreateProduct";
import CreateCategory from "./pages/createcategory/CreateCategory";
import SideNav from "./components/SideNav";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import SingleCategory from "./pages/singlecategory/SingleCategory";

const App = () => {
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const bootstrapAsync = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      auth_dispatch({
        type: "LOGIN",
        payload: token
      });
    } else {
      auth_dispatch({
        type: "LOGOUT"
      });
    }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);
  return (
    <div style={{ flex: 1 }}>
      <Router>
        <main style={{ flex: 1, height: "100%" }}>
          {auth_state.isLoggedIn ? <DrawerNav /> : <Login />}
          {auth_state.isLoggedIn ? <SideNav /> : <Login />}
          <Switch>
            <Route exact path="/add_category" component={CreateCategory} />
            <Route path="/add_product" component={CreateProduct} />
            <Route path="/login" component={Login} />
            <Route path="/my_products" component={Products} />
            <Route path="/my_categories" component={Categories} />
            <Route path="/single_category" component={SingleCategory} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
export default App;
