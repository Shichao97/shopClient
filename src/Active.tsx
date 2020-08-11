import React from 'react';
//import { Link } from 'react-router-dom';
import jquery from "jquery";
import { Spin } from 'antd';
const $ = jquery;


// Activate member account
export default class Active extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        let _this = this;
        let params:string = this.props.match.params.params;
        let newUrl:string = window.localStorage.getItem("host_pre")+"member/active?"+params;
        $.ajax({
            type:"GET",
            crossDomain: true, 
            xhrFields: {
                withCredentials: true 
            },
                url:newUrl,
            dataType:"json",
            success:function(data){
                if(data.success == 1){
                    _this.setState({actMsg:"Successfully activate your account, "+data.msg});
                }else{
                    _this.setState({actMsg:data.msg});
                }
            }
          })
    }


    render(){
        if(this.state.actMsg == undefined){
            return(
                <div>
                    <h2>You are in the process of activation now ...</h2>
                    <p/>
                    <Spin/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.state.actMsg}
                </div>
            )
        }
        
    }
}
