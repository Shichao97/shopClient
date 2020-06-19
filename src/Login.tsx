import React,{useState} from 'react';
//import Modal from 'react-modal';
//import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom';
import jquery from "jquery";
//import { stringify } from 'querystring';
const $ = jquery;

//
//{
  //Modal.setAppElement('#root')
  class  Login extends React.Component<any,any>{
      constructor(props:any){
          super(props);
          //this.state={modalIsOpen:false};
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
          url:"http://localhost:8080/member/login",
          data:params,
          dataType:"json",
          success: function(data) {
              console.log(data)
              this.props.history.goBack()
          },
          error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
              //_this.props.listComp.refs.logwin.set
            }
             
          }
      })    
    }


    render(){
    //const [modalIsOpen, setModalIsOpen] = useState(false)  
    return (
      <div>
              <div className='demo'>
              
                
              <form id="log_form">
              <h2>Please login first!</h2><br/>
                  *username:<input type='text' name='userName'></input><br/><br/>
                  *password: <input type='password' name='passWord'></input><br/><br/>
                  <input type="button" value="Login" className="button" onClick={() => this.doLogin()}/><br/><br/><br/>
                  <input type="button" value="Back" onClick={() => this.props.history.goBack()}/>

              </form>
              </div>
              <div>
                  
              </div>
      </div>
    );
  }
//}
}

export default withRouter(Login)