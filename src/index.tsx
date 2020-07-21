import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//4 lines below is For IE compatible, Object.entries not support
import 'react-app-polyfill/ie11';
import 'core-js/es'  
import 'react-app-polyfill/ie9'  
import 'react-app-polyfill/stable'
//npm install react-app-polyfill core-js

window.localStorage.setItem("host_pre", "http://"+document.domain+"/");
window.localStorage.setItem("wshost_pre", "ws://"+document.domain+"/");

ReactDOM.render(
  
    <App id='app'/>,
  
  document.getElementById('root')
);

{/* <React.StrictMode>
<App id='app'/>
</React.StrictMode>, */}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
