//全局变量，为了部署方便
window.localStorage.setItem("host_pre", "http://localhost:8080/");
window.localStorage.setItem("wshost_pre", "ws://localhost:8080/");



var testVal = "Hello"

var getCookie = function getCookie(key){
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

var checkLogin = function checkLogin()
{
    let obj = new Object();
    obj.id = getCookie("userId");
    obj.username = getCookie("username");
    //console.log("Hi! "+uid);
    if(obj.id == ""){
        location.hash = "/login";
    }    
    return obj;
}