<template>
    <div class="handle-container">
        <!--  操作面板 -->

        <div class="button-container">
            <Button type="text" @click="createMark">
                <Icon type="md-create" size="28"/>
                <br/>新建
            </Button>

            <Button type="text">
                <Icon type="md-create" size="28"/>
                <br/>导出
            </Button>


            <Button type="text">
                <Icon type="md-create" size="28"/>
                <br/>导入
            </Button>
        </div>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import MyBackTop from './MyBackTop.vue'

    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            },
            createMark(){
                this.$router.push('/target/new')
            }

        },
        components: {
            // 注册子组件
            MyBackTop

        }
    };
</script>

<style lang="scss" scoped>

    .handle-container {
        width: 300px;

        margin: 0px 10px;
        margin-top: 10px;
        button {
            font-size: 16px;
        }
        .ivu-btn ivu-btn-text {
            width: 20px;
            display: inline-block;

        }
        .button-container{
            margin-top: 30px;
        }
    }

</style>
