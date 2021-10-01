import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import DrawerNav from "./components/DrawerNav";
import { AuthContext } from "./contexts/AuthContextProvider";
import Login from "./pages/login/Login";
import SideNav from "./components/SideNav";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import SingleCategory from "./pages/singlecategory/SingleCategory";
import Home from "./pages/home/Home";
import ScrollToTop from "./ScrollToTop";
import Signup from "./pages/signup/Signup";

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
        <ScrollToTop />
        <main style={{ flex: 1, height: "100%" }}>
          <DrawerNav />
          <SideNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/products" component={Products} />
            <Route path="/categories" component={Categories} />
            <Route path="/single_category" component={SingleCategory} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
export default App;
