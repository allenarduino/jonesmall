import React from 'react';
import '../Styles/Display.css';
import {Link} from 'react-router-dom';


class Display extends React.Component{
    constructor(props){
        super(props);
        this.state={
             name:[]
        }
    }

    fetch_info=()=>{
        fetch("https://jonesmall.pythonanywhere.com/display",
        {
            methods:"GET",
            "Content-Type":"application/json",
            headers:{
                Authorization:`${localStorage.getItem("customer_token")}`
            }
        }
        )
       .then(res=>res.json())
       .then(data=>{
           this.setState({
               name:data
           })
       })
        .catch(err=>console.log(err))
    }
    componentDidMount(){
       this.fetch_info();
    }


    render(){
        return(
            <div className="row">
            <div className="display-background">
    {/*<button onClick={()=>{localStorage.removeItem("instructor_token")}} style={{marginTop:200}} >Logout</button>*/}
         {/********************Sidebar*************/}

{
    this.state.name.map(t=>
        <div  className="col-lg-7 col-xs-10 col-xl-7  col-sm-10 col-md-10 display-container col text-center "> 
        <div className="col text-center">
                    <p><b>Dear {t.name},</b> </p>  
                      <h3 className="display-message">
                          You have sucessfully placed an order.
                          You can now go to your shopping <Link to="/cart" className="link">cart</Link> and save the page.
                          We will call you for confirmation so that you receive your items.
                          Happy shopping 
                      </h3>
              </div>
            </div>
            


        )
} 





</div>     
</div>

        )
    }

}

export default Display;