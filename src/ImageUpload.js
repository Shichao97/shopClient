import React from 'react';
//import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class ImageUpload extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {imgs:[]};
    }

    reset(){
        // let arr = this.state.imgs;
        // arr.slice(0,arr.length);
        //
        this.state = {imgs:[]};
        this.setState({imgs:[]});
        //console.log(arr);
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
            let parent = this.props.onChange;
            if(parent !=undefined){
                this.props.onChange();
            } 
        }
    }   

    imgClicked(index){
        this.state.imgs.splice(index,1);
        this.setState({});
        let call = this.props.onChange;
        if(call !=undefined){
            this.props.onChange();
        } 
    }
    
    render(){
        //if(true) return <div></div>
    return <div>
       

        {
            
        }
        <div  className="upimgs">
        <table  className="wrap2">
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