import React from 'react';
import * as ReactDOM from 'react-dom';
import './SearchSellGoods.css';
import LoginModal from './LoginModal';
import GoodsItem from './GoodsItem';
import jquery from "jquery";
import { Link } from 'react-router-dom';
const $ = jquery;

export default class SearchGoods extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {
          uid:"",
          searchType1:0,
          searchType2:"",
          searchValue:"",
          url:"",
          page:{"content":[]},
          gotoPage:1,
          flag:0,
          types:[]
        }
      }
      
      componentWillMount(){
        var win:any = window;
        let uid:string = win.getCookie("userId");
        /*
        if(uid == ""){
            this.props.history.push(  "/login"  );
        }
        */
        this.setState({uid:uid});
       // console.log("Hi "+this.state.id);

        let getDatas:any =  sessionStorage.getItem('goods_types');
        let obj:any = new Object();
        if(getDatas != null){
            let data = JSON.parse(getDatas);
          for (let ele of data) {
            obj[ele.code] = ele;
          }
        }
        

        this.setState({types:obj});
      }

      getTypes(typeCode:string):string{
        let types:any = this.state.types;
        let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return fullTypeName;
      }

      

      loadData(pageNo?:number) {
      
        let _this: SearchGoods = this;
        let newUrl:string = "";
        if(pageNo != undefined){
          newUrl = _this.state.url;
          //newUrl = searchUrl;
          newUrl = newUrl+ "&pageNo="+pageNo;
         
        }else{
          newUrl = _this.state.url;
          //newUrl = searchUrl;
        }
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
              _this.setState({page:data,gotoPage:data.number+1});
              _this.setState({flag:1});
          },
          error: function(xhr:any, textStatus, errorThrown){
              console.log("request status:"+xhr.status+" msg:"+textStatus)
              if(xhr.status=='604'){//未登录错误
                  let popwin: any = _this.refs.logwin;
                  popwin.setState({modalIsOpen:true})
              }
              
          }
        })
          
      }
    handleSearch(){
        let _this: SearchGoods = this;
        let uid:string = _this.state.uid;
        console.log(uid + "handle");
        let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
        let plusnew:string = "&pageSize=8";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew+"&sellerId=" + uid;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSelect1 = (event:any) =>  {
        this.setState({searchType1:event.target.value});
    }
    handleSelect2 = (event:any) =>  {
        this.setState({searchType2:event.target.value});
    }
    handleChange = (event:any) =>  {
        
        switch(event.target.name){
          case "searchValue":
            this.setState({searchValue: event.target.value});
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

    getStatus(s:number):string{
      if(s == 0){
        return "remove off the shelves";
      }else if(s == 1){
        return "selling now";
        
      }else{
        return "sold out";
      }
    }

    getImgSrc(gid:string):string{
      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/sell/getgoodsmainimg?Id="+gid;
      return imgSrc;
    }

    handlePreviousPage(){
      let _this: SearchGoods = this;
      let page:any = _this.state.page;
      let pn:number = page.number;
      pn -= 1;
      
      let totalPages = page.totalPages;
      if(pn > (-1)){
        _this.loadData(pn);
      }
    }

    handleNextPage(){
      let _this: SearchGoods = this;
      let page:any = _this.state.page;
      let pn:number = page.number;
      pn += 1;
      
      let totalPages = page.totalPages;
      if(pn<totalPages){
        _this.loadData(pn);
      }
      
    }
    handleGoto(){
      let page:any = this.state.page;
      let totalPages = page.totalPages;
      let pn:number = this.state.gotoPage;
      this.loadData(pn-1);
    }
    
    render(){
      let _this: SearchGoods = this;
      let page:any = _this.state.page;
      let arry:any[] = page.content;
      //console.log("render: "+_this.state.uid);
      let uid:string = _this.state.uid;
      console.log(uid); 
      let col:number = 3; //显示商品列数
      let forms =                 
      <form id="searchForm">
      * choose goods status:
      <select name="searchType1" value={_this.state.searchType1} onChange={_this.handleSelect1} id="dropdown1">
          <option value="1">selling now</option>
          <option value="-1">sold out</option>
          <option value="0">remove off the shelves</option>
      </select> <br/>
      * choose to search by:
      <select name="searchType2" value={_this.state.searchType2} onChange={_this.handleSelect2} id="dropdown2">
          <option value="name">goods name</option>
          <option value="desc">description</option>
      </select><br/>
      <input type="text" name="searchValue" id="si" value ={_this.state.searchValue} onChange={_this.handleChange}/>
      <input type="button" value="Search" onClick={() => _this.handleSearch()}/><br/><br/>
      <LoginModal ref="logwin"/>
  </form>
      if(_this.state.flag != 1){
        return forms;
      }
      else{
        return(
          
            <div>
              {forms}
                <table>
                    <tbody>
                    {arry.map((element:any,index:number) =>{
                        let nstart:number;
                        let nrow:number;
                        if((index != 0 && index%col == 0) || (index % col>0 && index==arry.length-1)){
                            nstart = (index/col-1)*col;
                            if(index % col>0 && index==arry.length-1) nstart = (index/col) * col;
                            return <tr>
                              {arry.map((element2:any,index2:number) =>{
                                if(index2>=nstart && index2<index)
                                 return <td><GoodsItem data={element2}/></td>
                              })}

                              </tr>
                        }
                        /*
                      element.id
                      (element.sellingMethod);
                      (element.typeCode);
                      (element.status);
                      {element.name}{element.description}{element.location}</td>{element.price}</td>
                     
                      */
                     return(
                         <tr>
                             <GoodsItem data={element}/>
                         </tr>
                         
                     )
                      
                    }

                    )}
                    </tbody>
                </table>
                <br/><br/>

                <input type="button" value="previous page" onClick={() => _this.handlePreviousPage()}/>
                <input type="button" value="next page" onClick={() => _this.handleNextPage()}/><br />  <br />

                <input type="number" name="gotoPage" value={this.state.gotoPage} placeholder="please enter a page number" onChange={_this.handleChange}/>
                <input type="button" value="Go" onClick={() => _this.handleGoto()}/><br />  <br />
        
            </div>
        )
      }
    }
}