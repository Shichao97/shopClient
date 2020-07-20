import React,{useState} from 'react';
import Modal from 'react-modal';
//import './App.css';
//import { render } from '@testing-library/react';
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

    previous(){
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
    componentDidMount(){
        let _this = this;
        window.onresize = function(){
            _this.setState({});
        }
    }
    render(){
        if(this.state.modalIsOpen == false){
            return <div></div>
        }

        let modalWidth = document.body.clientWidth*.8;
        let modalHeight = document.body.clientHeight*.8;

        let n = this.state.index;
        let imgNames = this.state.imgNames;
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getGoodsBigImg?Id="+this.state.gid+"&fname="+imgNames[n];
    return (
      <div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({modalIsOpen:false})}>
              <div >
                <table><tbody>
                <tr>
                <td><input type="button" value="Previous" onClick={() => this.previous()} /></td>
                <td><img style={{width: modalWidth,height: modalHeight,objectFit: "contain"}} src={imgSrc} onClick={() => this.setState({modalIsOpen:false})}/></td>
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

