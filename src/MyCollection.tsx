import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button
} from 'antd';
import jquery from "jquery";
import conf from './Conf'
import { Console } from 'console';

const $ = jquery;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
    sm: {
        span: 16,
        offset: 8,
      },
    },
  };

export default class MyCollection extends React.Component<any,any>{
    pageSize:number;
    constructor(props:any){
        super(props);
        this.state={
        }
        this.pageSize=2;
    }

    routeName = "/myCollection";
    params:any;

    loadData(pageNo?:number) {
        let uid = conf.getCookie("userId");
        let uname = conf.getCookie("username");
        let plus = conf.getQueryStrFromObj(this.params);
        let _this = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?" + plus;

        console.log(newUrl);
        $.ajax({
          type:"GET",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:newUrl,
          dataType:"json",
          success:function(data){
            var arr:any[] = [];
            var member = {id:uid,userName:uname}
            data.content.forEach((element:any) => {
              arr.push({g:element,m:member});
            });
            data.content = arr;
              _this.setState({page:data,gotoPage:data.number+1});
              //_this.setState({flag:1});
          },
          error: function(xhr:any, textStatus, errorThrown){
              console.log("request status:"+xhr.status+" msg:"+textStatus)
              if(xhr.status=='604'){//未登录错误
                  let popwin: any = conf.loginWin;
                  popwin.setState({modalIsOpen:true})
              }
              
          }
        })
          
    }
    handleSearchCollection(){

        let _this = this;
        let uid:string = conf.getCookie("userId");
        this.params = {uid:uid,pageSize:this.pageSize};

        let qs = conf.getQueryStrFromObj(this.params);
        this.props.history.push(this.routeName+"/"+qs);
    }
    render(){
         return(
            <Button type="default" size='large' onClick={()=>this.handleSearchCollection()}>All Collections</Button>

         )
    }
}