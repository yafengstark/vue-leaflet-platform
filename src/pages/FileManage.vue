<template>
    <div class="container">

        <!--分享{{id}}-->

        文件管理

        <buckets></buckets>


        <h1>上传</h1>
        <Upload
                multiple
                type="drag"
                action="http://127.0.0.1:8081/api/v1/object/disk1">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
        </Upload>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import Buckets from '../components/file/Buckets.vue'


    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            }
        },
        props: ["id"],
        components: {
            // 注册子组件
            Buckets
        }
    };
</script>

<style lang="scss" scoped>

</style>
