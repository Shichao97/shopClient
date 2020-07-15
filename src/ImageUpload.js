import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class ImageUpload extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {imgs:[]};
    }

    reset(){
        this.setState({imgs:[]});
    }

    multiImagePreview() {
        if(this.props.single == true){
            var upMultilImagesObj = document.getElementById("upMultilImages");
            var fileList = upMultilImagesObj.files;
            this.setState({imgs:[upMultilImagesObj.files[0]]});

            this.setState({});
        }
        else
        {
            var upMultilImagesObj = document.getElementById("upMultilImages");
            var fileList = upMultilImagesObj.files;
            
            for (var i = 0; i < fileList.length; i++) { 
                this.state.imgs.push(upMultilImagesObj.files[i]);
            }  
            this.setState({});
            let parent = this.props.parent;
            if(parent !=undefined){
                parent.imgUploadChanged();
            } 
        }
    }   

    imgClicked(index){
        this.state.imgs.splice(index,1);
        this.setState({});
        let parent = this.props.parent;
        if(parent !=undefined){
            parent.imgUploadChanged();
        } 
    }
    
    render(){
    return <div>
       

        {
            this.state.imgs.map((element,index) =>{
                return <div className="upimgs"> 
                <a><span><h1>Click to delete</h1></span>

                

                <table  className="wrap">
                <tr><td>
                <img width="100px" height="100px" onClick={()=> this.imgClicked(index)}
                id={"img_"+index} 
                src={window.URL.createObjectURL(element)} /> 
                    
                    
                    </td></tr>
              </table>
                </a>
                </div>
            })
        }
        <div  className="upimgs">
        <table  className="wrap">
                <tr><td>
        {

            (this.props.single == true)?
            <a className="file">+Image
            <input type="file"  name="file" id="upMultilImages" onChange={() => this.multiImagePreview()} accept="image/*" />
            </a>
            :
            <a className="file">+Image
            <input type="file"  name="file" multiple id="upMultilImages" onChange={() => this.multiImagePreview()} accept="image/*" />
            </a>
        }
</td></tr>
              </table>
        </div> 
        </div>  
    }
}