import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class GoodsItem extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props,state);
    }

    render(){
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsmainimg?Id="+this.props.data.id;
        return <div>
            <img width="100px" height="100px"
            src={imgSrc}/>
            <br />
            <span>{this.props.data.price} {this.props.data.name}</span>
        </div>
    }
}