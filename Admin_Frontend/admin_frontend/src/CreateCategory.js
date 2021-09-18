import React from 'react';
import './AddProduct.css';
import './CreateCategory.css';

class CreateCategory extends React.Component{

    constructor(props){
        super(props);
        this.state={
            cat_name:"",
            cat_image:null,
            loading:false
        }
    }



    catnamehandler=(e)=>{
        this.setState({
          cat_name:e.target.value
        })
     
    }

    
    catimagehandler=(e)=>{
        this.setState({
            cat_image:e.target.files[0]
          })
    }

    publish=(e)=>{
        
        e.preventDefault();


        this.setState({
            loading:true
        })
        const data=new FormData();
        data.append('cat_image',this.state.cat_image);
        data.append('cat_name',this.state.cat_name);
       

        fetch("https://jonesmall.pythonanywhere.com/create_category",
        {

         method:"POST",
         body:data
        }
        )
        .then(res=>res.json())
        .then(res=>{alert("Category created")
        this.setState({
            loading:false
        })
    }
        )
        .catch(err=>alert(err))
    }

    render(){
        return(
            <div className="add-screen ">
                
                 <div className="col text-center" style={{marginTop:150,fontSize:30}}> <b>Create Category</b></div>
                    <div className="col text-center">
                    <input 
                    style={{marginTop:50}}
                    type="text"
                    className="cat-name"
                    onChange={this.catnamehandler}
                    name="cat_name"
                    value={this.state.cat_name}
                    placeholder="Name of Category"
                      />
                 <div className="col text-center">
                     <div style={{marginTop:50}} className="col text-center"><b>Category Image</b></div>
                 <input 
                    
                    type="file"
                    className="cat-image"
                    onChange={this.catimagehandler}
                    name="cat_image"
                    placeholder="Name of Category"
                      />
                   </div>


                      {this.state.loading===false?
                      <input type="submit" onClick={this.publish} value="Publish" className="create-cat-butn"/>:
                      <input type="submit" onClick={this.publish} value="Submitting........." className="create-cat-butn"/>
                      }
                  

                    </div>
                    
            
            </div>
        )
    }
}

export default CreateCategory;