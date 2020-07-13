import React from 'react';
import { Link } from 'react-router-dom';
import './SearchGoods.css';
import GoodsItem from './GoodsItem';
import jquery from "jquery";
//import LoginModal from './LoginModal';
import conf from './Conf'

const $ = jquery;


export default class MySelling extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {
          uid:"",
          url:"",
          page:{"content":[]},
          gotoPage:1,
          flag:0,
          types:conf.goods_types
        }
      }
      
      componentWillMount(){
        var cf:any = conf;
        let uid:string = cf.getCookie("userId");
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
        
        return conf.getFullTypeName(typeCode);
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
        let plus:string = "&searchType=1&pageSize=2";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?sellerId=" + uid + plus;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
    }

    handleSearch2(){
      let _this: MySelling = this;
      let uid:string = _this.state.uid;
      let plus:string = "&searchType=2&pageSize=2";//没写 sortby
      let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?sellerId=" + uid + plus;
    
      _this.state={url:searchUrl};
      _this.setState({url:searchUrl});
      _this.loadData();
    }

    handleSearch3(){
      let _this: MySelling = this;
        let uid:string = _this.state.uid;
        let plus:string = "&searchType=3&pageSize=2";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?sellerId=" + uid + plus;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
  }
    
  handleSearch4(){
    let _this: MySelling = this;
        let uid:string = _this.state.uid;
        let plus:string = "&searchType=4&pageSize=2";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?sellerId=" + uid + plus;
      
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

    handleChange = (event:any) =>  {
        
      switch(event.target.name){
        case "gotoPage":
          let page:any = this.state.page;
          let totalPages = page.totalPages;
          if(event.target.value >= 1 && event.target.value <=totalPages){
              this.setState({gotoPage: event.target.value});
          }
          break;
       
      }
    }
    
    render(){
      let _this: MySelling = this;
      let page:any = _this.state.page;
      let arry:any[] = page.content;
      //console.log("render: "+_this.state.uid);
      let uid:string = _this.state.uid;
      console.log(uid); 
      let col:number = 2; //显示商品列数
      //var win:any = window;
      let un:string = (conf as any).getCookie("username");
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
            <table className="goods-table">
              <tbody> 
                {arry.map((element:any,index:number) =>{
                    let isRowEnd:boolean = (index%col == col-1);
                    let isLast:boolean = index==arry.length-1;
                    if(isRowEnd || isLast){
                      let nstart:number = Math.floor(index/col)*col;
                        return <tr className='tr1'>
                          {arry.map((element2:any,index2:number) =>{
                            if(index2>=nstart && index2<=index)
                             return <td className='td1'><GoodsItem data={{g:element2,m:{id:uid,userName:un}}}/></td>
                          })}

                          </tr>
                    }
                })}
                
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