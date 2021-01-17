import React from 'react';
import './AddProduct.css';

class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product_name:"",
            price:"",
            category:"",
            product_img:null,
            product_description:"",
            categories:[],
            description:"",
            loading:false
        }
    }

    categoryhandler=(e)=>{
        this.setState({
            category:e.target.value
        })
    }

    componentDidMount(){
        fetch("https://jonesmall.pythonanywhere.com/fetch_cat",
        {
            method:"GET",
            "Content-Type":"application/json"
        }
        )
        .then(res=>res.json())
        .then(data=>this.setState({categories:data}))
        .catch(err=>alert(err))
    }


   product_namehandler=(e)=>{
       this.setState({
           product_name:e.target.value
       })
   }



    description_handler=(e)=>{
        this.setState({
            description:e.target.value
        })
    }

    productimagehandler=(e)=>{
        this.setState({
            product_img:e.target.files[0]
        })
    }

    pricehandler=(e)=>{
        this.setState({
            price:e.target.value
        })
    }



     submit_product=()=>{
         
       this.setState({
           loading:true
       })

         const data=new FormData();
         data.append("product_name",this.state.product_name);
         data.append("category",this.state.category);
         data.append("product_img",this.state.product_img);
         data.append("description",this.state.description);
         data.append("price",this.state.price);


         fetch("https://jonesmall.pythonanywhere.com/create_product",
         {
             method:"POST",
             body:data

         }
         )
         .then(res=>res.json())
         .then(res=>{
             alert("Product created sucessfully");
             this.setState({
                 loading:false
             })
            })
         .catch(err=>alert(err));
     }



    

    render(){
        return(
            <div className="add-screen">
                
            <div className="col text-center" style={{marginTop:150,fontSize:30}}> <b>Add Product</b></div>
               <div className="col text-center">
               <input 
               style={{marginTop:50}}
               type="text"
               className="name-input"
               onChange={this.product_namehandler}
               name="product_name"
               value={this.state.product_name}
               placeholder="Name of Product"
                 />



       
<div className="col text-center" style={{marginTop:40}}> <b>Category</b></div>
               <div className="col text-center ">
                   <select className="select-input" value={this.state.category} name="category" onChange={this.categoryhandler}>
                       {this.state.categories.map(c=>
                       <option value={c.cat_name} >{c.cat_name}</option>
                        )}
                   </select>
             </div>










<div className="col text-center">
              
              <button className="ghc-button">GHC</button>

            <input 
               type="number"
               className="num-input"
               onChange={this.pricehandler}
               name="price"
               placeholder="Price in GHC"
               value={this.state.price}
                 />
               
              </div>


            <div className="col text-center">
                <div style={{marginTop:20}} className="col text-center"><b>Product Image</b></div>
            <input 
               
               type="file"
               className="cat-image"
               onChange={this.productimagehandler}
               name="product_img"
               placeholder="Name of Category"
                 />
              </div>


             <div className="col text-center">
             <div style={{marginTop:20,textAlign:"center",fontSize:20}}><b>Description</b></div>
        <textarea  value={this.state.description}  onChange={this.description_handler} type="text" name="description" className="description-input"/>
             </div>

                 {this.state.loading==true?
                 <input type="submit" onClick={this.submit_product} value="Sending.........." className="create-product-butn"/>:
                 <input type="submit" onClick={this.submit_product} value="Publish" className="create-product-butn"/>
                 }
             

               </div>
               
       
       </div>
        
            
            
        )
    }
}

export default AddProduct;