import React from 'react';
//import LoginModal from './LoginModal';
import jquery from "jquery";
import { Button, Row, Col } from 'antd'
import conf from './Conf'

const $ = jquery;

export default class Demo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={agreeMethod1:false}
    }
    
    componentDidMount(){
        this.setState({agreeMethod1:true});
        // let msgwin = conf.msgWin;
        // if((conf as any).msgWin != undefined) {
        //     (conf as any).msgWin.setState({modalIsOpen:true})
        // }
    }

    showLogin(){
        let popwin: any = conf.loginWin;
        popwin.setState({modalIsOpen:true});
        var win:any = window;
        console.log("testval="+win.testVal);
        //win.checkLogin();
    }
    
    render(){
        let id:number = this.props.match.params.id
        let ids:string = "";
        if(id != undefined) ids = "id="+id;
        let query:any = this.props.location.query;
        let sta:any = this.props.location.state;
        let s:any = "";
        if(sta != undefined) s = "state id="+sta.id+" , username="+sta.username;
        return(
            <div>
                <h2>Hello! {ids}</h2>
                <h2>Hello! {query}</h2>
                <h2>Hello! {s}</h2>
                <input type="checkbox" name="method1" value = "1" defaultChecked={this.state.agreeMethod1} /> shipping
                <input type="button" value="Popup login" onClick={() => this.showLogin()}/>
                <Button key="back" type="text" size="large">Hello</Button>
             </div>
             
        )
    }
}