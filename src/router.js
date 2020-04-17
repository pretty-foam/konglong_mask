import Vue from 'vue'
import Router from 'vue-router'

const problem_sub = ()=>import('./views/problem/Submission.vue')  //编辑地址
const problem_table = ()=>import('./views/problem/table.vue')  //编辑地址
const problem_query = ()=>import('./views/problem/query.vue')  //查询反馈

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base:'/',
  routes: [
    {path:"/problem",component:problem_sub,name:'problem_sub',meta:{title:'恐龙有钱-用户反馈'}},
    {path:"/problem_table",component:problem_table,name:'problem_table',meta:{title:'恐龙有钱-用户反馈表格'}},
    {path:"/problem_query",component:problem_query,name:'problem_query',meta:{title:'恐龙有钱-用户反馈'}},

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