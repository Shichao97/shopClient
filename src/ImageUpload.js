import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class ImageUpload extends React.Component {
    
    multiImagePreview(avalue) {
        var all_picW = "100px";//预览的宽度
        var all_picH = "100px";//预览的高度

        var upMultilImagesObj = document.getElementById("upMultilImages");
        var picViewsBox = document.getElementById("picViewsBox");
        picViewsBox.innerHTML = "";
        var fileList = upMultilImagesObj.files;
        for (var i = 0; i < fileList.length; i++) {            
            picViewsBox.innerHTML += "<div style='float:left' > <img id='img" + i + "'  /> </div>";
            var picjPreviewInfo = document.getElementById("img"+i); 
            //if (upMultilImagesObj.files && upMultilImagesObj.files[i]) {
                //火狐
                picjPreviewInfo.style.display = 'block';
                picjPreviewInfo.style.width = all_picW;
                picjPreviewInfo.style.height = all_picH;
                //picjPreviewInfo.src = upMultilImagesObj.files[0].getAsDataURL();
                //火狐7+版本,用不了getAsDataURL()
                picjPreviewInfo.src = window.URL.createObjectURL(upMultilImagesObj.files[i]);
            /*} else {
                //IE
                upMultilImagesObj.select();
                var picTagSrc = document.selection.createRange().text;
                alert(picTagSrc);
                var localImagId = document.getElementById("img" + i);
                //设置初始大小
                localImagId.style.width = all_picW;
                localImagId.style.height = all_picH;
                //图片异常捕捉
                try {
                    localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = picTagSrc;
                }
                catch (e) {
                    alert("图片格式不正确!");
                    return false;
                }
                picjPreviewInfo.style.display = 'none';
                document.selection.empty();
            }*/
        }  
        return true;
    }   

    
    render(){
    return <div>
	    <input type="file"  name="file" id="upMultilImages" multiple="multiple"   onChange={() => this.multiImagePreview()} accept="image/*" />
	    <div id="picViewsBox"></div>
    </div>  
    }
}