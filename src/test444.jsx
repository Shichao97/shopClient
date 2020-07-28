import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import ChatMemberList from './ChatMemberList';
// import { createHashHistory } from 'history'
// import { Button, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import conf from './Conf'
import { Badge, Modal ,Spin} from 'antd';
//import { ClockCircleOutlined } from '@ant-design/icons';


import jquery from "jquery";
const $ = jquery;


var ws;
var timerNum = 0;

class Messgae extends React.Component {
    constructor(props) {
        super(props);
        let uid = conf.getCookie("userId")
        this.state = { msgNewEnd: false,connected:false,chatMembersArr:[],chatMembers:{},icon_index:0};
        this.taskRemindInterval = null;
    }

 
    // componentWillReceiveProps(nextProps){
    //     var str = nextProps.location.pathname;
 
    //     if(str != undefined && str.substr(0,2) == "/_"){
    //         let obj = new Object();
    //         obj.id = conf.getCookie("userId");
    //         obj.username = conf.getCookie("username");
    //         //console.log("Hi! "+uid);
    //         if(obj.id == ""){
    //             this.props.history.push( "/login" );
    //         }    
               
    //     }
    // }
    
    // checkLogin(){
    //     let obj = new Object();
    //     obj.id = conf.getCookie("userId");
    //     obj.username = conf.getCookie("username");
    //     //console.log("Hi! "+uid);
    //     if(obj.id == ""){
    //         //location.hash = "/login";
    //         this.props.history.push( "/login" );
    //     }    
    //     return obj;
    // }
    componentDidMount() {
      let wsUrl = window.localStorage.getItem("wshost_pre")+'testHandler';
      this.connectWithWS(wsUrl);

    }
    connectWithWS(wsUrl) {
        
        ws = new WebSocket(wsUrl);
        window.ws = ws;
        let result = "";

        ws.onopen = (e) => {
            this.setState({connected:true});

            console.log('连接上 ws 服务端了');
            //var win = window;
            let uid = conf.getCookie("userId");
            let username = conf.getCookie("username");
            //handshake hello msg
            ws.send(JSON.stringify({ flag: "msg",data:"hello"}));
        }
        ws.addEventListener('message', (msg) => {
        //ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);
            
        });
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

 
   
    
    
    // getCookie(key){
    //     const name =key+"=";
    //     const ca = document.cookie.split(';'); 
    //     for(let i=0;i<ca.length;i++){
    //       const c = ca[i].trim();
    //       if(c.indexOf(name) === 0){
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    // }
    render() {
        var win = window;
        let uid = conf.getCookie("userId");
        let username = conf.getCookie("username");
        let newNum = this.getTotalNewNum();
        console.log("Msg newNum="+newNum)
        //let sNum = newNum==0?"":""+newNum;
        //let btn = <Button key="back" type="text" size="large" onClick={()=>this.messageListClicked()}>Message </Button>;
        //if(this.state.chatMembersArr.length==0) btn=<div></div>
        let iconSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+uid+"&size=1&iconIndex"+this.state.icon_index;
        console.log(iconSrc);
        if(uid != undefined && uid.length>0){
            return (
            <div >
                
                <a onClick={()=>this.props.history.push("/editicon")}><div className="circleIcon_middle"><img src={iconSrc}/></div>&nbsp;{username}</a>
                    {this.state.msgNewEnd != true?<Spin/>:
                    <Badge count={newNum}  >&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={()=>this.messageListClicked()}>
                    Message </a> </Badge> 
                }
            </div>
            )
        }
        else {
            return (
                
            <div style={{display:'inline-block'}}>
                   <a onClick={()=>this.props.history.push("/login")}>Login</a> 
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a onClick={()=>this.props.history.push("/register")}>Register</a> 
                  
            </div>
            )
        }
    }



}

export default withRouter(Messgae);