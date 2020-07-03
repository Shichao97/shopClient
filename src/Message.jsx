import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login';

var ws;


class Messgae extends React.Component {
    constructor() {
        super();
        this.state = { msgs: [],connected:false };
        //this.setState({loginUser:{}});
        this.taskRemindInterval = null;
    }


    componentDidMount() {

        setTimeout(this.iTimer,0);
    }

 
    componentWillUnmount(){
        if(ws != undefined) ws.close();
        clearInterval(this.timer);
    }

    iTimer = () => {
        this.timer = setInterval(() => {
            var win = window;
            let uid = win.getCookie("userId");
            let username = win.getCookie("username");
            if(uid != undefined && uid.length>0){
                if(ws == undefined){
                    let wsUrl = window.localStorage.getItem("wshost_pre")+'myHandler';
                    this.connectWithWS(wsUrl);
                    this.setState({});
                }
            }
            else if(ws != undefined){
                ws.close();
                ws = undefined;
                this.setState({});
            }
            
        }, 1000);
      }

    connectWithWS(wsUrl) {
        
        ws = new WebSocket(wsUrl);

        let result = "";

        ws.onopen = (e) => {
            this.setState({connected:true});

            console.log('连接上 ws 服务端了');
            ws.send(JSON.stringify({ flag: wsUrl, data: "Hello WebSocket!" }));
        }
        ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);


            result += msgJson.MsgBody + '\n';
            if (msgJson.flag == "login") {//多设备在线的异常发生时;
                this.setState({});
            } 
            else if (msgJson.flag == "logout") {//用户退出系统的时候;
                ws.close();
                this.setState({});
            }
            else if (msgJson.flag == "msg") {//用户退出系统的时候;
                var from = msgJson.from;
                var fromMsgArr = this.state.msgs[from];
                if(fromMsgArr == undefined){
                    this.state.msgs[from] = [];
                }
                this.state.msgs[from].push(msgJson);
                this.setState({});
            }

        };
        ws.onclose = (e) =>{
            this.setState({connected:false});
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }

    getNewMsgNum(){
        var n = 0;
        this.state.msgs.forEach(element => {
            n += element.length;
        });
    }
 

    render() {
        var win = window;
        let uid = win.getCookie("userId");
        let username = win.getCookie("username");
        if(uid != undefined && uid.length>0){
            return (
            <div>
                Hello,{username}
            </div>
            )
        }
        else {
            return (
                
            <div>
                <Router>
                
                <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;

                </Router>
                
            </div>
            )
        }
    }




}

export default Messgae;