import React,{Component} from 'react';
import './Topnav.css';
import logo from './mylogo.png';

import {Route,BrowseRouter as Router,Link,NavLink} from 'react-router-dom';
import Home from './Home';
//import { withTheme } from 'styled-components';







export default class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state={
      draweropen:false,
      user_info:[],
    }
  }


  componentDidMount(){
  this.fetch_user_info();
  }

  fetch_user_info=()=>{
    fetch("https://jay555.pythonanywhere.com/user_profile",
    {
      method:"GET",
      "Content-Type":"application/json",
      headers:{
        Authorization:`${localStorage.getItem("admin_token")}`
      }
    }
    ).then(res=>res.json())
    .then(data=>{
      this.setState({
        user_info:data.profile_info
      })
    })
  }

  opendrawer=()=>{
    this.setState({
      draweropen:true
    })
  }

  closedrawer=()=>{
    this.setState({
      draweropen:false
    })
  }

 render(){

  return (
   
    <div>
{/*************************Phonenav ******************************************* */}

<div>
  
<div className="phonenav">
<Link to="/"><img src={logo} className="phone-logo"/></Link>
  <button onClick={()=>this.opendrawer()} className="float-right toggle-butn"> 
  <div className="butn-line"></div>
  <div className="butn-line"></div>
  <div className="butn-line"></div>
  </button>
 
</div>

{this.state.draweropen==true?

<div className="sidedrawer"> 
<button className="closebtn" onClick={()=>this.closedrawer()}>&times;</button>
<ul style={{marginTop:-1}} className="col text-center drawer-items">
{
   this.state.user_info.map(t=>
    <div className=" col text-center">
    <img src={`https://jay555.pythonanywhere.com${t.user_img}`} className="avatar2"/>
     <h1 className="name2"><b className="welcome-text">{t.name}</b></h1> 
      </div>
   )
 }
 <div style={{marginTop:100}}>
   
  {localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/my_customers"><li className="nav-links">My Customers</li></NavLink>:null}
  {localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/manage_orders"><li className="nav-links">Manage orders</li></NavLink>:null}
  {localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/my_products"><li className="nav-links">My Products</li></NavLink>:null}
  {localStorage.getItem("admin_token")? <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/categories"><li className="nav-links">Categories</li></NavLink>:null}
  {localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/add_product"><li><button class="add-product">Add Product</button></li></NavLink>:null}
  {localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/create_category"><li><button class="add-product">Create Category</button></li></NavLink>:null}
  {!localStorage.getItem("admin_token")?<NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/admin_login"><li className="nav-links">Login</li></NavLink>:null}
 
  
   
  </div>
  </ul>
    
</div>
:null}





{/**********************************Desktop nav******************************************/}

   
  <div className="mynav ">
  <img src={logo} className="logo"/>
 
 </div>
 

  
</div>

{/******************Side navigation******************** */}
{localStorage.getItem("admin_token")?
<div style={{position:'fixed'}} className="side-nav ">
<ul className="col text-center drawer-items">
 {
   this.state.user_info.map(t=>
    <div className="prof-container col text-center">
    <img src={`https://jay555.pythonanywhere.com${t.user_img}`} className="avatar2"/>
     <h1 className="name2"><b className="welcome-text">{t.name}</b></h1> 
      </div>
   )
 }
 <div style={{marginTop:100}}>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/my_customers"><li className="nav-links">My Customers</li></NavLink>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/manage_orders"><li className="nav-links">Manage orders</li></NavLink>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/my_products"><li className="nav-links">My Products</li></NavLink>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/categories"><li className="nav-links">Categories</li></NavLink>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/add_product"><li><button class="add-product">Add Product</button></li></NavLink>
  <NavLink onClick={()=>this.closedrawer()} className="nav-links" to="/create_category"><li><button class="add-product">Create Category</button></li></NavLink>
  </div>
  </ul>
</div>
:null}

</div>


    )

  }

}



