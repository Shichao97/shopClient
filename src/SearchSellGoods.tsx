import React from 'react';
// import * as ReactDOM from 'react-dom';
//import './SearchSellGoods.css';
//import LoginModal from './LoginModal';
import jquery from "jquery";
import { Link } from 'react-router-dom';
import conf from './Conf'

const $ = jquery;

export default class SearchSellGoods extends React.Component<any,any> {
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
          types:conf.goods_types
        }
      }
      
      componentWillMount(){
        //var win:any = window;
        let uid:string = (conf as any).getCookie("userId");
        /*
        if(uid == ""){
            this.props.history.push(  "/login"  );
        }
        */
        this.setState({uid:uid});
       // console.log("Hi "+this.state.id);

        // let getDatas:any =  sessionStorage.getItem('goods_types');
        // let obj:any = new Object();
        // if(getDatas != null){
        //     let data = JSON.parse(getDatas);
        //   for (let ele of data) {
        //     obj[ele.code] = ele;
        //   }
        // }
        

        // this.setState({types:obj});
      }
/*
      getCookie(key:string){
        const name =key+"=";
        const ca = document.cookie.split(';'); 
        for(let i=0;i<ca.length;i++){
          const c = ca[i].trim();
          if(c.indexOf(name) === 0){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
*/

      getTypes(typeCode:string):string{
        // let types:any = this.state.types;
        // let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return conf.getFullTypeName(typeCode);
      }

      

      loadData(pageNo?:number) {
      
        let _this: SearchSellGoods = this;
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
                  let popwin: any = conf.loginWin;
                  popwin.setState({modalIsOpen:true})
              }
              
          }
        })
          
      }
    handleSearch(){
        let _this: SearchSellGoods = this;
        let uid:string = conf.getCookie("userId");
        console.log(uid + "handle");
        let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
        let plusnew:string = "&pageSize=2";//没写 sortby
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



    handlePreviousPage(){
      let _this: SearchSellGoods = this;
      let page:any = _this.state.page;
      let pn:number = page.number;
      pn -= 1;
      
      let totalPages = page.totalPages;
      if(pn > (-1)){
        _this.loadData(pn);
      }
    }

    handleNextPage(){
      let _this: SearchSellGoods = this;
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
      let _this: SearchSellGoods = this;
      let page:any = _this.state.page;
      let arry:any[] = page.content;
      
      let uid:string = conf.getCookie("userId");
      console.log(uid); 
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
      
  </form>
      if(_this.state.flag != 1){
        return forms;
      }
      else{
        return(
          
            <div>
              {forms}
                <table>
                  <thead>
                    <tr>
                      <th>goods name</th>
                      <th>type</th>
                      <th>description</th>
                      <th>location</th>
                      <th>price</th>
                      <th>selling method</th>
                      <th>goods status</th>
                      <th>goods image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arry.map((element:any) =>{
                      let s:string = ""+element.id;
                      //let s:string = "?id="+id;
                      let sm:string = this.sellingMethod(element.sellingMethod);
                      let fullTypeName:string = this.getTypes(element.typeCode);
                      let statusName:string = this.getStatus(element.status);
                      //let imgSrc:string = this.getImgSrc(s);
                      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsimg?Id="+element.id+"&fname="+element.imgNames.split(";")[0];

                      let link:string ="/editsellgoods/" +s;
                      return(
                        <tr>
                          
                          <td><Link to={link} >{element.name}</Link></td>
                          <td>{fullTypeName}</td>
                          <td>{element.description}</td>
                          <td>{element.location}</td>
                          <td>{element.price}</td>
                          <td>{sm}</td>
                          <td>{statusName}</td>
                          <td><img src={imgSrc}/></td>
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