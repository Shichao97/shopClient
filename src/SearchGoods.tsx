import React from 'react';
import * as ReactDOM from 'react-dom';
import './SearchGoods.css';
import GoodsItem from './GoodsItem';
import jquery from "jquery";
import { Link } from 'react-router-dom';
const $ = jquery;

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
          flag:0,
          types:[]
        }
      }
      
      componentWillMount(){
        var win:any = window;
        let uid:string = win.getCookie("userId");
        this.setState({uid:uid});

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
          // crossDomain: true, 
          // xhrFields: {
          //     withCredentials: true 
          // },
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
        //let uid:string = _this.state.uid;
        var win:any = window;
        let uid:string = win.getCookie("userId");

        console.log(uid + "handle");
        let plus:string = $("#searchForm").serialize();  //serachType,searchValue
        let plusnew:string = "&pageSize=8";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/search2?"+plus+plusnew;
      
        _this.state={url:searchUrl};
        _this.setState({url:searchUrl});
        _this.loadData();
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
      let col:number = 2; //显示商品列数
      let forms =            
      /*
      * choose to search by:
      <select name="searchType" value={_this.state.searchType} onChange={_this.handleSelect2} id="dropdown2">
          <option value="name">goods name</option>
          <option value="desc">description</option>
      </select><br/>
      */     
      <form id="searchForm">
    

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
                                 return <td className='td1'><GoodsItem data={element2}/></td>
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