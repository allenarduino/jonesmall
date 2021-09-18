import React from 'react';
import {Row,Col} from 'react-grid-system';
import { Link } from 'react-router-dom';

class Categories extends React.Component{

    constructor(props){
        super(props);
        this.state={
            categories:[],
            loading:true
        }
    }

    componentDidMount(){
        this.getCategories();
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
           categories:data,
           loading:false
       });
       localStorage.setItem("C",JSON.stringify(data));

     })
     .catch(err=>alert(err))

    
    }


    delete_category=(id)=>{
        if (window.confirm("Are you sure you want to delete this product?")){
        fetch(`https://jonesmall.pythonanywhere.com/delete_category/${id}`,
        {
            method:"DELETE"
        }
        )
        .then(res=>res.json())
        .then(data=>{
         
            const category_list=this.state.categories.filter(x=>{
              return x.id!==id
            })
            this.setState({
              categories:category_list
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
        this.state.loading==true?
        <div className="col text-center"><b>Loading product categories....</b></div>:
       this.state.categories.map(t=>
         
         
       
           <Col key={t.id}  xs={6} sm={6} md={4} lg={3} xl={3} style={{marginTop:10}}>
                <img  className="product-img" src={`https://jonesmall.pythonanywhere.com${t.cat_image}`}/>
                <div className="product-footer  col text-center">
                <Link to={`/category/${t.cat_name}`} style={{textDecoration:"none"}}>
                    <b style={{color:"black"}} className="mytext">{t.cat_name}</b>
                </Link>
              
                    <p onClick={()=>this.delete_category(t.cat_name)} style={{color:"red",fontSize:15}}>DELETE</p>
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