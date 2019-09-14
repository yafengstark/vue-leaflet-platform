import VueRouter from 'vue-router'

// 导入路由组件
// import LayerContainer from './components/tabbar/LayerContainer.vue'
// import DataContainer from './components/tabbar/DataContainer.vue'
// import MarkContainer from './components/tabbar/MarkContainer.vue'
// import MeatureContainer from './components/tabbar/MeatureContainer.vue'
// import ModelContainer from './components/tabbar/ModelContainer.vue'
// import SettingContainer from './components/tabbar/SettingContainer.vue'
// import TerrainContainer from './components/tabbar/TerrainContainer.vue'
// import ViewContainer from './components/tabbar/ViewContainer.vue'

// 创建路由对象

//

import Main from '../pages/Main.vue'
import Login from '../pages/Login.vue'

import NewTarget from '../pages/NewTarget.vue'


const router = new VueRouter({
  routes: [
      { path: '/', redirect: '/main'},
      { path: '/main', component: Main},
      { path: '/login', component: Login},
      { path: '/target/new', component: NewTarget}

      // { path: '/layer', component: LayerContainer },



  ],
  linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router