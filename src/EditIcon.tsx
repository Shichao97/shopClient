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
        let id:string = this.getCookie("userId");
        console.log(id);
        if(id == ""){
            this.props.history.push(  "/login"  );
        }
        this.setState({id:id});
        let un:string = this.getCookie("username");
        this.setState({un:un});
        
    }
    handleIcon(id:string){
        /*
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
        */
       let _this: EditIcon = this;
       let formData = new FormData();
       let ele: any = $('#upfile')[0];
       let appendTemp = ele.files[0];
       formData.append("photo", appendTemp);  
       
       $.ajax({
           url: 'http://localhost:8080/member/upIcon?id='+id,
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
    getCookie(key:string){
        const name =key+"=";
        const ca = document.cookie.split(';'); 
        for(let i=0;i<ca.length;i++){
          const c = ca[i].trim();
          if(c.indexOf(name) === 0){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    render(){
        
        let id:string = this.state.id;
       // id = "1006";
        var myDate = new Date();
        let imgSrc:string = "http://localhost:8080/member/geticon?Id="+id+"&size=1"+"&refresh="+myDate.getMilliseconds();
        
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