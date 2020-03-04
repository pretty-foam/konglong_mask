import Vue from 'vue'
import Router from 'vue-router'

const home = ()=>import('./views/home')  //书城首页
const editAdress = ()=>import('./views/editAdress')  //编辑地址


Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base:'/',
  routes: [
    {path:"/",redirect:'/home'},
    {path:"/home",component:home,name:'home',meta:{title:'每天免费送10万只口罩'}},
    {path:"/editAdress",component:editAdress,name:'editAdress',meta:{title:'填写收货地址'}},
  ],
  scrollBehavior () {
    // return 期望滚动到哪个的位置
    // return{x:0,y:0}
  },
})

router.beforeEach((to,from,next)=>{
    //添加标题
  window.document.title = to.meta.title
  next()
})


export default router