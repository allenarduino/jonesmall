import React from 'react';
import Modal from './Modal';
import {Row,Col} from 'react-grid-system';
import './MyProducts.css';


class MyProducts extends React.Component{

    constructor(props){
        super(props);
        this.state={
            myproducts:[],
            showModal:0,
            loading:true
        }
    }

     
    componentDidMount(){
        this.fetchMyProducts();
    }


    fetchMyProducts=()=>{

        this.setState({
            myproducts:localStorage["MyP"]?JSON.parse(localStorage.getItem("MyP")):[]
        })
          
    fetch("https://jonesmall.pythonanywhere.com/products",
    {
        method:"GET",
        "Content-Type":"application/json",
    
    }
 )
 .then(res=>res.json())
 .then((data)=>{
   this.setState({
       myproducts:data,
       loading:false
   });
   localStorage.setItem("MyP", JSON.stringify(data))
 })
    }

    getModal=value=>{
        this.setState({
          showModal:value
        })
      }
    
    
      hideModal=value=>{
        this.setState({showModal:0})
      }
    


    delete_product=(id)=>{
      if (window.confirm("Are you sure you want to delete this product?")){
      fetch(`https://jonesmall.pythonanywhere.com/delete_product/${id}`,
      {
          method:"DELETE"
      }
      )
      .then(res=>res.json())
      .then(data=>{
       
          const product_list=this.state.myproducts.filter(x=>{
            return x.id!==id
          })
          this.setState({
            myproducts:product_list
          })
    
    
      })
      .catch(err=>console.log(err))
    }
    
    
     }
    

    render(){
        return(
            <div className="add-screen">
            <Row style={{marginTop:100}}>
            {
              this.state.myproducts.map(t=>
                <div>
                   <Modal
                    show={this.state.showModal===t.id}
                    onHide={()=>this.hideModal(t.id)}
                    product_img={t.product_img}
                    name={t.name}
                    price={t.price}
                   
                    />
                </div>
                )
            }
           
          {
               this.state.loading==true?
               <div className="col text-center"><b>Loading items....</b></div>:
              this.state.myproducts.map(t=>
                
                <Col  key={t.id} xs={6} sm={6} md={4} lg={3} xl={3} style={{marginTop:10,marginTop:10}}>
                <img onClick={()=>this.getModal(t.id)} className="product-img" src={`https://jonesmall.pythonanywhere.com${t.product_img}`}/>
                <div className="product-footer  col text-center">
                  
                  <b className=" mytext">{t.name}</b>
                  <p className=" mytext">${t.price}</p>
                
                  <p className="delete-text" onClick={()=>this.delete_product(t.cat_name)} style={{color:"red"}}>DELETE</p>
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

export default MyProducts;