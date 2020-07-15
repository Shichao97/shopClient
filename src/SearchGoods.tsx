import React, { RefObject } from 'react';
import * as ReactDOM from 'react-dom';
import './SearchGoods.css';
import GoodsItem from './GoodsItem';
import jquery from "jquery";
import { Link } from 'react-router-dom';
import conf from './Conf'
import { Table,Form,Input,Button, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined,UserOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';

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
export default class SearchGoods extends React.Component<any,any> {
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
        this.pageSize=3;
      }

      pageSize = 4;
      routeName = "/searchGoods";
      params:any={};
 

      getTypes(typeCode:string):string{
        // let types:any = this.state.types;
        // let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return conf.getFullTypeName(typeCode);
      }

      

      loadData(pageNo?:number) {
      
        let _this = this;
        let plus = conf.getQueryStrFromObj(this.params);
        let newUrl:string = window.localStorage.getItem("host_pre")+"goods/search2?"+plus;
        
        
        console.log(newUrl);
        $.ajax({
          type:"GET",
          // crossDomain: true, 
          // xhrFields: {
          //     withCredentials: true 
          // },
          url:newUrl,
          dataType:"json",
          success:function(data){
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

    columns:any[] = [
      {
        title: 'Item0',
        key: 'c_0',
        
        render:(text:any, record:any) =>{
          let ele = record["c_0"]
          return (
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
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
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
        )}
      },
      {
        title: 'Item2',
        key: 'c_2',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_2"]
          return (
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
        )}
      },
      {
        title: 'Item3',
        key: 'c_3',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_3"]
          return (
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
        )}
      },
      {
        title: 'Item4',
        key: 'c_4',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_4"]
          return (
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
        )}
      },
      {
        title: 'Item5',
        key: 'c_5',
        align:"center",
        render:(text:any, record:any) =>{
          let ele = record["c_5"]
          return (
          <div style={{ alignItems: "center" }}><GoodsItem data={ele}/> </div>           
        )}
      }
    ]
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



    formRef:RefObject<FormInstance> = React.createRef();

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
      
      let ss = this.params.searchValue;

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
      

  <Form layout="inline"
 
        ref={this.formRef} 
        name="search"
        onFinish={this.onFinish}
   
        scrollToFirstError
      >
  <Form.Item 
        name="searchValue"
        //label="              &nbsp;"
        initialValue={ss}
        rules={ [{required:false, message: 'Please enter goods name!' }]}
      >
        <Input placeholder="Goods Name" prefix={<SearchOutlined />}/>
  </Form.Item>
  <Form.Item  >
        <Button type="primary" htmlType="submit">
          Search
        </Button>
  </Form.Item>
</Form>





     


      if(plus.length<3){
        return <Row><Col span={9}>&nbsp;</Col><Col span={15}>{forms}</Col></Row>
      }
      else{
        return(
          
            <div>
              <Row><Col span={9}>&nbsp;</Col><Col span={15}>{forms}</Col></Row>
              <Row><Col span="24">
              <Table dataSource={allDatas}  columns={columns}  showHeader={false}  pagination={ false }/>
              </Col></Row>
              <Row><Col span={24}><Pagination pageSize={this.pageSize} current={this.state.page.number+1} total={this.state.page.totalElements} onChange={this.pageChanged}/></Col></Row>
            </div>
        )
      }
      /*                <table className="goods-table">
                  <tbody> 
                    {arry.map((element:any,index:number) =>{
                        let isRowEnd:boolean = (index%col == col-1);
                        let isLast:boolean = index==arry.length-1;
                        if(isRowEnd || isLast){
                          let nstart:number = Math.floor(index/col)*col;
                            return <tr className='tr1'>
                              {arry.map((element2:any,index2:number) =>{
                                if(index2>=nstart && index2<=index)
                                 return <td className='td1'><GoodsItem data={element2}/></td>
                              })}

                              </tr>
                        }
                    })}
                    
                    </tbody>   
                </table>*/
    }
}