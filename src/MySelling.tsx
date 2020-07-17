import React, { RefObject } from 'react';
import * as ReactDOM from 'react-dom';
import './SearchGoods.css';
import GoodsItem from './GoodsItem';
import jquery from "jquery";
import { Link } from 'react-router-dom';
import conf from './Conf'
import { Table,Form,Input,Button, Row, Col, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined,UserOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import Meta from 'antd/lib/card/Meta';

const $ = jquery;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default class MySelling extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        
        this.state = {
          uid:"",
          searchType:"",
          searchValue:"",
          url:"",
          page:{"content":[]},
          gotoPage:1,
          //flag:0,
          types:conf.goods_types
        }
        this.pageSize=2;
      }

      pageSize = 4;
      routeName = "/_mySelling";
      params:any;
 

      getTypes(typeCode:string):string{
        // let types:any = this.state.types;
        // let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return conf.getFullTypeName(typeCode);
      }

      

      loadData(pageNo?:number) {
        let uid = conf.getCookie("userId");
        let uname = conf.getCookie("username");
        let plus = conf.getQueryStrFromObj(this.params);
        let _this = this;
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?" + plus;

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
            var arr:any[] = [];
            var member = {id:uid,userName:uname}
            data.content.forEach((element:any) => {
              arr.push({g:element,m:member});
            });
            data.content = arr;
              _this.setState({page:data,gotoPage:data.number+1});
              //_this.setState({flag:1});
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




    
    handleSelect2 = (event:any) =>  {
        this.setState({searchType:event.target.value});
    }
    handleChange = (event:any) =>  {
        
        switch(event.target.name){
          case "searchValue":
            this.setState({searchValue: event.target.value});
            break;
          case "gotoPage":
            let page:any = this.state.page;
            let totalPages = page.totalPages;
            if(event.target.value >= 1 && event.target.value <=totalPages){
                this.setState({gotoPage: event.target.value});
            }
            break;
         
        }
      }
     
    sellingMethod(m:number):string{
      //let re:string = "";
      let re1= ((m & 1) == 1) ? "shipping":"";
      let re2= ((m & 2) == 2) ? "self-pick":"";
      let re3= ((m & 4) == 4) ? "home-dilivery":"";
      
      return re1 + " " + re2 + " " + re3;
    }


    getImgSrc(gid:string):string{
      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
      return imgSrc;
    }

    // handlePreviousPage(){
    //   let _this: SearchGoods = this;
    //   let page:any = _this.state.page;
    //   let pn:number = page.number;
    //   pn -= 1;
      
    //   let totalPages = page.totalPages;
    //   if(pn > (-1)){
    //     _this.loadData(pn);
    //   }
    // }

    // handleNextPage(){
    //   let _this: SearchGoods = this;
    //   let page:any = _this.state.page;
    //   let pn:number = page.number;
    //   pn += 1;
      
    //   let totalPages = page.totalPages;
    //   if(pn<totalPages){
    //     _this.loadData(pn);
    //   }
      
    // }
    // handleGoto(){
    //   let page:any = this.state.page;
    //   let totalPages = page.totalPages;
    //   let pn:number = this.state.gotoPage;
    //   this.loadData(pn-1);
    // }
    cardRender(ele:any) {

  
      if(ele == undefined) return <div></div>
      let v = this.cellWidth/24;
      let n = Math.floor((this.cellWidth-280)/v/2);
      return(

        <Row >
        <Col span={n}>
  
        </Col>
        <Col span={24-n}>
        <Card
        hoverable
        //actions={[<SearchOutlined />,<SearchOutlined />,<SearchOutlined />]}
        onClick={()=>this.props.history.push('/showgoodsinfo/'+ele.g.id)}
        bodyStyle={{ width: 240,textAlign:"center" }}
        style={{ width: 262,textAlign:"center" }}
        cover={<Row><Col offset={1}><img className="img_big" alt="example" src={window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+ele.g.id} /></Col></Row>}
      >
        <Meta title={ele.g.name} />
        <Row><Col>&nbsp;</Col></Row>
        <Meta description={ele.m.userName}  avatar={<img src={window.localStorage.getItem("host_pre")+"member/geticon?Id="+ele.g.sellerId+"&size=0"}/>}/>
      </Card>  
        </Col>

      </Row>


        
      )
    }

    //为了居中，用心良苦。因为Card总是居左，怎么用css都没有用，自能自己硬调。
    cellWidth = 400;

    columns:any[] = [
      {
        title: 'Item0',
        key: 'c_0',
        
        render:(text:any, record:any) =>{
          let ele = record["c_0"]
          return (
            this.cardRender(ele)
        )},
        align:'center',
      },
      {
        title: 'Item1',
        key: 'c_1',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_1"]
          return (
            this.cardRender(ele)           
        )}
      },
      {
        title: 'Item2',
        key: 'c_2',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_2"]
          return (
            this.cardRender(ele)           
        )}
      },
      {
        title: 'Item3',
        key: 'c_3',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_3"]
          return (
            this.cardRender(ele)          
        )}
      },
      {
        title: 'Item4',
        key: 'c_4',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_4"]
          return (
            this.cardRender(ele)           
        )}
      },
      {
        title: 'Item5',
        key: 'c_5',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_5"]
          return (
            this.cardRender(ele)           
        )}
      }
    ]


    handleSearch(type:number){
      let _this = this;
      let uid:string = conf.getCookie("userId");
      //let plus:string = "&searchType=1&pageSize="+this.pageSize;//没写 sortby
      this.params = {searchType:type,pageSize:this.pageSize,sellerId:uid};

      let qs = conf.getQueryStrFromObj(this.params);
      this.props.history.push(this.routeName+"/"+qs);
  }

 


    componentDidMount(){
      let _this = this;
      window.onresize = function(){
  
        _this.setState({});
      }


    }

    //第一次进入用这个
    componentWillMount(){
      
      let plus:string = conf.getUrlQueryString(this.routeName);
      this.params = conf.getQueryObjFromStr(plus);
        //let str:string = "";
      console.log("plus:"+plus);
      if(plus.indexOf("=")>0){
        let s:string = this.params.pageNo;
        let pageNo:number = s==""?0:parseInt(s);
        if(pageNo>0) pageNo--;
        this.loadData((pageNo));
      }      
    }

    // componentWillUpdate(){
    //   console.log("componentWillUpdate: ");
    // }

    //在内部push用这个
    componentWillReceiveProps(nextProps:any){
      var str = nextProps.location.pathname;
      console.log("Hash changed to: "+str);
      if(str.indexOf("=")<0) return;
      let n = this.routeName.length;
      let plus = str.substr(n+1);
      this.params = conf.getQueryObjFromStr(plus);

      
      let s:string = this.params.pageNo;
      let pageNo:number = s==""?0:parseInt(s);
      if(pageNo>0) pageNo--;
      this.loadData((pageNo));
    }



    onFinish=(values:any)=>{
      let _this = this;

      let uid:string = (conf as any).getCookie("userId");
      
      let searchValue = values.searchValue==undefined?"":values.searchValue;

      let obj = {searchValue:searchValue,pageSize:this.pageSize};
      let plus = conf.getQueryStrFromObj(obj);
      this.props.history.push(this.routeName+"/"+plus);
  }

  pageChanged=(pn:any)=>{
    var obj = this.params;
    obj.pageNo = pn;
    let plus = conf.getQueryStrFromObj(obj);
    this.props.history.push(this.routeName+"/"+plus);
  }

    render(){
      let _this = this;
      let page:any = _this.state.page;
      if(page == undefined) return <div></div>
      let arry:any[] = page.content;
      
      
      let uid:string = conf.getCookie("userId");
      console.log(uid); 
     
      let plus:string = conf.getUrlQueryString(this.routeName);

      

      let n = Math.floor(document.body.clientWidth/280);
      if(n<=0) n = 1;
      else if(n>this.columns.length) n = this.columns.length;
      if(arry.length>0 && arry.length<n) {
        n = arry.length;
      }
      let columns:any[] = [];
      for(var k=0;k<n;k++){
        columns.push(this.columns[k]);
      }

      this.cellWidth = document.body.clientWidth/n;

      let allDatas = [];
      
      let rowNum = Math.ceil(arry.length/n);
     for(var i=0;i<rowNum;i++){
        let rowDatas:any = {key:"r_"+i};//key:"r_"+i
        for(var j=0;j<n;j++){
          if(i*n+j>= arry.length) break
          let ele = arry[i*n+j];
          rowDatas["c_"+j] = (ele);
        }
        allDatas.push(rowDatas);

      }


      let forms = 
<div>
<Button type="default" size='large' onClick={()=>this.handleSearch(1)}>Selling Onow</Button>&nbsp;&nbsp;&nbsp;&nbsp;
<Button type="default" size='large' onClick={()=>this.handleSearch(2)}>On the way</Button>&nbsp;&nbsp;&nbsp;&nbsp;
<Button type="default" size='large' onClick={()=>this.handleSearch(3)}>Already sold out</Button>&nbsp;&nbsp;&nbsp;&nbsp;
<Button type="default" size='large' onClick={()=>this.handleSearch(4)}>Removed off from shelf</Button>&nbsp;&nbsp;&nbsp;&nbsp;


</div>





     


      if(plus.length<3){
        return <Row><Col span={24}>{forms}</Col></Row>
      }
      else{
        return(
          
            <div>
              <Row><Col span={24}>{forms}</Col></Row>
              <Row><Col span="24">
              <Table dataSource={allDatas}  columns={columns}  showHeader={false}  pagination={ false }/>
              </Col></Row>
              <Row><Col span={24}><Pagination hideOnSinglePage={true} pageSize={this.pageSize} current={this.state.page.number+1} total={this.state.page.totalElements} onChange={this.pageChanged}/></Col></Row>
            </div>
        )
      }
      
    }
}