import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import {
    Row,
    Col,
    Button,
    Modal,
    Tooltip,
  } from 'antd';
import conf from './Conf';
import './MyAccount.css';
const $ = jquery;

//When you click on order for details
export default class ShowOrderInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/getOGById?orderId="+oid;
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
                _this.setState({orderdata:data});
                if(data==null)
                    Modal.error({
                    title:'Error',
                    content:"No order found. Because a wrong orderId or the order is deleted"
                  })
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//not logged in error
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }
    getReceiveMethod(m:number):string{
        if(m == 1){
            return "shipping";
        }else if(m == 2){
            return "self-pick";
        }else if(m == 4){
            return "home-dilivery";
        }else{
            return "";
        }
    }
    confirmPay(){
        Modal.confirm({
            title: 'Confirm pay?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handlePay()
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handlePay(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/payOrder?orderId="+oid;
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
                if(data.success == 0){
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Payment Success!'
                    })
                    let datas = _this.state.orderdata;
                    datas.order.paymentStatus = 1;
                    _this.setState({orderdata:datas});
                    
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//not logged in error
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }
    confirmCancel(){
        Modal.confirm({
            title: 'Confirm cancel?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handleCancel();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleCancel(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/cancelOrder?id="+oid;
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
                if(data.success == 0){
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                    })
                }
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Cancel Success!'
                    })
                    // let datas = _this.state.orderdata;
                    // datas.order.status = -1;
                    // _this.setState({orderdata:datas});
                    _this.props.history.goBack();
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//not logged in error
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          })
    }
    confirmConfirm(){
        Modal.confirm({
            title: 'Confirm received?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Wait and see',
            onOk: () => {
                this.handleConfirm();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleConfirm(){
        let oid = this.props.match.params.oid;
        let _this:ShowOrderInfo = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"order/completeOrder?orderId="+oid;
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
                if(data.success == 0){
                    //alert(data.msg);
                    Modal.error({
                        title:'Error',
                        content:data.msg
                      })
                }
                else if(data.success == 1){
                    Modal.success({
                        title:'Success',
                        content:'Confirm Success!'
                    })
                    let datas = _this.state.orderdata;
                    datas.order.status = 1;
                    _this.setState({orderdata:datas});
                }
            },
            error: function(xhr:any, textStatus, errorThrown){
                console.log("request status:"+xhr.status+" msg:"+textStatus)
                if(xhr.status=='604'){//not logged in error
                    let popwin: any = conf.loginWin;
                    popwin.setState({modalIsOpen:true})
                }
                
            }
          }) 
    }
    getpayment(status:number):string{
        if(status == 0) return "not yet paid";
        else return "already paid";
    }

    getStatus(status:number):string{
      
        if(status == 0){
          return "not finished";
        }else if(status == 1){
          return "already finished";
        }else{
          return "already canceled";
        }
    }
    onSellerClicked(ele:any){
        let popwin: any = conf.msgWin;
        popwin.setState({modalIsOpen:true,toId:ele.sellerId,toName:ele.sellerName});
  
        
    }

    render(){
        let orderdata:any = this.state.orderdata;
        if(orderdata == undefined){
            return(
                <div></div>
            )
        }
        let goodsImgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+orderdata.goods.id+"&fname="+orderdata.goods.imgNames.split(";")[0];
        let receiveMethod:string = this.getReceiveMethod(orderdata.order.receiveMethod);
        let payment:string = this.getpayment(orderdata.order.paymentStatus);
        let status:string = this.getStatus(orderdata.order.status);
        let ordertable = <table className="my-table2">
        <tr>
            <td>Order No.</td>
            <td>{orderdata.order.orderNo}</td>
        </tr>
        <tr>
            <td>Goods Image</td>
            <td><a onClick={()=>this.props.history.push('/showgoodsinfo/'+orderdata.goods.id)}><img src={goodsImgSrc}/></a></td>
        </tr>
        <tr>
            <td>Goods Name</td>
            <td>{orderdata.goods.name}</td>
        </tr>
        <tr>
            <td>Order Price</td>
            <td>${orderdata.goods.price}</td>
        </tr>
        <tr>
            <td>Order Time</td>
            <td>{(new Date(orderdata.order.orderTime) as any).format("yyyy-MM-dd hh:mm")}</td>
        </tr>
        <tr>
            <td>Receive Method</td>
            <td>{receiveMethod}</td>
        </tr>
        <tr>
            <td>Receive Address</td>
            <td>{orderdata.order.receiveAddr}</td>
        </tr>
        <tr>
            <td>Order Status</td>
            <td>{status}</td>
        </tr>
        <tr>
            <td>Payment Status</td>
            <td>{payment}</td>
        </tr>
        <tr>
            <td>Seller</td>
            <td><Tooltip placement="topLeft" title={"Chat with the seller"}>
            <a  onClick={()=>this.onSellerClicked(this.state.orderdata.order)}><div className="circleIcon_middle"><img src={window.localStorage.getItem("host_pre")+"member/geticon?Id="+this.state.orderdata.order.sellerId+"&size=1"}/></div>
            {this.state.orderdata.order.sellerName} (Chat...)</a>
          </Tooltip></td>
        </tr>
    </table>

        if(orderdata == undefined){
            return(
                <div></div>
            )
        }else if(orderdata == null){
            return(
                <div>
                    This order does not exist!
                </div>
            )
        }else if(orderdata.order.paymentStatus == 0 && orderdata.order.status == 0){
                      
            return(
                <div>
                  {ordertable}
                  <Row><Col span={24}>&nbsp;</Col></Row>
                  <Button type="primary" onClick={() => this.props.history.push("/payment/"+orderdata.order.id)}>pay for this order</Button> &nbsp;&nbsp;&nbsp;
                  <Button type="primary" onClick={() => this.confirmCancel()}>cancel the order</Button>
                  
                  
                 
                </div>
            )
        }else if(orderdata.order.status == 0 && orderdata.order.paymentStatus == 1){
            return(
                <div>
                  {ordertable}
                  <Button type="primary" onClick={() => this.confirmConfirm()}>Confirm Received</Button>
                  
                  <span>{this.state.confirmMsg}</span>
                </div>
            )
        }else if(orderdata.order.status == -1){
            return(
                <div>
                    {ordertable}
                    <Button type="primary" onClick={() => this.props.history.goBack()}>Go Back</Button>
                  
                </div>
            )
            //this.props.history.push("/myAccount");
        }
        else{
            return(
                <div>
                  {ordertable}
                </div>
            )
        }
        
        
    }
}