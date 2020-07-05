import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import LoginModal from './LoginModal';
const $ = jquery;


export default class MyAccount extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
        }
    }


    render(){
        var win:any = window;
        let uid:string = win.getCookie("userId");
        let username:string = win.getCookie("username");
        let iconSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+uid+"&size=1";
        return(
            <div>
                <div><img src={iconSrc}/>&nbsp;&nbsp;{username}</div>
                <input type="button" value="not paid"></input>&nbsp;&nbsp;
                <input type="button" value="not finished"></input> &nbsp;&nbsp;
                <input type="button" value="All Orders"></input> 
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        )
    }
}