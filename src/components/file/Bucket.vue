<template>
    <div class="container">

        <!--分享{{id}}-->

        bucket
        <a v-for="(item, index) in buckets" :key="index"> {{item.Name}}</a>
        

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {
        getBuckets,
    } from '../../api'

    export default {
        data() {
            return {
                bucket: [
                    {Name: 'test'}]
            };
        },
        created() {
            this.getInfo();
        },
        methods: {
            async getInfo() {

                const responseBody = await getBuckets();
                if (responseBody.status === 200) {

                    this.buckets = responseBody.result;


                    this.$Message.info('获取标注成功');

                } else {
                    this.$Message.info('获取标注失败！' + responseBody.message);
                }

            },
        },
        props: ["id"],
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

</style>
