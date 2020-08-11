import React,{useState} from 'react';
import Modal from 'react-modal';
//import './App.css';
//import { render } from '@testing-library/react';
import jquery from "jquery";
//import { Button, Row, Col } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import MessagePanel from './MessagePanel';
//import { stringify } from 'querystring';
const $ = jquery;



//{
  //Modal.setAppElement('#root')
  export default class  MessageModal extends React.Component{
      constructor(props){
          super(props);
          this.state={
            modalIsOpen:false,msgs:[],
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
    
      // Get the coordinates of title, the coordinates of Title, and the displacement of the two when the mouse clicks Title
    
      getPosition (e) {
    
        // The titleDom element 
    
        const titleDom = e.target
    
        // The coordinates of titleDom
    
        const X = titleDom.getBoundingClientRect().left
    
        // Since the Y-axis scroll bar appears, we need to store the relative position of the page in line with the mouse
    
        const Y = document.getElementsByClassName('group')[0].offsetTop
    
    
    
        // mouse click coordinates
    
        let mouseX = e.pageX
    
        let mouseY = e.screenY
    
        // Mouse click position with modal displacement
    
        const diffX = mouseX - X
    
        const diffY = mouseY - Y
    
        return {X, Y, mouseX, mouseY, diffX, diffY}
    
      }
    
     
    
      /**
    
       * Mouse down, set modal state to movable, and register the mouse movement event
    
       * Calculate the difference between the position of the pointer and the modal position and when the mouse is pressed down
    
       **/
    
      onMouseDown (e) {
    
        const position = this.getPosition(e)
    
        window.onmousemove = this.onMouseMove
    
        window.onmouseup = this.onMouseUp
    
        this.setState({moving: true, diffX: position.diffX, diffY: position.diffY})
    
      }
    
     
    
      // Release the mouse and set modal state to immovable
    
      onMouseUp (e) {
    
        const { moving } = this.state
    
        moving && this.setState({moving: false});
    
      }
    
     
    
      // Move the mouse around to reset the modal
    
      onMouseMove (e) {
    
        const {moving, diffX, diffY} = this.state
    
        if (moving) {
    
          // Gets mouse position data
    
          const position = this.getPosition(e)
    
          // Calculate the coordinates that modal should move to with the mouse
    
          const x = position.mouseX - diffX
    
          const y = position.mouseY - diffY
    
          // Window size, structural constraints, need to be adjusted, minus sidebar width
    
          const { clientWidth, clientHeight } = document.documentElement
    
          const modal = document.getElementsByClassName("group")[0]
    
          if (modal) {
    
            // Compute the maximum value of the modal coordinates
    
            const maxHeight = clientHeight - modal.offsetHeight
    
            const maxWidth = clientWidth - modal.offsetWidth
    
            // Judge that the final position of modal, must not go beyond the browser visible window
    
            const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0
    
            const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0
    
            this.setState({pageX: left, pageY: top})
    
          }
    
        }
    
      }

      handleAfterOpenFunc = () => {

        console.log('open~'+this.state.toId)
        //this.refs.msgPanel.state = {toId:this.state.toId,toName:this.state.toName,msgs:[]};
        this.refs.msgPanel.initMsg(this.state.toId,this.state.toName);
      }      

      handleCancel=()=>{
        this.setState({modalIsOpen:false})
      // this.refs.msgPanel.setState({toId:this.state.toId,toName:this.state.toName});
      // this.refs.msgPanel.initMsg(this.state.toId,this.state.toName);
    }

    // componentDidMount(){
    //   if(this.state.toId !== undefined){
    //     this.refs.msgPanel.init(this.state.toId,this.state.toName);
    //   }
    // }


    render(){
        let { pageX, pageY, diffX, diffY } = this.state
        let memberImgSrc = window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.toId+"&size=1";

    return (
      <div>
          <Modal className="demo234"  isOpen={this.state.modalIsOpen} 
          onRequestClose={() => this.setState({modalIsOpen:false})} 
          onAfterOpen={this.handleAfterOpenFunc}>
          <div
          className='group'

          style={{
          
          left: pageX,
          
          top: pageY
          
          }}>

            <div className='group_head'

            onMouseDown={this.onMouseDown}

            >

            <CloseOutlined  type="cross" className='group_head_close' onClick={this.handleCancel} />
            <div className="circleIcon_middle"><img src={memberImgSrc}/></div> {this.state.toName}
            </div>                  

              <MessagePanel ref="msgPanel"/>

            </div>
          </Modal>
      </div>
    );
  }
//}
}

