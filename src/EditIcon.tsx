import React from 'react';
import jquery from "jquery";
import LoginModal from './LoginModal';
const $ = jquery;

export default class EditIcon extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            id:"",
            un:""
        }
    }
    
    componentWillMount(){
        var win:any = window;
        var uobj = win.checkLogin();
        
        let id:string = uobj.id;
        this.setState({id:id});
        let un:string = uobj.username;
        this.setState({un:un});
        
    }

    handleIcon(id:string){

       let _this: EditIcon = this;
       let formData = new FormData();
       let ele: any = $('#upfile')[0];
       let appendTemp = ele.files[0];
       formData.append("photo", appendTemp);  
       
       $.ajax({
           url: window.localStorage.getItem("host_pre")+'member/upIcon?id='+id,
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
               console.log(d.msg);
               if(d.msg == 1){
                   console.log("gdfhd");
                   alert("Upload success");
                   _this.setState({});
               }
           },error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
                let popwin: any = _this.refs.logwin;
                popwin.setState({modalIsOpen:true})
            }else if(xhr.status=='606'){ //id differences
                alert("No right to do this!");
            }
            
        }
       })

    }
    // getCookie(key:string){
    //     const name =key+"=";
    //     const ca = document.cookie.split(';'); 
    //     for(let i=0;i<ca.length;i++){
    //       const c = ca[i].trim();
    //       if(c.indexOf(name) === 0){
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    //   }
    render(){
        
        let id:string = this.state.id;
       // id = "1006";
        var myDate = new Date();
        let imgSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+id+"&size=1"+"&refresh="+myDate.getMilliseconds();
        //console.log(imgSrc);
        return(
            <div>
                <h2>Hello! {this.state.un}</h2>
                <img src={imgSrc} /><br/>
                <form id="uploadForm" >
                    Edit you icon: <input id="upfile" type="file" name="upfile"/>
                    <button id="upload" type="button" value="Upload" onClick={() => this.handleIcon(id)}>upload</button>
                </form>
                <LoginModal ref="logwin"/>
            </div>
        )
    
        
    }
}