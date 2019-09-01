<template>
    <!-- Cesium容器 -->
    <div class="viewer">
        <!--<cesium-viewer @ready="ready" ref="cesium"> </cesium-viewer>-->
         <!--地球容器（开发阶段一注释掉）-->
        <div style="height: 100%; width: 100%">

            <l-map
                    style="height: 80%; width: 100%"
                    :zoom="zoom"
                    :center="center"
                    @update:zoom="zoomUpdated"
                    @update:center="centerUpdated"
                    @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
            </l-map>
            <div class="info" style="height: 15%">
                <span>Center: {{ center }}</span>
                <span>Zoom: {{ zoom }}</span>
                <span>Bounds: {{ bounds }}</span>
            </div>
        </div>
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
                bounds: null
            };
        },
        created() {
            console.log('map')
            console.log(this.$refs.myMap)
            var marker = L.marker([51.5, -0.09]).addTo(this.$refs.myMap);

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
            }
        }
    };
</script>

<style lang="scss" scoped>

    .viewer {
        width: 100%;
        height: 100%;
    }
</style>
