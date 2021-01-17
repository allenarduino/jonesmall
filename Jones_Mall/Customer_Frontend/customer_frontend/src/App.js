import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Products from './Components/Products';
import Home from './Components/Home';
import Nav from './Components/Nav';

import store from './store';
import { Provider } from 'react-redux';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import SingleCategory from './Components/SingleCategory';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PlaceOrder from './Components/PlaceOrder';
import Display from './Components/Display';

//const initialState={}

export default class App extends React.Component {
 

 render(){

 
  
 
    return (
      <Provider store={store}>
    <Router>
    <div>
    
 <Nav/>
 <div className=" container-fluid">
 
   <Switch>
 <Route path="/products" component={Products}/>
 <Route exact path="/" component={Home}/>
 <Route path="/cart" component={Cart}/>
 <Route path="/categories" component={Categories}/>
 <Route path="/category/:id" component={SingleCategory}/>
 <Route path="/signup" component={Signup}/>
 <Route path="/login" component={Login}/>
 <Route path="/place_order" component={PlaceOrder}/>
 <Route path="/display" component={Display}/>
 </Switch>
 
 </div>
 
 </div>
 
</Router>
</Provider>

    )

   

  }

}



