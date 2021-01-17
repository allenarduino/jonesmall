import React, { Component } from 'react';
import Nav from './Nav';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import AdminLogin from './AdminLogin';
import AddProduct from './AddProduct';
import CreateCategory from './CreateCategory';
import MyProducts from './MyProducts';
import Categories from './Categories';
import SingleCategory from './SingleCategory';
import ManageOrders from './ManageOrders';
import MyCustomers from './MyCustomers';
import SingleOrder from './SingleOrder';






export default class App extends React.Component {
 

 render(){

 
  
 
    return (
    <Router>
      <div>
    
    
  
  <Nav/>
 <div>

   
<Switch>
 <Route exact path="/" component={Home} />
 <Route path="/products" component={Products}/>
 <Route path="/admin_login" component={AdminLogin}/>
 <Route path="/add_product" component={AddProduct}/>
 <Route path="/create_category" component={CreateCategory}/>
 <Route path="/my_products" component={MyProducts}/>
 <Route path="/categories" component={Categories}/>
 <Route path="/category/:id" component={SingleCategory}/>
 <Route path="/my_customers" component={MyCustomers}/>
 <Route path="/manage_orders"  component={ManageOrders}/>
 <Route path="/single_order/:id" component={SingleOrder}/>
 
</Switch>
 
 </div>
 </div>
 
 
</Router>

    )

   

  }

}



