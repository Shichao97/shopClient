import React,{useState} from 'react';
import Modal from 'react-modal';
//import './App.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
import { Button, Row, Col } from 'antd'
import { SmileOutlined,HomeOutlined } from '@ant-design/icons';
//import { stringify } from 'querystring';
const $ = jquery;



//{
  //Modal.setAppElement('#root')
  export default class  MessageModal extends React.Component{
      constructor(props){
          super(props);
          this.state={modalIsOpen:false,
            pageX: '50%',
    
            pageY: '80px',
      
            diffX: '',
      
            diffY: '',
      
            moving: false
        };
      



    
         this.getPosition = this.getPosition.bind(this)
    
         this.onMouseDown = this.onMouseDown.bind(this)
    
         this.onMouseUp = this.onMouseUp.bind(this)
    
         this.onMouseMove = this.onMouseMove.bind(this)
    
      }
    
      // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
    
      getPosition (e) {
    
        // 标题DOM元素titleDom
    
        const titleDom = e.target
    
        // titleDom的坐标(视窗)
    
        const X = titleDom.getBoundingClientRect().left
    
        // 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
    
        const Y = document.getElementsByClassName('group')[0].offsetTop
    
    
    
        // 鼠标点击的坐标(页面)
    
        let mouseX = e.pageX
    
        let mouseY = e.screenY
    
        // 鼠标点击位置与modal的位移
    
        const diffX = mouseX - X
    
        const diffY = mouseY - Y
    
        return {X, Y, mouseX, mouseY, diffX, diffY}
    
      }
    
     
    
      /**
    
       * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
    
       * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
    
       **/
    
      onMouseDown (e) {
    
        const position = this.getPosition(e)
    
        window.onmousemove = this.onMouseMove
    
        window.onmouseup = this.onMouseUp
    
        this.setState({moving: true, diffX: position.diffX, diffY: position.diffY})
    
      }
    
     
    
      // 松开鼠标，设置modal状态为不可移动
    
      onMouseUp (e) {
    
        const { moving } = this.state
    
        moving && this.setState({moving: false});
    
      }
    
     
    
      // 鼠标移动重新设置modal的位置
    
      onMouseMove (e) {
    
        const {moving, diffX, diffY} = this.state
    
        if (moving) {
    
          // 获取鼠标位置数据
    
          const position = this.getPosition(e)
    
          // 计算modal应该随鼠标移动到的坐标
    
          const x = position.mouseX - diffX
    
          const y = position.mouseY - diffY
    
          // 窗口大小，结构限制，需要做调整，减去侧边栏宽度
    
          const { clientWidth, clientHeight } = document.documentElement
    
          const modal = document.getElementsByClassName("group")[0]
    
          if (modal) {
    
            // 计算modal坐标的最大值
    
            const maxHeight = clientHeight - modal.offsetHeight
    
            const maxWidth = clientWidth - modal.offsetWidth
    
            // 判断得出modal的最终位置，不得超出浏览器可见窗口
    
            const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0
    
            const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0
    
            this.setState({pageX: left, pageY: top})
    
          }
    
        }
    
      }





    doLogin(){
      let _this = this
      let params = $("#log_form").serializeArray();
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:window.localStorage.getItem("host_pre")+"member/login",
          data:params,
          dataType:"json",
          success: function(data) {
              console.log(data)
              if(data.success == 1){
                _this.setState({modalIsOpen:false});
              }
              else if(data.success==0){
                alert(data.msg);
              }

          },
          error: function(xhr, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
              console.log("Login Error")
            }
             
          }
      })    
    }


    render(){
        let { pageX, pageY, diffX, diffY } = this.state

    return (
      <div>
          <Modal  className='demo' isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>
          <div

            className='group'

            style={{

            left: pageX,

            top: pageY

            }}>

            <div className='group_head'

            onMouseDown={this.onMouseDown}

            >

            <HomeOutlined className='group_head_close' onClick={this.handleCancel} />

            集团标品信息

            </div>                  
            <form id="log_form">
              <h2>Please login first!</h2><br/>
                  *username:<input type='text' name='userName'></input><br/><br/>
                  *password: <input type='password' name='passWord'></input><br/><br/>
                  <input type="button" value="Login" className="button" onClick={() => this.doLogin()}/><br/><br/><br/>
                  <button className="button" onClick={() => this.setState({modalIsOpen:false})}>Close</button>
              </form>          </div>

          </Modal>
      </div>
    );
  }
//}
}

