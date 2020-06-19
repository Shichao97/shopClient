import React from 'react';
import ReactDOM from 'react-dom';
//import WebSocket from './WebSocket';

var ws;

class WebChatTest extends React.Component {
    constructor() {
        super();
        this.state = { msgs: [] };
        this.taskRemindInterval = null;
    }


    handleClicked() {
        let wsUrl = 'ws://localhost:8080/myHandler';
        this.connectWithWS(wsUrl);
    }


    connectWithWS(wsUrl) {

        ws = new WebSocket(wsUrl);

        let result = "";

        ws.onopen = function (e) {
            console.log('连接上 ws 服务端了');
            ws.send(JSON.stringify({ flag: wsUrl, data: "Hello WebSocket!" }));
        }
        ws.onmessage = (msg) => {
            console.log('接收服务端发过来的消息: %o', msg);
            var msgJson = JSON.parse(msg.data);

            this.state.msgs.push(msgJson);
            this.setState({});

            result += msgJson.MsgBody + '\n';
            if (msgJson.MsgCode == "999999") {//多设备在线的异常发生时;
                window.location.href = '/#/';
            } else if (msgJson.MsgCode == "555555") {//用户退出系统的时候;
                ws.close();
                window.location.href = '/#/';
            }
            //alert(msgJson.data);
        };
        ws.onclose = function (e) {
            console.log('ws 连接关闭了');
            console.log(e);
        }
    }


    render() {
        var _this = this;
        return <div>
            <h1>Hello</h1>
            <input type="button" value="connect" onClick={() => this.handleClicked()} />

            <div className='demo' id="msgdiv">
                {
                    _this.state.msgs.map(function (m) {
                        return <span>{m.data}<p></p></span>
                    })

                }

            </div>
            <input type="text" id="msgtext" name="test"/>
            <input type="button" value="send" onClick={() => this.sendout()} />
        </div>
    }


    componentDidMount() {
        //组件挂载时候，注册keypress事件
        document.addEventListener('keypress', this.handleKeyDown)
    }

    handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            this.sendout();
        }
    }

    sendout() {
        var s = document.getElementById("msgtext").value;
        ws.send(JSON.stringify({ flag: 'us', data: s }));
        document.getElementById("msgtext").value = ""

    }
    scrollbottom() {
        var ele = document.getElementById('msgdiv');
        ele.scrollTop = ele.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollbottom();
        /*
                document.getElementById("msgtext").keydown(function(e) {  
                    if (e.keyCode == 13) { 
                         this.sendout();   
                    }  
           
                })   */
    }

}

export default WebChatTest;