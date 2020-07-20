import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import{Button,Modal,Radio} from 'antd';
import jquery from "jquery";
import conf from './Conf';
const $ = jquery;

export default class Payment extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state ={
            radioValue:1
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
                this.handlePay();
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handlePay(){
        let oid = this.props.match.params.oid;
        console.log(oid);
        let _this = this;
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
                    _this.setState({orderNo:data.orderNo});
                    // let datas = _this.state.orderdata;
                    // datas.order.paymentStatus = 1;
                    // _this.setState({orderdata:datas});
                }
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
    
    onChange(e:any) {
        let _this:Payment = this;
        console.log('radio checked', e.target.value);
        _this.setState({
            radioValue: e.target.value,
        });
      };
    render(){
        let oid = this.props.match.params.oid;
        let link:string = "/showOrderInfo/" + oid;
        if(this.state.orderNo == undefined){
            return(
                <div>
                      <Radio.Group onChange={this.onChange} value={this.state.radioValue}>
                            <Radio value={1}>Debit Card</Radio>
                            <Radio value={2}>Credit Card</Radio>
                            <Radio value={3}>Paypal</Radio>
                            <Radio value={4}>Apple Pay</Radio>
                      </Radio.Group>
                      <Button type="primary" onClick={() => this.confirmPay()}>pay for this order</Button>
                </div>
            )
        }else{
            return(
                <div className="demo2">
                    <h1>
                    Thanks for placing your order. Your order no. is
                    <Link to={link}> {this.state.orderNo}</Link> 
                   
                </h1>
                </div>
            )
            
        }
        
    }
}