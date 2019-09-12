<template>
    <!-- Cesium容器 -->
    <div class="viewer">

         地球容器（开发阶段一注释掉）
        <!--<div style="height: 100%; width: 100%">-->

            <!--<l-map ref="myMap2"-->
                    <!--style="height: 80%; width: 100%"-->
                    <!--:zoom="zoom"-->
                    <!--:center="center"-->
                    <!--@update:zoom="zoomUpdated"-->
                    <!--@update:center="centerUpdated"-->
                    <!--@update:bounds="boundsUpdated"-->

            <!--&gt;-->
                <!--<l-tile-layer :url="url"></l-tile-layer>-->


                <!--<l-marker v-for="item in markerLatLngs"-->
                          <!--:key="item.id"-->
                          <!--:lat-lng="item" ></l-marker>-->
            <!--</l-map>-->
            <!--<div class="info" style="height: 15%">-->
                <!--<span>Center: {{ center }}</span>-->
                <!--<span>Zoom: {{ zoom }}</span>-->
                <!--<span>Bounds: {{ bounds }}</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>



</template>

<script>
    // 导入自己封装的子组件


    export default {
        data () {
            return {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 3,
                center: [47.413220, -1.219482],
                bounds: null,
                markerLatLngs: [

                    ]
            };
        },
        methods: {
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            boundsUpdated (bounds) {
                this.bounds = bounds;
            },
            addMarker(lat, lon) {
                this.markerLatLngs.push([lat, lon]);
            }
        },
        mounted() {
            console.log('map')
            console.log(this.$refs)
            console.log(this.$refs.myMap2.center)
            console.log(this.$refs['myMap'])

            this.addMarker(47.313220, -1.319482)
            this.addMarker(30.313220, 120.319482)

        },
    };
</script>

<style lang="scss" scoped>

    .viewer {
        width: 100%;
        height: 100%;
    }
</style>
