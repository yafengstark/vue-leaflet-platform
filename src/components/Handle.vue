<template>
    <div class="handle-container">
        <!--  操作面板 -->

        <div class="button-container">
            <Button type="text" @click="">
                <router-link to="/mark/new" target="_blank">
                    <Icon type="md-create" size="28"/>
                    <br/>新建
                </router-link>
            </Button>
            <!--<Button type="text" @click="editMark">-->
            <!--<Icon type="md-create" size="28"/>-->
            <!--<br/>修改-->
            <!--</Button>-->

            <!--TODO: 抽屉实现搜索-->
            <search></search>

            <Button type="text">
                <Icon type="md-download" size="28"/>
                <br/>导出
            </Button>





        </div>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import MyBackTop from './MyBackTop.vue'
    import Search from './mark/Search.vue'

    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {

            };
        },
        computed: {
            ...mapState(['myMapHandleObject']),
        },
        created() {
//            this.formData.rectangle = this.myMapHandleObject.rectangle;
        },
        methods: {
            async getlunbotu() {

            },
            createMark() {
                this.$router.push('/mark/new')
            },
            editMark() {
//                this.$router.push('/target/edit')
            }

        },
        components: {
            // 注册子组件
            MyBackTop,
            Search

        }
    };
</script>

<style lang="scss">

    .handle-container {
        display: flex;

        /*margin: 0px 10px;*/
        margin-top: 10px;
        button {
            font-size: 16px;
        }
        .ivu-btn ivu-btn-text {
            width: 20px;
            display: inline;
        }
        .button-container {
            /*margin-top: 30px;*/
            display: flex;
            flex-wrap: wrap;
            button {
                flex-grow: 0;
                /*flex-shrink: 1;*/
                align-items: flex-start;
            }

        }

    }


</style>
