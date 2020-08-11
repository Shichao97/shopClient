import React from 'react';
//import ReactDOM from 'react-dom';
//import { HashRouter as Router, Link, Route, NavLink } from 'react-router-dom';
//import Login from './Login';
import { Button, Row, Col,Badge } from 'antd'
import MessagePanel from './MessagePanel';
import conf from './Conf'

var ws;

//show chat member list
class ChatMemberList extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.location==undefined||this.props.location.state==undefined) {
            this.props.history.push("/")
            return;
        }  
        this.state = {mesState:this.props.location.state.mesState};
    }


    componentWillMount() {
        let ws = window.ws;
        if(ws === undefined){
            this.props.history.push("/");
            return;
        }
        let uid = conf.getCookie("userId");
        ws.send(JSON.stringify({ flag: "msg_init",toId: uid}));
        let result = "";
        ws.addEventListener('message', (msg) => {
          console.log('MessageList: ', msg);
          this.setState({});
  
        });
    }

    memberClicked(element){
        this.setState({toId:element.otherId,toName:element.otherName});
        this.refs.msgPanel.initMsg(element.otherId,element.otherName);
    }

    render() {
        //var win = window;
        let uid = conf.getCookie("userId");
        let username = conf.getCookie("username");
        if(this.state==undefined) return <div></div>
        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.toId+"&size=0";
        let title = this.state.toId == undefined?<div>Select chat member</div>:<div><div className="circleIcon_small">
            <img src={memberImgSrc}/> </div>
            &nbsp; {this.state.toName}
            </div>
        // let sm = this.state.mesState.sysMember;
        // let sysRow=""
        // if(sm != undefined){
        //     let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+sm.fromId+"&size=1";
        //     sysRow = <Row ><Col span={24} className="gutter-box" onClick={()=>this.memberClicked(sm)} ><div className="circleIcon_middle"><img src={memberImgSrc}/></div>
        //     <Badge count={sm.count==0?"":""+sm.count} offset={[10, 0]} >   {sm.otherName}  </Badge> </Col></Row>

        // }
        return <div>
        
        <div className='chat_body'>
        {title}
        <div className='chat_left'>
        
        
        {this.state.mesState.chatMembersArr.map((element,index) =>{
                let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.fromId+"&size=0";

                return <Row ><Col span={24} className={element.otherId==1?"gutter-box-sys":"gutter-box"} onClick={()=>this.memberClicked(element)} ><div className="circleIcon_small"><img src={memberImgSrc}/></div>
                
                <Badge count={element.count==0?"":""+element.count} offset={[10, 0]} >   &nbsp;{element.otherName}  </Badge> </Col></Row>
            })}


            
        </div>
        <div className='chat_right'>
        <MessagePanel ref="msgPanel"/>
        </div>


                  
            

        </div>
        </div>
    }




}

export default ChatMemberList;