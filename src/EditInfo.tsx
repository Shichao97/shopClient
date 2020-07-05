import React from 'react';
import jquery from "jquery";
const $ = jquery;

export default class EditInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }
    
    handleIcon(id:number){
        let _this: EditInfo = this;
        let formData = new FormData();
        let ele: any = $('#upfile')[0];
        let appendTemp = ele.files[0];
        formData.append("photo", appendTemp);  
        
        $.ajax({
            url: window.localStorage.getItem("host_pre")+'member/upIcon?id='+id,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function(d) {
                console.log(d.msg);
                if(d.msg == 1){
                    console.log("gdfhd");
                    alert("Upload success");
                    _this.setState({});
                }
            }
        })
        
       /*
       $.ajax({
        type: "POST",
        url:window.localStorage.getItem("host_pre")+"member/upIcon",
        data:formData,
        contentType: false,
        processData: false,
        success: function(data) {
            if(data){
                alert("提交成功");
            }
        }
        });*/


    }
    render(){
        let id:number = this.props.uid;
        id = 1006;
        var myDate = new Date();
        let imgSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+id+"&size=1"+"&refresh="+myDate.getMilliseconds();
        return(
            <div>
                <h2>Hello! {this.props.un}</h2>
                <img src={imgSrc} /><br/>
                <form id="uploadForm" >
                    Edit you icon: <input id="upfile" type="file" name="upfile"/><br/>
                    <button id="upload" type="button" value="Upload" onClick={() => this.handleIcon(id)}>upload</button>
                </form>
            </div>
        )
    }
}