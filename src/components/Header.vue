<template>
    <div class="header-contain">
        <!--<a>管理平台</a>-->

        <Menu class="header-menu" mode="horizontal" theme="light" width="auto" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-paper" />
                    标注管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-people" />
                    分类编码
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="ios-paper" />
                    数据统计
                </MenuItem>
                <MenuItem class="header-search" name="4" >
                    <Input suffix="ios-search" placeholder="Enter text" style="width: auto"
                           icon="ios-search"
                           @on-click="search" v-model="targetSubName1"
                    />

                </MenuItem>
                <MenuItem name="5">
                    <Icon type="ios-notifications" size="32" />
                </MenuItem>
                <MenuItem name="6">
                    <Icon type="ios-chatbubbles" size="32"/>
                </MenuItem>

                <MenuItem name="7">
                    <Icon type="ios-person" size="32"/>
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
                targetSubName1:'12'
            };
        },
        created() {

        },
        computed:{

        },
        methods: {
            async getlunbotu() {

            },
            search(){

                const name = this.targetSubName1;
                this.$store.state.messageView('info', 'do search');
                this.$store.commit('setTargetSubName', {name});
                this.$store.commit('clearTargetList');//
                this.$store.dispatch('getMarkList');
            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .header-contain{

        .logo{

        }
        .header-menu {
            display: inline-block;
            width: 100%;
            .header-search{
                width: 30%;
            }
        }

    }


</style>
