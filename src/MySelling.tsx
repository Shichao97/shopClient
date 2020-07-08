import React from 'react';
import { Link } from 'react-router-dom';
import jquery from "jquery";
import './MyAccount.css';
import LoginModal from './LoginModal';
const $ = jquery;


export default class MySelling extends React.Component<any,any> {
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
        let types:any = this.state.types;
        let fullTypeName:string = types[typeCode].categoryName + "--" + types[typeCode].name;
        return fullTypeName;
      }

      

      loadData(pageNo?:number) {
      
        let _this: MySelling = this;
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
    handleSearch1(){
        let _this: MySelling = this;
        let uid:string = _this.state.uid;
        console.log(uid + "handle");
        let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
        let plusnew:string = "&pageSize=2";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew+"&sellerId=" + uid;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSearch2(){
        let _this: MySelling = this;
        let uid:string = _this.state.uid;
        console.log(uid + "handle");
        let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
        let plusnew:string = "&pageSize=2";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew+"&sellerId=" + uid;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSearch3(){
      let _this: MySelling = this;
      let uid:string = _this.state.uid;
      console.log(uid + "handle");
      let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
      let plusnew:string = "&pageSize=2";//没写 sortby
      let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew+"&sellerId=" + uid;
    
      _this.state={url:searchUrl};
      _this.setState({url:searchUrl});
      _this.loadData();
  }
    
  handleSearch4(){
    let _this: MySelling = this;
    let uid:string = _this.state.uid;
    console.log(uid + "handle");
    let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
    let plusnew:string = "&pageSize=2";//没写 sortby
    let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew+"&sellerId=" + uid;
  
    _this.state={url:searchUrl};
    _this.setState({url:searchUrl});
    _this.loadData();
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
      let imgSrc:string = window.localStorage.getItem("host_pre")+"goods/getgoodsmainimg?Id="+gid;
      return imgSrc;
    }

    handlePreviousPage(){
      let _this: MySelling = this;
      let page:any = _this.state.page;
      let pn:number = page.number;
      pn -= 1;
      
      let totalPages = page.totalPages;
      if(pn > (-1)){
        _this.loadData(pn);
      }
    }

    handleNextPage(){
      let _this: MySelling = this;
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
      let _this: MySelling = this;
      let page:any = _this.state.page;
      let arry:any[] = page.content;
      //console.log("render: "+_this.state.uid);
      let uid:string = _this.state.uid;
      console.log(uid); 
      let forms =   
      <div>

          <input type="button" value="selling now" onClick={() => this.handleSearch1()}></input>&nbsp;&nbsp;
          <input type="button" value="on the way" onClick={() => this.handleSearch2()}></input> &nbsp;&nbsp;
          <input type="button" value="already sold out" onClick={() => this.handleSearch3()}></input> &nbsp;&nbsp;
          <input type="button" value="removed off from shelf" onClick={() => this.handleSearch4()}></input>
      </div>
      
     
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
                      let imgSrc:string = this.getImgSrc(s);
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