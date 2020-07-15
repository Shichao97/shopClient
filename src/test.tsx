import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import './MyAccount.css';
import {
  
  Button,
  Table, Tag, Space,Pagination
} from 'antd';
//import LoginModal from './LoginModal';
import conf from './Conf'

const $ = jquery;


export default class MyAccount extends React.Component<any,any> {
    pageSize:number;
    constructor(props:any){
        super(props);
        this.state={
            url:"",
            page:{"content":[]},
            gotoPage:1,
            flag:0,
        }
        this.pageSize=2;
    }

    routeName = "/searchGoods";
    params:any={};



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
        title: 'Goods Name',
        key: 'goodsName',
        render: (text:any,record:any) => (
          <a onClick={()=>this.showOrderInfo(record.id)}>
            {record.goodsName}
          </a>
        )
      },
      {
        title: 'Price',
        dataIndex: 'orderPrice',
        key:'orderPrice',
      },
      {
        title: 'Order Time',
        dataIndex: 'orderTime',
        key: 'orderTime',
      },
      {
        title: 'Payment Status',
        dataIndex:'paymentStatus',
        key:'paymentStatus',
        render: (text:any )=> this.getpayment(text),
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

    onChange(pageNumber:any) {
      console.log('Page: ', pageNumber);
    }

    showOrderInfo(rid:number){
      this.props.history.push("/showOrderInfo/"+rid);
    }

    loadData(pageNo?:number) {
      
        let _this = this;
        let plus = conf.getQueryStrFromObj(this.params);
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?"+plus;
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
        let plusnew:string = "&pageSize="+this.pageSize;//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        this.props.history.push("/_myAccount/"+"buyerId="+uid+plus+plusnew);
    }

    handleSearchNotFinished(){
        let _this: MyAccount = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "&searchStatus=notFinished";
        let plusnew:string = "&pageSize="+this.pageSize;//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        this.props.history.push("/_myAccount/"+"buyerId="+uid+plus+plusnew);
    }

    handleSearchAll(){
        let _this: MyAccount = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "&searchStatus=";
        let plusnew:string = "&pageSize="+this.pageSize;//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        this.props.history.push("/_myAccount/"+"buyerId="+uid+plus+plusnew);
    }

    getpayment(status:number):string{
        if(status == 0) return "not yet paid";
        else return "already paid";
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

    pageChanged=(pn:any)=>{
      var obj = this.params;
      obj.pageNo = pn;
      let plus = conf.getQueryStrFromObj(obj);
      this.props.history.push(this.routeName+"/"+plus);
    }
    
    render(){
        let page:any = this.state.page;
        let arry:any[] = page.content;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let username:string = cf.getCookie("username");
        let iconSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+uid+"&size=1";
        
        return(
            <div className='my-table'>
               <div><img src={iconSrc}/>&nbsp;&nbsp;{username}</div>
               <Button type="default" size='large' onClick={()=>this.handleSearchNotPaid()}>not paid</Button>&nbsp;&nbsp;&nbsp;&nbsp;
               <Button type="default" size='large' onClick={()=>this.handleSearchNotFinished()}>not finished</Button>&nbsp;&nbsp;&nbsp;&nbsp;
               <Button type="default" size='large' onClick={()=>this.handleSearchAll()}>All Orders</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                
              <Table dataSource={arry} columns={this.columns} pagination={ false }/>
              
              <Pagination pageSize={this.pageSize} current={this.state.page.number+1} total={this.state.page.totalElements} onChange={this.pageChanged}/>
              
            </div>
        )
    }
}