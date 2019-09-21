<template>
    <div class="fly-container">

        <label>经度：</label><Input class="input" v-model="lon" placeholder="120" style="width: 300px" />
        <label>纬度：</label><Input class="input" v-model="lat" placeholder="120" style="width: 300px" />
        <label>高度：</label>
        <Select v-model="zoom" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" size="small" @click="fly">跳转</Button>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件


    export default {
        data() {
            return {
                lon: 120,
                lat: 30,
                cityList: [
                    {
                        value: 1,
                        label: '全球'
                    },
                    {
                        value: 4,
                        label: '国家'
                    },
                    {
                        value: 7,
                        label: '省'
                    },
                    {
                        value: 9,
                        label: '市'
                    },
                    {
                        value: 12,
                        label: '县'
                    },
                    {
                        value: 14,
                        label: '村镇'
                    }
                ],
                zoom: 0,
            };
        },
        created() {

        },
        methods: {
            fly() {

                // TODO: check
                let lat = this.lat;
                let lon = this.lon;
                let zoom = this.zoom;
                this.$store.commit('fly',{lat, lon, zoom});
            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .fly-container {
        display: flex;
        /* 改变主轴*/
        flex-direction: column;
        justify-content: center;
        width: 200px;
        .input{
            width: 200px !important;

        }

    }
</style>
