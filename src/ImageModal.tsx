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

    preview(){
        let n = this.state.index;
        if(n>0){
            this.setState({index:n-1});
        }
    }
    next(){
        let n = this.state.index;
        if(n < this.state.imgNames.length-1){
            this.setState({index:n+1});
        }
    }


    render(){
        if(this.state.modalIsOpen == false){
            return <div></div>
        }


        let n = this.state.index;
        let imgNames = this.state.imgNames;
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getGoodsBigImg?Id="+this.state.gid+"&fname="+imgNames[n];
    return (
      <div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>
              <div className="center-img">
                <table><tbody>
                <tr>
                <td><input type="button" value="Preview" onClick={() => this.preview()} /></td>
                <td><img src={imgSrc} onClick={() => this.setState({modalIsOpen:false})}/></td>
                <td><input type="button" value="Next" onClick={() => this.next()} /></td>
                </tr>
                </tbody></table>
              </div>
          </Modal>
      </div>
    );
  }
//}
}

