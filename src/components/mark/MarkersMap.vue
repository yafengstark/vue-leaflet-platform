<template>
    <!-- Cesium容器 -->
    <div class="viewer">


        <!--地球容器（开发阶段一注释掉）-->
        <div class="map-container">
            <div>
                <l-map ref="myMap2"
                       style="height: 80%; width: 100%"
                       :zoom="zoom"
                       :center="center"
                       @update:zoom="zoomUpdated"
                       @update:center="centerUpdated"
                       @update:bounds="boundsUpdated"
                >
                    <!-- 影像 -->
                    <!--<l-tile-layer :url="url"></l-tile-layer>-->


                    <!--<l-marker v-for="(mark, index) in targetList"-->
                    <!--:key="index"-->
                    <!--:lat-lng="[mark.lat, mark.lon]" ></l-marker>-->

                </l-map>
            </div>

            <!--<div class="info" style="height: 15%">-->
            <!--<span>Center: {{ center }}</span>-->
            <!--<span>Zoom: {{ zoom }}</span>-->
            <!--<span>Bounds: {{ bounds }}</span>-->
            <!--</div>-->
        </div>
        <!--<div class="handle-container">-->
            <!--<handle class="mark-handle"></handle>-->
            <!--<map-handle class="map-handle"></map-handle>-->
        <!--</div>-->
    </div>

</template>

<script>

    import {
        getmarkDetail,
        removeMark
    } from '../../api'

    import Handle from '../Handle.vue'
    import MapHandle from '../map/MapHandle.vue'

    import {mapActions, mapState} from 'vuex'

//    const fullscreen = require("../../../node_modules/leaflet.fullscreen/Control.FullScreen");

    export default {
        data() {
            return {
                mark: null,
                edit_mark_id: -1,
                markerGroup: null,
//                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 1,
                center: [30, 120],
                bounds: null,
                markerLatLngs: []
            };
        },
        computed: {
            ...mapState(['markList']),
        },
        create() {

        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
            },
            centerUpdated(center) {
                this.center = center;
            },
            boundsUpdated(bounds) {
                this.bounds = bounds;
            },
            addMarker(lat, lon) {
                this.markerLatLngs.push([lat, lon]);
            },
            edit() {
                this.$Message.info('' + this.edit_mark_id);
            },
            clear() {
                this.markerGroup.clearLayers();
            },
            loadLayerTreeData() {

                var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18});

                var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    id: 'mapbox.streets'
                });
                this.$store.commit('setLayers', {osm, mapbox})

            }


        },
        watch: {
            "markList": function toggle() {
                //

                if (this.markerGroup != null) {
                    this.clear();
                }

                // 添加标注
                let markers = [];
                this.markList.forEach(mark => {
                    let marker = L.marker([mark.lat, mark.lon]);
                    marker.mark_id = mark.pk_id;

//                    修改是通过跳转链接的方式实现的
                    marker.bindPopup('<h3>' + mark.name + '</h3><br> '
                        + mark.description + '<br><a href=#/mark/' + mark.pk_id + ' target="_blank"> 修改</a> ')
                    ;

                    markers.push(marker);

                });

                this.markerGroup = L.layerGroup(markers);
                this.$refs.myMap2.mapObject.addLayer(this.markerGroup);

                //

            }
        },
        mounted() {




            this.$store.commit('clearMarkList');
            this.$store.dispatch('addMarkList');


            console.log('setmap before');
            console.log(this.$refs.myMap2.mapObject);
            this.$store.commit('setMap', {map: this.$refs.myMap2.mapObject});
            console.log('setmap end');

            this.loadLayerTreeData();
            this.$store.state.myMap.addLayer(this.$store.state.myMapHandleObject.layers['osm']);

            console.log(this.$store.state.myMap);

            const fullscreen = require("../../../node_modules/leaflet.fullscreen/Control.FullScreen");
            this.$store.state.myMap.fullscreenControl = true;
            console.log("his.$store.state.myMap");
            console.log(this.$store.state.myMap);
        },
        components: {
            // 注册子组件
            Handle,
            MapHandle
        }

    };
</script>

<style lang="scss" scoped>
    .viewer {
        display: flex;
        /* 换行方式 */
        flex-wrap: nowrap;
        /* 对齐方式 */
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        .map-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            div {
                /*占据剩余*/
                flex-grow: 1;
            }
            /*height: 600px;*/
            /*minheight: ;*/
        }
        .handle-container {
            /*  不扩展*/
            flex-grow: 0;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            .mark-handle {

            }
            .map-handle {

            }
        }

    }

</style>
