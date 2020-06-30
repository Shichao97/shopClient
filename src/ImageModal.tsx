import React,{useState} from 'react';
import Modal from 'react-modal';
//import './App.css';
import { render } from '@testing-library/react';
import jquery from "jquery";
//import { stringify } from 'querystring';
const $ = jquery;

//
//{
  //Modal.setAppElement('#root')
  export default class  ImageModal extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          this.state={modalIsOpen:false};
      }

    close(){
        this.setState({modalIsOpen:false})
        //let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+gid+"&fname="+element;
    }


    render(){
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getGoodsBigImg?Id="+this.state.gid+"&fname="+this.state.fname;
    return (
      <div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>
              <div>
                <img src={imgSrc} />
              </div>
          </Modal>
      </div>
    );
  }
//}
}

