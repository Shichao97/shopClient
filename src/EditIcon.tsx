import React from 'react';
import jquery from "jquery";
import LoginModal from './LoginModal';
const $ = jquery;

export default class EditIcon extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }

    handleIcon(id:number){
        let _this = this;
        let formData = new FormData();
        let param = $('#uploadForm').serializeArray();
        let dd:any = param[0];
        //param.push()
        let ele: any = $('#file')[0];
        let appendTemp = ele.files[0];
        let obj:any = {photo:appendTemp};
        param.push(obj);
        let n:any = this.props.match.params.id;
        formData.append("photo", appendTemp);  
        formData.append("id",n);
        let arr:any = formData.keys;
        $.ajax({
            url: 'http://localhost:8080/member/upIcon',
            type: 'POST',
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function(d) {
                let n = d.msg;
                let n2 = d.test;
                if(d.msg==1){
                    alert("提交成功");
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//未登录错误
                    let popwin: any = _this.refs.logwin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
        })

    }
    render(){
        let id:number = this.props.uid;
        let imgSrc:string = "http://localhost:8080/member/geticon?Id="+id+"&size=1";
        return(
            <div>
                <h2>Hello! {this.props.un}</h2>
                <img src={imgSrc} /><br/>
                <form id="uploadForm" >
                    Edit you icon: <input id="file" type="file" name="upfile"/>
                    <button id="upload" type="button" value="Upload" onClick={() => this.handleIcon(id)}>upload</button>
                </form>
                <LoginModal ref="logwin"/>
            </div>
        )
    }
}