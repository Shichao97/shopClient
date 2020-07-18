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
       
    }
    render(){
        return(
            <div>

                  <Button type="primary" onClick={() => this.confirmPay()}>pay for this order</Button>
            </div>
        )
    }
}