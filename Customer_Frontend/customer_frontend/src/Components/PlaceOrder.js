import React from 'react';
import '../Styles/Signup.css';
import {Link} from 'react-router-dom';




class PlaceOrder extends React.Component{



    constructor(props){
        super(props);
        this.state={
          address:"",
          telephone_number:"",
          loading:false
        }
    }

    handle_address=(e)=>{
        this.setState({
            address:e.target.value
        })
    }



    handle_telephone_number=(e)=>{
        this.setState({
           telephone_number:e.target.value
        })
        
    }

    

    place_order=(e)=>{
        e.preventDefault();
       
       
       
           

          this.setState({
              loading:true
          })

          const data=new FormData();
          data.append("address",this.state.address)
          data.append("telephone_number",this.state.telephone_number)
          data.append("cart_items",localStorage.getItem("mycart"))

        fetch("https://jonesmall.pythonanywhere.com/place_order",
        {
            method:"POST",
            body:data,
            headers:{
                Authorization:`${localStorage.getItem("customer_token")}`,
                
            }
           
        
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                loading:false
            })
            
          alert("Order placed sucessfully");
          this.props.history.push("/display")
        }).catch((err)=>{alert(err)});
        
    }


    

    







    render(){
        return(
            
            <div className="row">
            <div className="bg">
          
                  <div style={{marginTop:30}} className="form-container ">
                      <form onSubmit={this.place_order} className="form-group">
                      <h3 style={{color:"grey",fontSize:20}}>Place order</h3>
                          <input type="text" onChange={this.handle_address}
                          className=" forminput"
                          placeholder="Address"
                          name="address"
                          required="true"
                          value={this.state.address}
                          />
                    
                       <input type="number" onChange={this.handle_telephone_number}
                          className=" forminput"
                          placeholder="Telephone number"
                          name="telephone_number"
                          required="true"
                          value={this.state.telephone_number}
                          />
                         
                          {this.state.loading==false?<input type="submit" className="formbutton" value="Place Order"/>:<input type="submit" className="formbutton" value="Sending..."/>}

                      </form>

                     
            </div>
         </div>
         </div>
         
         
         
        )
    }
}

export default PlaceOrder;