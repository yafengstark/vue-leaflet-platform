<template>

    <!-- 路由的容器 -->
    <transition class="app-view" >
        <router-view></router-view>
    </transition>
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

        },
        created() {

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



</style>
