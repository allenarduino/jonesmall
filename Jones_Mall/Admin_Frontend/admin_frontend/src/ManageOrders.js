import React from 'react';
import {Row,Col} from 'react-grid-system';
import "./MyCustomers.css";
import {Link} from 'react-router-dom';

class ManageOrders extends React.Component{

    constructor(props){
        super(props);
        this.state={
            orders:[]
        }
    }

    componentDidMount(){
        this.fetchOrders();
    }

    fetchOrders=()=>{
        this.setState({
            orders:localStorage["OD"]?JSON.parse(localStorage.getItem("OD")):[]
        })
        fetch("https://jonesmall.pythonanywhere.com/orders",{

           method:"GET",
           "Content-Type":"application/json"
        })
        .then(res=>res.json())
        .then(data=>{
             this.setState({
                 mycustomers:data
             })
             localStorage.setItem("OD",JSON.stringify(data))
        })
    }


   render(){
       return(
           <div className="add-screen">
           <div className="card-bg" style={{marginTop:100}} className="col text-center">
               <Row>
               {
                   this.state.orders.length==0?<div className="col text-center"><b>Loading...</b></div>:
                   this.state.orders.map(t=>
                    
                 <Col style={{marginTop:10}} className="customer-card"  key={t.id} xs={6} sm={6} md={4} lg={3} xl={3}>
                  <b className=" mytext">{t.name}</b>
                  <p className=" mytext">{t.email}</p>
                  <p className=" mytext">{t.address}</p>
                  <p className=" mytext">{t.telephone_number}</p>
                  <p style={{fontSize:15}}><Link to={`/single_order/${t.id}`} style={{textDecoration:"none"}}>View details</Link></p>
                </Col>
                  
                    )
               }
               </Row>
           </div>
           </div>
       )
   }
}

export default ManageOrders;