import React from 'react';
import * as ReactDOM from 'react-dom';
import jquery from "jquery";
const $ = jquery;

export default class searchSellGoods extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {
          searchType1:"",
          searchType2:"",
          searchValue:0,
          url:"",
          page:{"content":[]},
          gotoPage:1
        }
      }

      loadData(pageNo?:number) {
      
        let _this: searchSellGoods = this;
        //console.log(_this.state.url);
        let newUrl:string = "";
        if(pageNo != undefined){
          newUrl = _this.state.url;
          newUrl = newUrl+ "&pageNo="+pageNo;
         
        }else{
          newUrl = _this.state.url
        }
        console.log(newUrl);
        $.ajax({
          type:"GET",
          url:newUrl,
          dataType:"json",
          success:function(data){
              _this.setState({page:data,gotoPage:data.number+1});
              
          },
        })
          
      }
    handleSearch(){
        let _this: searchSellGoods = this;
        let plus:string = $("#searchForm").serialize();  //serachType1, searchtype2,searchValue
        let plusnew:string = "&pageSize=20";//没写 sortby
        let searchUrl:string = window.localStorage.getItem("host_pre")+"goods/sell/search?"+plus+plusnew;
      
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
    
    render(){
      let _this: searchSellGoods = this;
      let page:any = _this.state.page;
      let arry:any[] = page.content;
        
        return(
            <div>
                <form id="searchForm">
                    * choose goods status:
                    <select name="searchType1" value={_this.state.searchType1} onChange={_this.handleSelect1} id="dropdown1">
                        <option value="0">Not on the shelves</option>
                        <option value="1">sold out</option>
                        <option value="2">selling now</option>
                        <option value="-1">remove off the shelves</option>
                    </select> <br/>
                    * choose to search by:
                    <select name="searchType2" value={_this.state.searchType2} onChange={_this.handleSelect2} id="dropdown2">
                        <option value="name">goods name</option>
                        <option value="desc">description</option>
                    </select><br/>
                    <input type="text" name="searchValue" id="si" value ={_this.state.searchValue} onChange={_this.handleChange}/>
                    <input type="button" value="Search" onClick={() => _this.handleSearch()}/>
                    
                </form>
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
                    </tr>
                  </thead>
                  <tbody>
                    {arry.map((element:any) =>{
                      let s:string = ""+element.id;
                      //let s:string = "?id="+id;
                      
                      return(
                        <tr>
                          
                          <td>{element.name}</td>
                          <td>{element.birthdate}</td>
                          <td><a href="#" onClick={() => _this.handleClick(s)} >{element.lastName} {element.firstName}</a> </td>
                          <td>{element.gender}</td>
                          <td><input type="button" name="deleteButton" value="Delete" onClick={() => _this.handleDelete(s)} /></td>
                        </tr>
                      )
                      
                    }

                    )}
                  </tbody>
                </table>
            </div>
        )
    }
}