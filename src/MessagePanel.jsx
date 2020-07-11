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

    initMsg(toId,toName){
      if(this.state.toId === toId) return;
      this.state.msgs=[];
      this.setState({toId:toId,toName:toName});
      let uid = window.getCookie("userId");
      let ws = window.ws;
      ws.send(JSON.stringify({ flag: "msg_init",toId: toId}));
      let result = "";
      document.addEventListener('keypress', this.handleKeyDown);
      if(this.state.toId !== undefined) return;
      //ws.onmessage = (msg) => {
      ws.addEventListener('message', (msg) => {
        console.log('MessagePanel: ', msg);
        var msgJson = JSON.parse(msg.data);
        var winWs = window.ws;

        result += msgJson.MsgBody + '\n';
        if(msgJson.flag == "msg_init") {//MainPanel init
            if(msgJson.fromId == uid || msgJson.toId == uid){
                this.state.msgs.push(msgJson);
                this.setState({});
            }
        }
        if(msgJson.flag == "msg_inited") {//MainPanel init ended
            //TODO enable send commond
            ws.send(JSON.stringify({ flag: "msg_readAll",otherId: this.state.toId}));
            this.setState({});
        }
        else if (msgJson.flag == "msg") {
            if(msgJson.fromId == uid || msgJson.toId == uid){
                this.state.msgs.push(msgJson);
                if(msgJson.toId == uid){
                    ws.send(JSON.stringify({ flag: "msg_read",otherId: this.state.toId}));
                }
                this.setState({});
            }
        }

      });
      

    }
    
    

    handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            this.sendout();
        }
    }

    sendout() {
        let ws = window.ws;
        let uid = window.getCookie("userId");
        if(this.state.toId !== undefined){
            var s = document.getElementById("panel_text").value;
            if(s.length>255){
                alert("Words is too long! Please be less than 255.");
            }
            else{
                ws.send(JSON.stringify({ flag: 'msg', content: s , toId: this.state.toId, toName:this.state.toName}));
                document.getElementById("panel_text").value = ""
            }
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
            <Button type="default" size="middle" onClick={() => this.sendout()} >Send</Button>       
            </div>      
      </div>
    );
  }
//}
}

