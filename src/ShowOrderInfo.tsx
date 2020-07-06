import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import LoginModal from './LoginModal';
const $ = jquery;


export default class ShowOrderInfo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }

    render(){
        let oid = this.props.match.params.oid;
        return(
            <div>
              Hi {oid}
            </div>
        )
    }
}