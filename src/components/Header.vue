<template>
    <div class="header-contain">
        <!--<a>管理平台</a>-->

        <Menu class="header-menu" mode="horizontal" theme="light" width="auto" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <router-link to="/main/list">
                        <Icon type="ios-paper"/>
                        标注
                    </router-link>
                </MenuItem>
                <!--<MenuItem name="2">-->
                <!--<router-link to="/main/map">-->
                <!--<Icon type="ios-people"/>-->
                <!--地图模式-->
                <!--</router-link>-->
                <!--</MenuItem>-->
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">
                            <router-link to="/main/amount">
                                总概况
                            </router-link>
                        </MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="排行榜">
                        <MenuItem name="3-4">
                            <router-link to="/main/userRank">用户排行榜</router-link>
                        </MenuItem>
                        <MenuItem name="3-5">
                            <router-link to="/main/markRank">标注排行榜</router-link>
                        </MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem class="header-search" name="4">
                    <Input suffix="ios-search" placeholder="Enter text" style="width: auto"
                           icon="ios-search"
                           @on-click="search" v-model="markSubName1"
                    />

                </MenuItem>
                <MenuItem name="5">
                    <Icon type="ios-notifications" size="32"/>
                </MenuItem>
                <MenuItem name="6">
                    <Icon type="ios-chatbubbles" size="32"/>
                </MenuItem>
                <Submenu name="7">
                    <template slot="title">
                        <Icon type="ios-person" size="32"/>
                    </template>
                    <MenuItem name="7-1" to="/main/person">个人主页</MenuItem>
                    <MenuItem name="7-2" to="/main/setting">设置</MenuItem>
                    <MenuItem name="7-3"><a @click="logout">退出</a></MenuItem>
                    <!--<MenuGroup title="使用">-->
                    <!--<MenuItem name="3-1">新增和启动</MenuItem>-->
                    <!--<MenuItem name="3-2">活跃分析</MenuItem>-->
                    <!--<MenuItem name="3-3">时段分析</MenuItem>-->
                    <!--</MenuGroup>-->
                    <!--<MenuGroup title="留存">-->
                    <!--<MenuItem name="3-4">用户留存</MenuItem>-->
                    <!--<MenuItem name="3-5">流失用户</MenuItem>-->
                    <!--</MenuGroup>-->
                </Submenu>

                <MenuItem name="8">
                    <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen ? `取消全屏`:`全屏`" placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                </MenuItem>
            </div>

        </Menu>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                markSubName1: '',
                fullscreen: false
            };
        },
        created() {

        },
        computed: {},
        methods: {
            search() {
                const name = this.markSubName1;
                this.$store.state.messageView('info', 'do search');
                this.$store.commit('setMarkSubName', {name: name});
                this.$store.commit('clearMarkList');//
                this.$store.dispatch('addMarkList');
            },
            logout() {
                this.$cookies.remove('token');
                this.$router.push('/login');
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .header-contain {

        .logo {

        }
        .header-menu {
            display: flex;
            width: 100%;
            .layout-nav {
                display: flex;
                width: 100%;
                .ivu-menu-submenu {
                    flex-grow: 0;
                }
                .header-search {
                    flex-grow: 1;
                }

                a {
                    color: #464646;
                }

            }
            .btn-fullscreen{
                font-size: 24px;
            }
        }

    }


</style>
