import React from 'react';
import LoginModal from './LoginModal';
import jquery from "jquery";
const $ = jquery;

export default class Demo extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={}
    }
    

    showLogin(){
        let popwin: any = this.refs.logwin;
        popwin.setState({modalIsOpen:true})
    }
    
    render(){
        let id:number = this.props.match.params.id //取到id参数
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
                <LoginModal ref="logwin"/>
                <input type="button" value="Popup login" onClick={() => this.showLogin()}/>
             </div>
             
        )
    }
}