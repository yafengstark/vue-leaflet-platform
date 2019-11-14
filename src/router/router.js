import VueRouter from 'vue-router'



// 创建路由对象

// 界面

import Main from '../pages/Main.vue'
import Login from '../pages/Login.vue'

import NewMarker from '../pages/NewMarker.vue'
import MarkerInfo from '../pages/MarkerInfo.vue'

import Share from '../pages/Share.vue'

import PersonEdit from '../pages/PersonEdit.vue'

import LeafletMap from '../pages/LeafletMap.vue'
import LeafletHeatMap from '../pages/LeafletHeatMap.vue'
// 组件

import MarkList from '../components/mark/MarkList.vue'
import MarkersMap from '../components/mark/MarkersMap.vue'

import Person from '../components/Person.vue'
import Setting from '../components/Setting.vue'

import Amount from '../components/analyse/Amount.vue'
import UserRank from '../components/analyse/UserRank.vue'
import MarkRank from '../components/analyse/MarkRank.vue'


import FileManage from '../pages/FileManage.vue'

// 样例
import markercluster from '../pages/example/markercluster/example.vue'
import PathTransformExample from '../pages/example/path-transform/example.vue'

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/main'},
        {
            path: '/main', component: Main, redirect: '/main/list',
            children: [
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'list',
                    component: MarkList
                },
                {path: 'map', component: MarkersMap},
                // 个人主页
                {path: 'person', component: Person},
                // 设置
                {path: 'setting', component: Setting},
                // 分析面板
                {path: 'amount', component: Amount},
                {path: 'userRank', component: UserRank},
                {path: 'markRank', component: MarkRank}
            ]
        },
        {path: '/login', component: Login},
        {path: '/mark/new', component: NewMarker},
        {path: '/mark/:id', component: MarkerInfo, props: true},
        {path: '/share/:id', component: Share, props: true},

        //
        {path: '/person/edit', component: PersonEdit},

        // 样例

        {path: '/example/markercluster/example', component: markercluster},
        {path: '/example/pathtransform/example', component: PathTransformExample},


        // { path: '/layer', component: LayerContainer },

        // leaflet map
        {path: '/map', component: LeafletMap},
        {path: '/heatMap', component: LeafletHeatMap},

        // 文件管理
        {path: '/file', component: FileManage},


    ],
    linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router