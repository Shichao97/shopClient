import React from 'react';
import ReactDOM from 'react-dom';
//import WebSocket from './WebSocket';


class WebChatTest extends React.Component {
    constructor() {
        super();
        this.taskRemindInterval = null;
    }


    handleClicked(){
        let wsUrl = 'ws://localhost:8080/chat';
        this.connectWithWS(wsUrl);
    }


    connectWithWS(wsUrl) {
        
        const ws = new WebSocket(wsUrl);
        
        let result = "";
    
        ws.onopen = function (e) {
            console.log('连接上 ws 服务端了');
            ws.send(JSON.stringify({ flag: wsUrl, data: "Hello WebSocket!" }));
        }
        ws.onmessage = (msg)=> { 
            console.log('接收服务端发过来的消息: %o', msg); 
            var msgJson = JSON.parse(msg.data);
            result += msgJson.MsgBody + '\n';
            if (msgJson.MsgCode == "999999") {//多设备在线的异常发生时;
                window.location.href = '/#/';
            } else if (msgJson.MsgCode == "555555") {//用户退出系统的时候;
                ws.close();
                window.location.href = '/#/';
            }
            alert(msgJson.MsgBody);
        }; 
        ws.onclose = function (e) {
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }
    
    
    render(){
        return <div>
            <h1>Hello</h1>
            <input type="button" value="connect" onClick={() => this.handleClicked()}/>
        </div>
    }

}

export default WebChatTest;