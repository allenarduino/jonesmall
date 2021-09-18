import React from 'react';
import './SingleCategory.css';
import {Row,Col} from 'react-grid-system';
import Modal from './Modal';




//Creating the product class
class SingleCategory extends React.Component{
 
  constructor(props){
    super(props);
    this.state={
      SingleCategory:[]
    }
  }
 
   
  componentDidMount(){
   this.fetchSingleCategory();
  }

  fetchSingleCategory=()=>{
    const k=localStorage["SC"]?JSON.parse(localStorage.getItem("SC")):[];

    this.setState({
      SingleCategory:k
    });
    fetch(`https://jonesmall.pythonanywhere.com/categories/${this.props.match.params.id}`,
    {
        method:"GET",
        "Content-Type":"application/json",
    
    }
 )
 .then(res=>res.json())
 .then((data)=>{
   this.setState({
       SingleCategory:data
   });
   localStorage.setItem("SC",JSON.stringify(data))
 })
 .catch(err=>alert(err))
}





  getModal=value=>{
    this.setState({
      showModal:value
    })
  }


  hideModal=value=>{
    this.setState({showModal:0})
  }


    
  render(){

  return(
 
  <div className="add-screen">
    <Row style={{marginTop:100}}>
      {
        this.state.SingleCategory.map(t=>
          <div>
             <Modal
              show={this.state.showModal===t.id}
              onHide={()=>this.hideModal(t.id)}
              add_to_cart={()=>this.AddItem(t)}
              product_img={t.product_img}
              name={t.name}
              price={t.price}
              />
          </div>
          )
      }
     
    {
         this.state.SingleCategory.length==0?
         <div className="col text-center"><b>Loading items....</b></div>:
        this.state.SingleCategory.map(t=>
          
          
              
            <Col onClick={()=>this.getModal(t.id)} key={t.id} xs={6} sm={6} md={4} lg={3} xl={3} style={{marginTop:10}}>
                 <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.product_img}`}/>
                 <div className="product-footer  col text-center">
                   
                   <b className=" mytext">{t.name}</b>
                   <p className=" mytext">${t.price}</p>
                
                     <button  className="add-to-cart"  onClick={()=>this.AddItem(t)}>Delete Product</button>
                   
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
}



export default SingleCategory;


