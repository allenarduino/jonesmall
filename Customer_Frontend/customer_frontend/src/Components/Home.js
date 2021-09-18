import React from 'react';
import  jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import '../Styles/Home.css';
import Typewriter from 'typewriter-effect';









class Home extends React.Component{

render(){
    return(
        
        <div className="row">
            <div className="home-background col-lg-12">
               <div className="col text-center">
               <h2 className="background-text1"><b>Welcome to Jones Mall</b></h2>
                   <h2 className="background-text2">
                       <b>
                       <Typewriter  
  options={{
   strings:["Your online store","Explore quality products","Easy shoppping","Shop at home","View categories"],
    autoStart:true,
     loop:true,
   pauseFor:600,
    
   }}/>
                       </b></h2>
                   <div className="button-container">
                   <Link to="/categories"><button  className="r-button">Categories</button></Link>
                   <Link to="/products"><button  className="l-button">Products</button></Link>
                  
                   </div>
                   </div>
               
            </div>
        </div>
        
    )
}
}
export default Home;