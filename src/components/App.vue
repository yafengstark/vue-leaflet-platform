<template>
    <div class="app-container">

        <!-- header导航栏 -->

        <!-- center 列表区 -->

        <!-- right 操作区 -->


    </div>
</template>


<script>
    import {mapGetters} from "vuex";





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
        watch: {

        },
        computed: {

        },
        components: {

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
        display: flex;
        padding: 0px;
        // 当有组件切换动效的时候，一瞬间，页面的宽度会变成 正常宽度的 2 倍，此时，需要隐藏超出屏幕宽度的区域
        overflow: hidden;

        .ivu-menu-vertical .ivu-menu-submenu-title-icon {

            opacity: 0;
        }
        .app-nav {


            width: 200px ! important;
            max-width: 200px;
            min-width: 200px;

        }
        .app-view {

        }

        a {
            text-decoration: none;
        }

        .router-link-active {
            text-decoration: none;
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
