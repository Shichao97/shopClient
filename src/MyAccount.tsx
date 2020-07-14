import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import './MyAccount.css';
import {
  
  Button
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
                <div><img src={iconSrc}/>&nbsp;&nbsp;{username}</div>
                <Button type="default" size='large' onClick={()=>this.handleSearchNotPaid()}>not paid</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="default" size='large' onClick={()=>this.handleSearchNotFinished()}>not finished</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="default" size='large' onClick={()=>this.handleSearchAll()}>All Orders</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <hr/>
                <table className="my-table">
                    <thead>
                        <tr>
                            <th className="td1">Order No.</th>
                            <th className="td1">image</th>
                            <th className="td1">Goods Name</th>
                            <th className="td1">price</th>
                            <th className="td1">Order time</th>
                            <th className="td1">payment status</th>
                            <th className="td1">Seller Info</th>
                        </tr>
                    </thead>
                    <tbody>
                    {arry.map((element:any) =>{
                      let sellerIcon:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+element.sellerId+"&size=0";
                      let payment:string = this.getpayment(element.paymentStatus);
                      let goodsImgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+element.goodsId;
                      let link1:string = "/showOrderInfo/"+element.id;
                      return(
                        <tr className="tr1">
                          
                          <td className="td1"><Link to={link1}>{element.orderNo}</Link></td>
                          <td className="td1"><Link to={link1}><img height="100px" width="100px" src={goodsImgSrc}/></Link> </td>
                          <td className="td1"><Link to={link1}>{element.goodsName}</Link></td>
                          <td className="td1">{element.orderPrice}</td>
                          <td className="td1">{element.orderTime}</td>
                          <td className="td1">{payment}</td>
                          <td className="td1"><img src={sellerIcon}/> &nbsp; {element.sellerName}</td>
                          
                        </tr>
                      )
                    }

                    )}
                    </tbody>
                </table>
                <Button type="default" onClick={()=>this.handlePreviousPage()}>previous page</Button>
                <Button type="default" onClick={()=>this.handleNextPage()}>next page</Button><br />  <br />

               
                <input type="number" name="gotoPage" value={this.state.gotoPage} placeholder="please enter a page number" onChange={this.handleChange}/>
                <Button type="default" onClick={()=>this.handleGoto()}>Go</Button><br />  <br />

        
            </div>
        )
    }
}