import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class ImageUpload extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {imgs:[]};
    }

    multiImagePreview() {
 
        var upMultilImagesObj = document.getElementById("upMultilImages");
        var fileList = upMultilImagesObj.files;
        
        for (var i = 0; i < fileList.length; i++) { 
            this.state.imgs.push(upMultilImagesObj.files[i]);
        }  
        this.setState({});
    }   

    imgClicked(index){
        this.state.imgs.splice(index,1);
        this.setState({});
    }
    
    render(){
    return <div>
	    <input type="file"  name="file" id="upMultilImages" multiple="multiple"   onChange={() => this.multiImagePreview()} accept="image/*" />
        <div>
        {
            this.state.imgs.map((element,index) =>{
                return <div className="upimgs"> 
                <a><span><h1>Click to delete</h1></span>
                <img width="100px" height="100px" onClick={()=> this.imgClicked(index)}
                id={"img_"+index} 
                src={window.URL.createObjectURL(element)} /> 
                </a>
                </div>
            })
        }
        </div>
        </div>  
    }
}