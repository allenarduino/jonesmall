import React from 'react';







//const consumer_key='ck_0e63c062e4399d60f406ba76289e9b14eee408c6';
//const consumer_secret='cs_3807cb3079189e9e73290ae9f2491b98d87a7a78';
//Creating the product class
class Products extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }


    componentDidMount(){
        fetch(
           `http://localhost/wordpress/index.php/wp-json/wc/v3/products?
           consumerKey:'ck_0e63c062e4399d60f406ba76289e9b14eee408c6&consumerSecret:'cs_3807cb3079189e9e73290ae9f2491b98d87a7a78'
           `,
           {
               method:"GET",
               "Content-Type":"application/json",
            
                   headers:{
                       
                  consumerKey:'ck_0e63c062e4399d60f406ba76289e9b14eee408c6',
                   consumerSecret:'cs_3807cb3079189e9e73290ae9f2491b98d87a7a78'
                 
                  
               }

               
           }
        )
        .then(res=>res.json())
        .then(data=>{
            
            this.setState({
                products:data
            })
        })
        .catch(err=>console.log(err));

       
        
    }




    render(){
        return(
            <div>
                {
                    this.state.products.map(t=>
                        <div style={{marginTop:200}}>{t.Name}</div>
                        )
                }
            </div>
        )
    }
}





export default Products;