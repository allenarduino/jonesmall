import React from 'react';
import {Row,Col} from 'react-grid-system';
import "./MyCustomers.css";

class MyCustomers extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mycustomers:[]
        }
    }

    componentDidMount(){
        this.fetchCustomers();
    }

    fetchCustomers=()=>{
        this.setState({
            mycustomers:localStorage["CS"]?JSON.parse(localStorage.getItem("CS")):[]
        })
        fetch("https://jonesmall.pythonanywhere.com/my_customers",{

           method:"GET",
           "Content-Type":"application/json"
        })
        .then(res=>res.json())
        .then(data=>{
             this.setState({
                 mycustomers:data
             })
             localStorage.setItem("CS",JSON.stringify(data))
        })
    }


   render(){
       return(
           <div className="add-screen">
           <div  className="col text-center">
               <Row className="product-holder" style={{marginTop:100}}>
               {
                   this.state.mycustomers.length==0?<div className="col text-center"><b>Loading...</b></div>:
                   this.state.mycustomers.map(t=>
                    
                    <Col  className="customer-card"  key={t.id} xs={6} sm={6} md={4} lg={3} xl={3} style={{marginTop:10,height:80}}>
                  <b className=" mytext">{t.name}</b>
                  <p className=" mytext">{t.email}</p>
                </Col>
                  
                    )
               }
               </Row>
           </div>
           </div>
       )
   }
}

export default MyCustomers;