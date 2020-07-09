import React,{useState} from 'react';
import Modal from 'react-modal';
import './MessagePanel.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
import { Button, Row, Col } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
//import { stringify } from 'querystring';
const $ = jquery;



//{
  //Modal.setAppElement('#root')
  export default class  MessagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {msgs:[]}
    }

    init(toId,toName){
      let ws = window.ws;
      this.state.toId = toId;
      this.state.toName = toName;
      let uid = window.getCookie("userId");
      ws.send(JSON.stringify({ flag: "msg_init",toId: uid}));
      let result = "";
      ws.onmessage = (msg) => {
        console.log('MessagePanel: ', msg);
        var msgJson = JSON.parse(msg.data);
        var winWs = window.ws;

        result += msgJson.MsgBody + '\n';
        if(msgJson.flag == "msg_init") {//MainPanel init
            if(msgJson.fromId == this.state.fromId){
                this.state.msgs.push(msgJson);
                this.setState({});
            }
        }
        else if (msgJson.flag == "msg") {
            if(msgJson.fromId == this.state.fromId){
                this.state.msgs.push(msgJson);
                this.setState({});
            }
        }

      };
      document.addEventListener('keypress', this.handleKeyDown);

    }
    
    

    handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            this.sendout();
        }
    }

    sendout() {
        let ws = window.ws;
        let uid = window.getCookie("userId");
        if(this.toId !== undefined){
            var s = document.getElementById("panel_text").value;
            ws.send(JSON.stringify({ flag: 'msg', content: s ,fromId:uid, toId: this.state.toId}));
            document.getElementById("msgtext").value = ""
        }
    }

    scrollbottom() {
        var ele = document.getElementById('panel_div');
        ele.scrollTop = ele.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollbottom();
    }
    render(){
        let uid = window.getCookie("userId");
        return (
        <div>
            <div className='chat_panel' id="panel_div">
                {
                    this.state.msgs.map((element,index) => {
                        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                        if(element.fromId==uid){
                            return <p className="rightd">
                                <span className="rightd_h">
                                    <img src={memberImgSrc} />
                                </span>
                                <p className="speech right"> 
                                    {element.content}
                                </p>
                            </p>
                        }
                        else{
                            return <p className="leftd"> 
                                <span className="leftd_h">                           
                                    <img src={memberImgSrc} />                            
                                </span>                           
                                <p className="speech left">                             
                                    {element.content}                         
                                </p>                           
                           </p>
                        }
                    })
                    
                }

     
        </div>
        <div className='chat_center'>
            <input type="text" id="panel_text" name="test" className="chat_input"/>
            <input type="button" value="Send" onClick={() => this.sendout()} />       
            </div>      
      </div>
    );
  }
//}
}

