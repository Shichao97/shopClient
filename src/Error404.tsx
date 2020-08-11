import React from 'react';
//import LoginModal from './LoginModal';
import jquery from "jquery";
import { Button, Row, Col } from 'antd'
import conf from './Conf'

const $ = jquery;

// Error page
export default class Error404 extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={agreeMethod1:false}
    }
    
    
    render(){
        return(
            <div>
                <h1>404 Not found! </h1>
                <h2>Sorry,this page is missing</h2>
                
                
             </div>
             
        )
    }
}