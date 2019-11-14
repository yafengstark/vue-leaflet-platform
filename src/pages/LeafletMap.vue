<template>

    <div class="viewer">

        <!--地球容器-->
        <div style="height: 100%; width: 100%">

            <l-map ref="myMap2"
                   style="height: 80%; width: 100%"
                   :zoom="zoom"
                   :center="center"
                   @update:zoom="zoomUpdated"
                   @update:center="centerUpdated"
                   @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>

            </l-map>
        </div>

        <!--<div ref="logo">-->
        <!--测试-->
        <!--<Button type="primary" @click="info">Display info prompt</Button>-->
        <!--<Col span="12">-->
        <!--<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
        <!--</Col>-->
        <!--</div>-->
        <div ref="toolPanel">
            <map-handle ></map-handle>
        </div>

    </div>


</template>

<script>
    // 导入自己封装的子组件
    import {} from '../api'

    import MapHandle from "../components/map/MapHandle.vue";

    export default {
        data() {
            return {
                mark: null,
                lat: 0,
                lon: 0,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 3,
                center: [47.413220, -1.219482],
                bounds: null,
                markerLatLngs: []
            };
        },
        create() {


        },
        watch: {},
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
            info() {
                this.$Message.info('This is a info tip');
            },
            loadControl() {
                var that = this;

                L.Control.Logo = L.Control.extend({
                    options: {
                        position: 'topright' //初始位置

                    },
                    initialize: function (options) {
                        L.Util.extend(this.options, options);

                    },
                    onAdd: function (map) {
                        //创建一个class为 leaflet-control-container的div

                        this._container = L.DomUtil.create('div', 'leaflet-control-container');
                        var logo = that.$refs.toolPanel;


                        return logo;
                    },
                    /**
                     *
                     * @private
                     */
                    _onCloseControl: function () {
                        this._map.options.Legend = false;
                        this.remove(this._map);
                    },
                });

            },
            async initMap() {

                console.log('setmap before');
                console.log(this.$refs.myMap2.mapObject);
                this.$store.commit('setMap', {map: this.$refs.myMap2.mapObject});
                console.log('setmap end');

                this.loadControl();

                L.control.logo = function (options) {
                    return new L.Control.Logo(options)
                };

                var leafletMap = this.$refs.myMap2.mapObject;
                L.control.logo().addTo(leafletMap);

            },
        },
        mounted() {
            this.initMap();

        },
        components: {
            MapHandle
        }
    };
</script>

<style lang="scss" scoped>

    .viewer {
        width: 100%;
        height: 800px;
    }
</style>
