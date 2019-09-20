<template>
    <div class="container">

        分享{{id}}

        <map-container :id="id"></map-container>
    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import MapContainer from '../components/MapContainer.vue'


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
            MapContainer
        }
    };
</script>

<style lang="scss" scoped>

</style>
