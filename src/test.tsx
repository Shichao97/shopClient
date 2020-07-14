import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import './MyAccount.css';
import {
  
  Button,
  Table, Tag, Space
} from 'antd';
//import LoginModal from './LoginModal';
import conf from './Conf'

const $ = jquery;


export default class MyAccount extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            url:"",
            page:{"content":[]},
            gotoPage:1,
            flag:0,
        }
    }
    columns = [
      {
        title: 'Order No.',
        dataIndex: 'orderNo',
        key: 'orderNo',
      },
      {
        title: 'Image',
        key: 'image',
        render: (text:any, record:any) => (
          <a onClick={()=>this.showOrderInfo(record.id)}>
            <img src={window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+record.goodsId}      />  
    
          </ a>
    
        ),
      },
      {
        title: 'Seller Info',
        key: 'seller_info',
        render:(text:any, record:any) => (
          <div><img src={window.localStorage.getItem("host_pre")+"member/geticon?Id="+record.sellerId+"&size=0"}/> &nbsp;
          <span>{record.sellerName}</span>
          </div>
          
        )
      }
    ]

    showOrderInfo(rid:number){
      this.props.history.push("/showOrderInfo/"+rid);
    }

    loadData(pageNo?:number) {
      
        let _this:MyAccount = this;
        let newUrl:string = "";
        if(pageNo != undefined){
          newUrl = _this.state.url;
          //newUrl = searchUrl;
          newUrl = newUrl+ "&pageNo="+pageNo;
         
        }else{
          newUrl = _this.state.url;
          //newUrl = searchUrl;
        }
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
              _this.setState({page:data,gotoPage:data.number+1});
              _this.setState({flag:1});
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

    handleSearchNotPaid(){
        let _this: MyAccount = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "&searchStatus=notPaid";
        let plusnew:string = "&pageSize=5";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSearchNotFinished(){
        let _this: MyAccount = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "&searchStatus=notFinished";
        let plusnew:string = "&pageSize=5";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSearchAll(){
        let _this: MyAccount = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "";
        let plusnew:string = "&pageSize=5";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    getpayment(status:number):string{
        if(status == 0) return "not yet paid";
        else return "already paid";
    }

    handlePreviousPage(){
        let _this: MyAccount = this;
        let page:any = _this.state.page;
        let pn:number = page.number;
        pn -= 1;
        
        let totalPages = page.totalPages;
        if(pn > (-1)){
          _this.loadData(pn);
        }
      }
  
    handleNextPage(){
    let _this: MyAccount = this;
    let page:any = _this.state.page;
    let pn:number = page.number;
    pn += 1;
    
    let totalPages = page.totalPages;
    if(pn<totalPages){
        _this.loadData(pn);
    }
    
    }

    handleGoto(){
    let page:any = this.state.page;
    let totalPages = page.totalPages;
    let pn:number = this.state.gotoPage;
    this.loadData(pn-1);
    }

    handleChange = (event:any) =>  {
        
        switch(event.target.name){
          case "gotoPage":
            let page:any = this.state.page;
            let totalPages = page.totalPages;
            if(event.target.value >= 1 && event.target.value <=totalPages){
                this.setState({gotoPage: event.target.value});
            }
            break;
         
        }
      }

    render(){
        let page:any = this.state.page;
        let arry:any[] = page.content;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let username:string = cf.getCookie("username");
        let iconSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+uid+"&size=1";
        
        return(
            <div>
               <Button type="default" size='large' onClick={()=>this.handleSearchNotPaid()}>not paid</Button>&nbsp;&nbsp;&nbsp;&nbsp;
               <Button type="default" size='large' onClick={()=>this.handleSearchNotFinished()}>not finished</Button>&nbsp;&nbsp;&nbsp;&nbsp;
               <Button type="default" size='large' onClick={()=>this.handleSearchAll()}>All Orders</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                
              <Table dataSource={arry} columns={this.columns} />;
            </div>
        )
    }
}