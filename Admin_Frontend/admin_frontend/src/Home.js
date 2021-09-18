import React from 'react';
import  jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import './Home.css';
import Typewriter from 'typewriter-effect';









class Home extends React.Component{

render(){
    return(
        
        
        
        <div className="home-background col-lg-12">
           <div className="col text-center">
           <h2 className="background-text1"><b>Welcome Admin</b></h2>
               <h2 className="background-text2">
                   <b>
                   <Typewriter  
options={{
strings:["Create products","Create product categories","Manage orders","Manage your customers","Manage your products","Login now"],
autoStart:true,
 loop:true,
pauseFor:600,

}}/>
                   </b></h2>
               <div className="col text-center">
               <Link to="/admin_login"><button  className="l-button">Login</button></Link>
               </div>
               </div>
           
        </div>
    
    )
}
}
export default Home;