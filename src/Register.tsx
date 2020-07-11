import React from 'react';
import jquery from "jquery";
import './Register.css';
const $ = jquery;



export default class Register extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            un:"",
            pw:"",
            em:"",
            con:"",
            un_msg:"",
            pw_msg:"",
            em_msg:"",
            confirm_msg:"",
            msg:""
        }
    }
    checkPassword(passWord:string):boolean{
        let reg:any = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$");
        let f:boolean = reg.test(passWord);
        return f;
    }
    checkUsername(userName:string):boolean{
        let reg:any = new RegExp("^\\w{3,32}$");
        let f:boolean = reg.test(userName);
        return f;
    }
    checkEmail(email:string):boolean{
        //let reg:any = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$");
        let reg:any = new RegExp("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$");
        let f:boolean = reg.test(email);
        return f;
    }
    handleRegister(){
        //this.setState({});
        let un:string = this.state.un;
        if(!this.checkUsername(un)){
            this.setState({un_msg:"Your username is of wrong format!"});
            return;
        }
        
        let pw:string = this.state.pw;
        if(!this.checkPassword(pw)){
            this.setState({pw_msg:"Your password is of wrong format!"});
            return;
        }
        let con:string = this.state.con;
        if(pw != con){
            this.setState({confirm_msg:"Not the same password as before!"});
            return;
        }
        let em:string = this.state.em;
        if(!this.checkEmail(em)){
            this.setState({em_msg:"Your email is of wrong format!"});
            return;
        }

        let _this: Register = this;
        let data= $("#registerForm").serializeArray();
        $.ajax({
            type:"POST",
            url:window.localStorage.getItem("host_pre")+"member/register",
            data:data,
            dataType:"json",
            success:function(d){
                _this.setState({msg:"register success!"});
            },error:function(xhr:any,textStatus,errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus);
                if(xhr.status=='601'){
                    _this.setState({msg:"register failed!"+"request status:"+xhr.status+" msg:"+textStatus});
                }
              }
        })
    }
    render(){
        return(
            <div>
                <h2>Welcome to our website, please regsiter first!</h2>
                <form method="post" id="registerForm" className="Form.useForm">
                    <table className="content-table">
                        <tr>  
                            <td>  
                                *userName：<input name="userName" id="un" type="text" value={this.state.un} onChange={this.handleChange}/>
                            </td> 
                            <td className="error_msg">
                                {this.state.un_msg}
                            </td>
                        </tr>
                        
                        <tr>  
                            <td>  
                                *passWord：<input name="passWord" id="pw" type="password" value={this.state.pw} onChange={this.handleChange}/>
                            </td> 
                            <td className="error_msg">
                                {this.state.pw_msg}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                *Confirm password: <input name="confirm" id="con" type="password" value={this.state.con} onChange={this.handleChange}/>
                            </td>
                            <td className="error_msg">
                                {this.state.confirm_msg}
                            </td>
                        </tr>
                        <tr>  
                            <td >  
                                *email：<input name="email" type="text" id="em" value={this.state.em} onChange={this.handleChange}/>
                            </td> 
                            <td className="error_msg">
                                {this.state.em_msg}
                            </td>
                        </tr>
                        
                        <tr> 
                            <td>  
                                <button name="regsiter" id='regsiter' type="button" onClick={() => this.handleRegister()}>register</button>
                            </td>  
                        </tr> 
                        
                    </table>
                </form>

                <div className="error_msg">{this.state.msg}</div>
            </div>
        )
    }

    handleChange = (event:any) =>  {
        
        switch(event.target.name){
          case "userName":
            this.setState({un: event.target.value});
            this.setState({un_msg:""});
            break;
          case "passWord":
            this.setState({pw: event.target.value});
            this.setState({pw_msg:""});
            
            break;
          case "confirm":
            this.setState({con: event.target.value});
            this.setState({confirm_msg:""});
            break;
          case "email":
            this.setState({em: event.target.value});
            this.setState({em_msg:""});
            break;
          default: break;
        }
        //console.log(this)
    }
}