import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
import './assert/css/reset.css'
import Scroll from 'better-scroll'
import {Field,Divider,Form,Button,Popup,RadioGroup, Radio,Picker,Calendar,Tabs,Tab,NavBar} from 'vant'
import el from 'element-ui'
Vue.use(Divider)
Vue.use(Field)
Vue.use(Form)
Vue.use(Button)
Vue.use(Popup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Picker)
Vue.use(Calendar)
Vue.use(el.Table)
Vue.use(el.TableColumn)
Vue.use(el.Pagination)
Vue.use(el.Select)
Vue.use(el.Pagination)
Vue.use(el.Button)
Vue.use(el.Option)
Vue.use(el.Input)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(NavBar)

Vue.config.productionTip = false
//滚动初始化
Vue.prototype.scrollInit =(el,that)=>{
  setTimeout(()=>{ 
    that.scroll? that.scroll.destroy(): null   //存在则销毁实例
    that.scroll = new Scroll(el,{
      click:true,
      scrollY: true,
      bounce:{
        bottom: false,  //禁止向上弹动效果
      }
    })
  },500)
}

//获取客户端token
let token =null//'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZXYiLCJpYXQiOjE1ODMyMjUzNjAsImV4cCI6MTU4NTgxNzM2MCwibmJmIjoxNTgzMjI1MzYwLCJ1aWQiOiIxIn0.a9mxaPOHNHWctp8J3T8-rwrendRfTkS5YJRCmxis3gY' 
window.getAsyncToken=data=>token = data
Vue.prototype.getUserID=()=>{
  if(!token && window.UserHandler){
      window.UserHandler.postMessage(JSON.stringify({type:2, callback:"getAsyncToken"}))  //app获取token
  }
  return token 
}
new Vue({
  el:"#app",
  router,
  ...App
})

