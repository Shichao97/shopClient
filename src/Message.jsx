import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import ChatMemberList from './ChatMemberList';
// import { createHashHistory } from 'history'
// import { Button, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import conf from './Conf'
import { Badge, Modal } from 'antd';
//import { ClockCircleOutlined } from '@ant-design/icons';


import jquery from "jquery";
const $ = jquery;


var ws;
var timerNum = 0;

class Messgae extends React.Component {
    constructor(props) {
        super(props);
        let uid = conf.getCookie("userId")
        this.state = { msgs: [],connected:false,chatMembersArr:[],chatMembers:{},icon_index:0};
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
 
        setTimeout(this.iTimer,0);

    }

 
    componentWillUnmount(){
        
        if(ws != undefined) ws.close();
        clearInterval(this.timer);
    }

    refreshNewMsg(uid){
        let _this = this;
        let url = window.localStorage.getItem("host_pre")+"msg/getNewMsgCount?toId="+uid;
        $.ajax({
            type:"GET",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
            url:url,
            dataType:"json",
            success:function(data){
                _this.setState({newNum: data});
            },
            error: function(xhr, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                
            }
          })
    }

    iTimer = () => {
        let _this = this;
        this.timer = setInterval(() => {
            timerNum++;


            let uid = conf.getCookie("userId");
            let username = conf.getCookie("username");
            if(uid != undefined && uid.length>0){
                if(timerNum % 5==0){
                    //_this.refreshNewMsg(uid);
                }
                    
                if(ws == undefined){
                    let wsUrl = window.localStorage.getItem("wshost_pre")+'myHandler';
                    _this.connectWithWS(wsUrl);
                    _this.setState({});
                }
            }
            else if(ws != undefined){
                ws.close();
                ws = undefined;
                _this.setState({ msgs: [],connected:false,chatMembersArr:[],chatMembers:{}});
            }
            
        }, 1000);
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
            ws.send(JSON.stringify({ flag: "msg_new"}));
        }
        ws.addEventListener('message', (msg) => {
        //ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);
            var winWs = window.ws;
            let uid = conf.getCookie("userId");
            result += msgJson.MsgBody + '\n';
            if (msgJson.flag == "login") {
                this.setState({});
            } 
            else if (msgJson.flag == "logout") {
                ws.close();
                conf.setCookie("userId","");
                conf.setCookie("username","");
                this.setState({});
                Modal.info({title:"Force Logout",content:"You are forced to logout because the same username login at other place"});
            }
            else if (msgJson.flag == "msg_new") {

                if(msgJson.otherId==1) this.state.chatMembersArr.unshift(msgJson);
                else this.state.chatMembersArr.push(msgJson);
                var otherId = msgJson.otherId;
                this.state.chatMembers[otherId] = msgJson;
                this.setState({});
                
            }
            else if (msgJson.flag == "msg") {
                var otherId = this.getOtherId(msgJson);
                var otherName = this.getOtherName(msgJson);

                var member = this.state.chatMembers[otherId];
                if(member === undefined){
                    member ={count:0,fromId:msgJson.fromId,toId:msgJson.toId,otherId:otherId,otherName:otherName};
                    if(otherId==1) this.state.chatMembersArr.unshift(msgJson);
                    else this.state.chatMembersArr.push(member);
                    this.state.chatMembers[otherId] = member;
                    this.setState({});
                }
                if(msgJson.fromId != uid ){
                    member.count++;
                    this.setState({});
                }
                
            }
            else if (msgJson.flag == "msg_read") {
                var otherId = msgJson.otherId;
                if(this.state.chatMembers[otherId].count>0){
                    this.state.chatMembers[otherId].count--;
                }
                this.setState({});
            }
            else if (msgJson.flag == "msg_readAll") {//msg_readAll
                var otherId = msgJson.otherId;
                this.state.chatMembers[otherId].count = 0;
                let totalNew = this.getTotalNewNum();
                this.setState({});
            }
            else  if (msgJson.flag == "icon_update") {
                let n = this.state.icon_index+1;
                this.setState({icon_index:n});
            }
        });
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

    getOtherId(msgJson){
        //if(msgJson.otherId !== undefined) return msgJson.otherId;
        let uid = conf.getCookie("userId");
        if(uid == msgJson.fromId) return msgJson.toId;
        else return msgJson.fromId;
    }
    getOtherName(msgJson){
        //if(msgJson.otherName !== undefined) return msgJson.otherName;
        let uid = conf.getCookie("userId");
        if(uid == msgJson.fromId) return msgJson.toName;
        else return msgJson.fromName;
    }

    getTotalNewNum(){
        var n = 0;
        this.state.chatMembersArr.forEach(element => {
            n += element.count;
        });
        return n;
    }
 
    messageListClicked(){
        var sta = {
            pathname: '/chatMemberList/',
            state: {mesState:this.state}//'我是通过state传值'
        }
        this.props.history.push(sta);

        // let msgwin = conf.msgWin;
        // let n =5;
        // msgwin.setState({modalIsOpen:true})
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
                    {this.state.chatMembersArr.length==0?<div></div>:
                    <Badge count={newNum}  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={()=>this.messageListClicked()}>
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