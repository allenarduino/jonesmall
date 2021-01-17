import React from 'react';
import {Row,Col} from 'react-grid-system';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Categories extends React.Component{

    constructor(props){
        super(props);
        this.state={
            categories:[]
        }
    }


    getCategories=()=>{
        const C=localStorage["C"]?JSON.parse(localStorage.getItem("C")):[];
        this.setState({
            categories:C
           })
     

        fetch("https://jonesmall.pythonanywhere.com/categories",
        {
            method:"GET",
            "Content-Type":"application/json",
        
        }
     )
     .then(res=>res.json())
     .then((data)=>{
       this.setState({
           categories:data
       });
         /*If old item is in local storage, remove it and push new item from server*/
        localStorage.removeItem("C");
        localStorage.setItem("C",JSON.stringify(data))
     })
     .catch(err=>console.log(err))

    
    }

    componentDidMount(){
        this.getCategories();
    }


    render(){
        return(
            <div>
                <Row style={{marginTop:100}}>
      {
        this.state.categories.length==0?
        <div className="col text-center"><b>Loading product categories....</b></div>:
       this.state.categories.map(t=>
         
         
       
           <Col key={t.id} xs={6} sm={4} md={4} lg={3} xl={2} style={{marginTop:10}}>
                <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.cat_image}`}/>
                <div className="product-footer  col text-center">
                <Link to={`/category/${t.cat_name}`} style={{textDecoration:"none"}}>
                    <b style={{color:"black"}} className="mytext">{t.cat_name}</b>
                </Link>
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

export default Categories;