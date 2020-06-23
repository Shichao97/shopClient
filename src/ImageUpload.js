import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class ImageUpload extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {imgs:[]};
    }

    multiImagePreview(avalue) {
        var all_picW = "100px";//预览的宽度
        var all_picH = "100px";//预览的高度

        var upMultilImagesObj = document.getElementById("upMultilImages");
        var picViewsBox = document.getElementById("picViewsBox");
        picViewsBox.innerHTML = "";
        var fileList = upMultilImagesObj.files;
        //var fs = this.state.imgs;
        //fs.concat(fileList);
        //this.setState({imgs:fs});
        
        for (var i = 0; i < fileList.length; i++) { 
            this.state.imgs.push(upMultilImagesObj.files[i]);
            /*           
            picViewsBox.innerHTML += "<div style='float:left' > <img id='img" + i + "'  /> </div>";
            var picjPreviewInfo = document.getElementById("img"+i); 
            picjPreviewInfo.style.display = 'block';
            picjPreviewInfo.style.width = all_picW;
            picjPreviewInfo.style.height = all_picH;
            picjPreviewInfo.src = window.URL.createObjectURL(upMultilImagesObj.files[i]);
            */
        }  
        this.setState({});
        return true;
    }   

    imgClicked(index){
        this.state.imgs.splice(index,1);
        this.setState({});
    }
    
    render(){
    return <div>
	    <input type="file"  name="file" id="upMultilImages" multiple="multiple"   onChange={() => this.multiImagePreview()} accept="image/*" />
	    <div id="picViewsBox"></div>
        {
            this.state.imgs.map((element,index) =>{
                return <div className="upimgs"> 
                <img width="100px" height="100px" onClick={()=> this.imgClicked(index)}
                src={window.URL.createObjectURL(element)} /> </div>
            })
        }
    </div>  
    }
}