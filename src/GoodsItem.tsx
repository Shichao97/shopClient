import React from 'react';
import LoginModal from './LoginModal';
import './GoodsItem.css';
import jquery from "jquery";
const $ = jquery;

export default class GoodsItem extends React.Component<any,any> {
    constructor(props:any,state:any){
        super(props,state);
    }

    render(){
        let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsmainimg?Id="+this.props.data.id;
        return <div>
            <img width="240px" height="240px"
            src={imgSrc}/>
            <br />
            <div className='goods-title'>{this.props.data.name}</div> <br/>
            <span className='price'>${this.props.data.price} </span>
        </div>
    }
}