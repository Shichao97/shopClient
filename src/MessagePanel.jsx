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

    componentDidMount(){
      var ws = window.ws;
    }


    render(){

    return (
      <div>
            <div className='chat_panel' id="msgdiv">
                {
                    this.state.msgs.map(function (m) {
                        return <span>{m.data}<p></p></span>
                    })
                    
                }
<p className="leftd">
 
 <span className="leftd_h">

     <img src="./img/c_pic.pn" />

 </span>

 <p className="speech left"> 

     二货，你看你傻样！

 </p>

</p>

<p className="rightd">

 <span className="rightd_h">

     <img src="./img/u_pic.pn" />

 </span>

 <p className="speech right"> 

     嘻嘻嘻嘻。。。。。。

 </p>

</p>

<p className="leftd">

 <span className="leftd_h">

     <img src="./img/c_pic.pn" />

 </span>

 <p className="speech left"> 

     笑什么笑，没看到本宝宝今天变漂亮了吗？

 </p>

</p>

<p className="rightd">

 <span className="rightd_h">

     <img src="./img/u_pic.pn" />

 </span>

 <p className="speech right"> 

      不不不，每天你都很漂亮的啦！

 </p>

</p>

<p className="leftd">
 
 <span className="leftd_h">

     <img src="./img/c_pic.pn" />

 </span>

 <p className="speech left"> 

     二货，你看你傻样！

 </p>

</p>

<p className="rightd">

 <span className="rightd_h">

     <img src="./img/u_pic.pn" />

 </span>

 <p className="speech right"> 

     嘻嘻嘻嘻。。。。。。

 </p>

</p>

<p className="leftd">

 <span className="leftd_h">

     <img src="./img/c_pic.pn" />

 </span>

 <p className="speech left"> 

     笑什么笑，没看到本宝宝今天变漂亮了吗？

 </p>

</p>

<p className="rightd">

 <span className="rightd_h">

     <img src="./img/u_pic.pn" />

 </span>

 <p className="speech right"> 

      不不不，每天你都很漂亮的啦！

 </p>

</p>
     
        </div>
        <div className='chat_center'>
            <input type="text" id="msgtext" name="test"/>
            <input type="button" value="send" onClick={() => this.sendout()} />       
            </div>      
      </div>
    );
  }
//}
}

