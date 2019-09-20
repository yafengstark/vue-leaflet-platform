<template>
    <!-- Cesium容器 -->
    <div class="viewer">

         <!--地球容器（开发阶段一注释掉）-->
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


                <l-marker v-for="item in markerLatLngs"
                          :key="item.id"
                          :lat-lng="item" ></l-marker>
            </l-map>
            <!--<div class="info" style="height: 15%">-->
                <!--<span>Center: {{ center }}</span>-->
                <!--<span>Zoom: {{ zoom }}</span>-->
                <!--<span>Bounds: {{ bounds }}</span>-->
            <!--</div>-->
        </div>
    </div>



</template>

<script>
    // 导入自己封装的子组件
    import {
        getmarkDetail,
        removeMark
    } from '../api'


    export default {
        data () {
            return {
                mark: null,
                lat:0,
                lon:0,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 3,
                center: [47.413220, -1.219482],
                bounds: null,
                markerLatLngs: [

                    ]
            };
        },
        create() {
//            this.getInfo();

        },
        watch: {


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
            },
            async getInfo() {

                const responseBody =  await getmarkDetail(this.id);
                if (responseBody.status === 200) {


                    this.mark = responseBody.result.mark;
//                    this.lat =

                    console.log(this.mark);
                    setTimeout(()=>{
                        this.$refs.myMap2.mapObject.flyTo([this.mark.lat, this.mark.lon], 6);
                    }, 1);
                    //                    this.addMarker(this.mark.lat, this.mark.lon);

                    L.marker([this.mark.lat, this.mark.lon]).addTo(this.$refs.myMap2.mapObject)
                        .bindPopup('<h3>'+this.mark.name+'</h3><br> '+ this.mark.description)
                        .openPopup();

                    this.$Message.info('获取标注成功');



                } else {
                    this.$Message.info('获取标注失败！' + responseBody.message);
                }
            },
        },
        mounted() {
//            console.log(this.$refs);
//            console.log(this.$refs.myMap2.mapObject);
//            console.log(this.$refs['myMap']);



            this.getInfo();

//            this.addMarker(30.313220, 120.319482)

        },
        props: ["id"],
    };
</script>

<style lang="scss" scoped>

    .viewer {
        width: 100%;
        height: 300px;
    }
</style>
