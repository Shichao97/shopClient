import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import{Button,Modal} from 'antd';
import jquery from "jquery";
const $ = jquery;

export default class Payment extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state ={

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
        let oid = this.props.match.params.oid; ///
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
                    let datas = _this.state.orderdata;
                    datas.order.paymentStatus = 1;
                    _this.setState({orderdata:datas});
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
    render(){
        return(
            <div>

                  <Button type="primary" onClick={() => this.confirmPay()}>pay for this order</Button>
            </div>
        )
    }
}