// 项目的JS打包入口文件
// 1. 导入Vue
import Vue from 'vue'

// 导入全局的配置模块，这个模块中的代码，和 main.js 中的 vm 实例，没有关系，只是 全局的 Vue 配置；
// 因此，抽离出去之后，可以让项目解构更加清晰
import './globalConfig.js'



// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入路由对象
import router from './router/router.js'

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import { BackTop } from 'iview';
Vue.component('i-backTop', BackTop);

// leaflet


import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);


delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


// elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 在全局中使用axios做请求了。在globeConfig.js已经做了
// import axios from 'axios'
// Vue.prototype.$axios = axios


// echart
// import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积


// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
// import 'echarts-gl'

// 注册组件后即可使用
// Vue.component('v-chart', ECharts);
// 注册全局的组件
// import testcom from '../test/02.test.vue'
// 这些全局注册的组件，在任何组件中，都可以使用 < 的形式引入到页面中
// Vue.component('mytest', testcom)

// 导入状态管理对象
import store from './store/index.js'

// 导入 根组件
import App from './pages/App.vue'




const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router, // 挂载路由
  store // 挂载 store
});



// import '../test/03.数组的some方法.js'