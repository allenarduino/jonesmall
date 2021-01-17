import React from 'react';
import Modal from './Modal';
import {Row,Col} from 'react-grid-system';
import './MyProducts.css';


class SingleOrder extends React.Component{

    constructor(props){
        super(props);
        this.state={
           details:[]
        
        }
    }

     
    componentDidMount(){
        this.fetchSingleOrder();
    }


    fetchSingleOrder=()=>{


          
    fetch(`https://jonesmall.pythonanywhere.com/orders/${this.props.match.params.id}`,
    {
        method:"GET",
        "Content-Type":"application/json",
    
    }
 )
 .then(res=>res.json())
 .then((data)=>{
   this.setState({
      details:data
   });
   
   
 })
    }

   


    render(){
        return(
            <div className="add-screen">
            
             {
                 this.state.details.length==0?<div className="col text-center"><b>Loading...</b></div>:
                 this.state.details.map(t=>
                    <div style={{marginTop:100}}>
                        <div className="col text-center"><b>Items/Products:</b></div>
                  <Row>
                        {JSON.parse(t.cart_items).map(c=>
                            
                            <Col   xs={6} sm={6} md={4} lg={3} xl={3} style={{marginTop:10,marginTop:10}}>
                            <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.product_img}`}/>
                            <div style={{height:85}} className="product-footer  col text-center">
                              
                              <b className=" mytext">{t.name}</b>
                              <p className=" mytext">${t.price}</p>
                              <b  className="mytext-quantity">Quantity:{t.quantity}</b>
                            
                              
                                
                              
                                </div>
                               <div>                   
                            </div>
                        
                     
                            </Col>
                            
                                 
                          )   
                        }
                    </Row>
                      </div>  
                    
                 )
             }
           

    
      </div>
      
        
        )
    }
}

export default SingleOrder;