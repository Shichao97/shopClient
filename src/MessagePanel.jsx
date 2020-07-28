import React from 'react';
//import Modal from 'react-modal';

//import { render } from '@testing-library/react';
import jquery from "jquery";
import { Button , Row , Col, Tooltip, Spin,Modal} from 'antd'
//import { SmileOutlined } from '@ant-design/icons';
import conf from './Conf'


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
      let uid = conf.getCookie("userId");
      let ws = window.ws;
      ws.send(JSON.stringify({ flag: "msg_init",toId: toId}));
      let result = "";
      
      this.setState({loading:true});

      if(this.state.toId !== undefined) return;
      


      ws.addEventListener('message', (msg) => {
        console.log('MessagePanel: ', msg);
        var msgJson = JSON.parse(msg.data);
        var winWs = window.ws;

        result += msgJson.MsgBody + '\n';
        if(msgJson.flag == "msg_init") {//MainPanel init
            if(msgJson.fromId == uid || msgJson.toId == uid){
                this.state.msgs.push(msgJson);
                //this.setState({});
            }
        }
        if(msgJson.flag == "msg_inited") {//MainPanel init ended
            //TODO enable send commond
            ws.send(JSON.stringify({ flag: "msg_readAll",otherId: this.state.toId}));
            this.setState({loading:false});

        }
        else if (msgJson.flag == "msg") {
            if(msgJson.fromId == uid || msgJson.toId == uid){
                this.state.msgs.push(msgJson);
                if(msgJson.toId == uid){
                    ws.send(JSON.stringify({ flag: "msg_read",msgId:msgJson.msgId,otherId: this.state.toId}));
                }
                this.setState({});
            }
        }

      });
      

    }
    
    componentDidMount(){
        document.addEventListener('keypress', this.handleKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            this.sendout();
        }
    }

    sendout() {
        let ws = window.ws;
        let uid = conf.getCookie("userId");
        if(this.state.toId !== undefined){
            var s = document.getElementById("panel_text").value;
            if(s.trim().length==0){
                document.getElementById("panel_text").value = ""
            }
            else if(s.length>255){
                //alert("Words is too long! Please be less than 255.");
                Modal.error({
                    title:'Error',
                    content:'The message is too long. You cannot enter more than 255 words!'
                  })
            }
            else{
                ws.send(JSON.stringify({ flag: 'msg', content: s , toId: this.state.toId, toName:this.state.toName}));
                document.getElementById("panel_text").value = ""
            }
        }
        else{
            Modal.info({title:"Can't chat to empty",content:"Please select a member from list on left side"})
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
        let uid = conf.getCookie("userId");
        let toId = this.state.toId;
        let lastTime=0;
        if(this.state.loading){
            return <div>
            <div className={this.state.toId==1?'chat_panel_sys':'chat_panel'} id="panel_div">
            <p/>&nbsp;<p/>&nbsp;<p/>&nbsp;<p/>&nbsp;<p/>
            <Spin/>
            </div>
            
            </div>
        }
        return (
        <div>
            <div className={this.state.toId==1?'chat_panel_sys':'chat_panel'} id="panel_div">
            
                {
                    this.state.msgs.map((element,index) => {
                        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                        if(element.fromId==uid){
                            let times = <p  className="centerd">{element.sendTime==undefined?"":new Date(element.sendTime).format("yyyy-MM-dd hh:mm")}</p>
                            let b = element.sendTime!=undefined && (element.sendTime-lastTime)/1000>120;
                            lastTime = element.sendTime;
                            return <div> 
                            {b?times:""}
                            

                            <p className="rightd">
                                <span className="rightd_h">
                                    <img src={memberImgSrc} />
                                </span>
                                <p className="speech right"> 
                                    {element.content} 
                                </p>
                               
                            </p>
                            
                            </div>
                        }
                        else{
                            let times = <p  className="centerd">{element.sendTime==undefined?"":new Date(element.sendTime).format("yyyy-MM-dd hh:mm")}</p>
                            let b = element.sendTime!=undefined && (element.sendTime-lastTime)/1000>120;
                            lastTime = element.sendTime;
                            return <div> 
                            {b?times:""}                            
                            <p className="leftd"> 
                                <span className="leftd_h">                           
                                    <img src={memberImgSrc} />                            
                                </span>                           
                                <p className="speech left">                             
                                    {element.content}                     
                                </p>                           
                           </p>
                           </div>
                        }
                    })
                    
                }

     
        </div>
        {this.state.toId == 1?<div></div>:
        <div className='chat_center'>
            <input type="text" id="panel_text" name="test" className="chat_input"/>
            <Button type="default" size="middle" onClick={() => this.sendout()} >Send</Button>       
            </div>      
        }
      </div>
    );
  }
//}
}

