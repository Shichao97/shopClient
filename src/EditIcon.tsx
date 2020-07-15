import React from 'react';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import conf from './Conf'

import { Button, Row, Col } from 'antd'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const $ = jquery;
function getBase64(img:any, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file:any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }



export default class EditIcon extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            id:"",
            un:"",
            loading: false,
        }
    }
    handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageUrl:any) =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };    


    logout(){
      let url = window.localStorage.getItem("host_pre")+"member/logout";
      let _this = this;
      let uid = conf.getCookie("userId");
      let params = {id:uid};
      $.ajax({
          type:"POST",
          crossDomain: true, 
          xhrFields: {
              withCredentials: true 
          },
          url:url,
          data:params,
          dataType:"json",
          success: function(data) {
              console.log(data)
              if(data.success == 1){
                _this.props.history.push("/");
              }
              else if(data.success==0){
                alert(data.msg);
                _this.props.history.push("/");
              }
              

          },
          error: function(xhr:any, textStatus, errorThrown){
            console.log("request status:"+xhr.status+" msg:"+textStatus)
            if(xhr.status=='604'){//未登录错误
              //_this.props.listComp.refs.logwin.set
            }
             
          }
      })          
    }
    
    render(){
        let cf:any = conf;
        if(cf.getCookie == undefined) return <div></div>
        let id:string = cf.getCookie("userId");
        let un:string = cf.getCookie("username");
       // id = "1006";
        var myDate = new Date();
        let imgSrc:string = window.localStorage.getItem("host_pre")+"member/geticon?Id="+id+"&size=1"+"&refresh="+myDate.getMilliseconds();
        //console.log(imgSrc);
 
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          let s:any = this.state;
          let imageUrl:any = s.imageUrl;
          let url = window.localStorage.getItem("host_pre")+'member/edit/upIcon?id='+id;    
 
        return(
            <div className="demo2">
                <Row><Col span={24}><h2>Hello! {un}&nbsp;&nbsp;&nbsp;(<a href="#" onClick={() => this.logout()}>Logout</a>)</h2></Col></Row>
                <Row><Col span={24}><h2>&nbsp;</h2></Col></Row>
                <Row justify="space-around" align="middle"><Col span={4}></Col><Col span={10}>Edit you icon: <img src={imgSrc} />&nbsp;&nbsp;&nbsp;&nbsp; =&gt; </Col><Col span={10}>
                    
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    //crossDomain={true}
                    action={url}
                    withCredentials={true}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                </Col></Row>
                <Row><Col span={24}><h2>&nbsp;</h2></Col></Row>
                <Row><Col span={24}></Col></Row>
                <Row><Col span={24}>
                  <Button type="default" onClick={() => this.props.history.push("/")}>Back Home</Button></Col></Row>
            </div>
        )
    
        
    }
}