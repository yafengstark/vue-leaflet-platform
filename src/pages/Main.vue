<template>
    <div class="app-container layout">

        <!-- header导航栏 -->

        <!-- center 列表区 -->

        <!-- right 操作区 -->

        <Layout>
            <Header class="app-header">
                <header></header>
            </Header>
            <Layout class="app-content">
                <Content>
                    <target-list></target-list>
                </Content>
            </Layout>

        </Layout>


        <my-back-top></my-back-top>

    </div>
</template>


<script>
    import {mapGetters} from "vuex";


    import Header from "../components/Header.vue";
    import TargetList from "../components/target/TargetList.vue"
    import MyBackTop from '../components/MyBackTop.vue'


    export default {
        data() {
            return {
                flag: true // 默认显示返回按钮
            };
        },
        methods: {
            goBack() {
                // 点击返回按钮，向后跳转
                this.$router.go(-1);
                console.log(this);
            },
            checkToken() {
                let token = this.$cookies.get('token');
                console.log('token')
                console.log(token);
                if (token !== null && token !== undefined && token !== '') {
                    console.log('run here')
                }else{
                    this.$router.push('login')
                }
            }

        },
        created() {

            this.checkToken();



        },
        watch: {},
        computed: {},
        components: {
            Header,
            TargetList,
            MyBackTop
        }
    };
</script>

// 这里写的样式，要符合 scss 语法，并且，样式是 当前组件私有的，不会成为全局的样式，也不会应用给子组件
// 取消scope
<style lang="scss">

    html, body {
        width: 100%;
        height: 100%;
    }

    .app-container {
        width: 100%;
        height: 100%;
        /*display: flex;*/
        padding: 0px;
        // 当有组件切换动效的时候，一瞬间，页面的宽度会变成 正常宽度的 2 倍，此时，需要隐藏超出屏幕宽度的区域
        /*overflow: hidden;*/

        .app-header {

        }
        .app-content {
            padding: 0 16px;
            height: 100%;
            width: 100%;
            float: left;
            background-color: white;
            overflow-y: scroll;
        }

    }

    // 动画效果相关的类样式
    .v-enter {
        opacity: 0;
        // 让即将进入的页面，向右偏移 100% 屏幕的宽度
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        // 让即将进入的页面，向右偏移 100% 屏幕的宽度
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.4s ease;
    }


</style>
