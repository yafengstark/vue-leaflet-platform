<template>
    <div class="container">
        <Tree :data="data4" show-checkbox multiple @on-check-change="changeChecked"></Tree>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件


    export default {
        data() {
            return {
                data4: [
                    {
                        title: '全部图层',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: '基础底图',
                                expand: true,
                                children: [
                                    {
                                        title: 'osm',
                                        checked: true
                                    },
                                    {
                                        title: 'mapbox'
                                    }
                                ]
                            },
                            {
                                title: '覆盖图层',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]

            };
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            }

            ,
            changeChecked(checkedArray, item) {
                console.log('change checked');
//                console.log(checkedArray);
                console.log(item.title);


                if(item.checked){
                    this.$store.state.myMap.addLayer(this.$store.state.myMapHandleObject.layers[item.title]);
                }else{
                    this.$store.state.myMap.removeLayer(this.$store.state.myMapHandleObject.layers[item.title]);
                }




            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>


</style>
