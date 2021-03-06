import React from 'react';
//import { Link } from 'react-router-dom';
import jquery from "jquery";
import './MyAccount.css';
import {
  Button,
  Table, Pagination, Modal, Badge, Spin
} from 'antd';
import{StopOutlined, CheckCircleOutlined, CarOutlined } from '@ant-design/icons';
//import LoginModal from './LoginModal';
import conf from './Conf'
//import { Console } from 'console';

const $ = jquery;

// show orders in all kinds of states
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
        let str = window.sessionStorage.getItem("table_pageSize");
        if(str != undefined) this.pageSize = parseInt(str);
        else this.pageSize=4;
    }

    routeName = "/myAccount";
    params:any={};

    //When enter the page in the first time
    componentWillMount(){
      
      
      let plus:string = conf.getUrlQueryString(this.routeName);
      this.params = conf.getQueryObjFromStr(plus);
      console.log("plus:"+plus);
      if(plus.indexOf("=")>0){
        this.loadData();
      }      
    }


    //used for inner push
    componentWillReceiveProps(nextProps:any){
      var str = nextProps.location.pathname;
      console.log("Hash changed to: "+str);
      if(str.indexOf("=")<0) return;
      let n = this.routeName.length;
      let plus = str.substr(n+1);
      this.params = conf.getQueryObjFromStr(plus);
      this.loadData();
    }


    columns = [
      {
        title: 'Order No.',
        render: (text:any,record:any) => {
          return (          
            record.order.orderNo          
        )},
        key: 'orderNo',
      },
      {
        title: 'Image',
        key: 'image',
        render: (text:any, record:any) =>{
          let n;
          return (
          <a onClick={()=>this.showOrderInfo(record.order.id)}>
            <img src={window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+record.goods.id+"&fname="+record.goods.imgNames.split(";")[0]}      />  
    
          </ a>
    
        )},
      },
      {
        title: 'Goods Name',
        key: 'goodsName',
        render: (text:any,record:any) => (
          <a onClick={()=>this.showOrderInfo(record.order.id)}>
            {record.goods.name}
          </a>
        )
      },
      {
        title: 'Price',
        render: (text:any,record:any) => (          
          "$"+record.order.orderPrice          
        ),
        key:'orderPrice',
      },
      {
        title: 'Order Time',
        render: (text:any,record:any) => (          
          (new Date(record.order.orderTime) as any).format("yyyy-MM-dd hh:mm")        
        ),
        key: 'orderTime',
      },
      {
        title: 'Status',
        //dataIndex: 'status',
        key: 'status',
        render: (text:any,record:any)=>{
          if(record.order.status == 1){
            return (
              <div><CheckCircleOutlined style={{color:'green',fontSize: '25px'}}/> Complete</div>
            )
          }else if(record.order.status == -1){
            return (
              <div><StopOutlined style={{color:'grey',fontSize: '25px'}}/> Canceled</div>
            )
          }else if(record.order.paymentStatus == 1){
            return (<div><CarOutlined style={{color:"peru",fontSize: '25px'}}/> In Progress</div>)
          }else{
            return (
              
                <a onClick={()=>this.props.history.push("/payment/"+record.order.id)}>
                  Pay Now
                </a>
            )
          }
          
        }
        
      },
      /* {
        title: 'Payment Status',
        dataIndex:'paymentStatus',
        key:'paymentStatus',
        render: (text:any )=> this.getpayment(text),
      },*/
      {
        title: 'Seller Info',
        key: 'seller_info',
        render:(text:any, record:any) => (
          <div><img src={window.localStorage.getItem("host_pre")+"member/geticon?Id="+record.goods.sellerId+"&size=0"}/> &nbsp;
          <span>{record.goods.sellerName}</span>
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

    componentDidMount(){
      let uid = conf.getCookie("userId")
      if(uid != "") this.loadCount();
    }

    loadCount() {
      
      let _this = this;
      _this.setState({countLoading:true})
      let newUrl:string = window.localStorage.getItem("host_pre")+"order/getCountOrder";
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
            _this.setState({countLoading:false})
            _this.setState({notPaidCount:data.notPaidCount,notFinishCount:data.notFinishCount});
            console.log("Load count success",data);
        },
        error: function(xhr:any, textStatus, errorThrown){
          _this.setState({countLoading:false})
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//not logged in error
                let popwin: any = conf.loginWin;
                popwin.setState({modalIsOpen:true})
            }
            
        }
      })
        
    }

    loadData() {
      
        let _this = this;
        _this.setState({loading:true})
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
            _this.setState({loading:false})
              _this.setState({page:data,gotoPage:data.number+1});
              _this.setState({flag:1});
          },
          error: function(xhr:any, textStatus, errorThrown){
            _this.setState({loading:false})
              console.log("request status:"+xhr.status+" msg:"+textStatus)
              if(xhr.status=='604'){//not log in error
                  let popwin: any = conf.loginWin;
                  popwin.setState({modalIsOpen:true})
              }
              
          }
        })
          
      }

    handleSearchNotPaid(){
      
        let _this = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "notPaid";
        let plusnew:string = "&pageSize="+this.pageSize;
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        let obj = {buyerId:uid,searchStatus:plus,pageSize:this.pageSize};
        let searchPlus = conf.getQueryStrFromObj(obj);
        this.props.history.push(this.routeName+"/"+searchPlus);
        
        
    }

    handleSearchNotFinished(){
        let _this = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "notFinished";
        let plusnew:string = "&pageSize="+this.pageSize;
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        let obj = {buyerId:uid,searchStatus:plus,pageSize:this.pageSize};
        let searchPlus = conf.getQueryStrFromObj(obj);
        this.props.history.push(this.routeName+"/"+searchPlus);
    }

    handleSearchAll(){
        let _this = this;
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
        let plus:string = "";
        let plusnew:string = "&pageSize="+this.pageSize;
        let searchUrl:string = window.localStorage.getItem("host_pre")+"order/searchOrder?buyerId="+uid+plus+plusnew;
      
        // _this.state={url:searchUrl};
        // _this.setState({url:searchUrl});
        // _this.loadData();
        let obj = {buyerId:uid,searchStatus:plus,pageSize:this.pageSize};
        let searchPlus = conf.getQueryStrFromObj(obj);
        this.props.history.push(this.routeName+"/"+searchPlus);
    }

    getpayment(status:number):string{
        if(status == 0) return "not yet paid";
        else return "already paid";
    }
    /*
    getStatus(status:number,pay:number):string{
      
      if(status == 0){
        return "not finished";
      }else if(status == 1){
        return "already finished";
      }else{
        return "already canceled";
      }
      
      if(status == 1){
        return "completed"
      }else if(status == -1){
        return "cancelled"
      }else if(pay == 1){
        return "On the Way"
      }else{
        return "paynow!!!"
      }
    }
    */
   
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
        let btns= <div>
            <h1>My Orders</h1>
           <Button type="default" size='large' loading={this.state.countLoading} disabled={this.state.loading} onClick={()=>this.handleSearchNotPaid()}>Not paid<Badge count={this.state.notPaidCount} offset={[0,-15]}/></Button>&nbsp;&nbsp;&nbsp;&nbsp;
           <Button type="default" size='large' loading={this.state.countLoading} disabled={this.state.loading} onClick={()=>this.handleSearchNotFinished()}>Not finished<Badge count={this.state.notFinishCount}  offset={[0,-15]}/></Button>&nbsp;&nbsp;&nbsp;&nbsp;
           <Button type="default" disabled={this.state.loading} size='large' onClick={()=>this.handleSearchAll()}>All Orders</Button>&nbsp;&nbsp;&nbsp;&nbsp;       
        </div>

        if(this.state.loading){
          return <div className="my-table">
            {btns}
            <p/>
            <Spin/>
            </div>
        }
        return(
            <div className='my-table'>
               {btns}
                
              {conf.getUrlQueryString(this.routeName).length>1?
              <Table style={{padding: '9px'}} dataSource={arry} columns={this.columns} pagination={ false } />:""}
              
              <Pagination  hideOnSinglePage={true} pageSize={this.pageSize} current={this.state.page.number+1} total={this.state.page.totalElements} onChange={this.pageChanged}/>
              
            </div>
        )
    }
}