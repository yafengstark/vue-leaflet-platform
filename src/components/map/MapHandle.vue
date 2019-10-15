<template>
    <div class="map-handle-container">

        <Collapse>
            <Panel name="1">
                快速跳转
                <p slot="content">
                    <fly></fly>
                </p>
            </Panel>
            <Panel name="2">
                画框选择
                <p slot="content">
                    <label>最小经度：</label><Input class="input" v-model="location.minLon"
                                               placeholder="120" style="width: 300px"/>
                    <label>最大经度：</label><Input class="input" v-model="location.maxLon"
                                               placeholder="120" style="width: 300px"/>
                    <label>最小纬度：</label><Input class="input" v-model="location.minLat"
                                               placeholder="120" style="width: 300px"/>
                    <label>最大纬度：</label><Input class="input" v-model="location.maxLat"
                                               placeholder="120" style="width: 300px"/>
                    <Button type="primary" size="small" @click="addRectArea">选择</Button>
                    <Button type="primary" size="small" @click="clearFrame">取消</Button>
                </p>
            </Panel>
            <Panel name="3">
                图层控制
                <p slot="content">
                    <layer-tree></layer-tree>
                </p>
            </Panel>
            <Panel name="4">
                影像检索
                <p slot="content">

                </p>
            </Panel>

        </Collapse>

        <div>
            鼠标选点
            <i-switch v-model="switch1" @on-change="switchChange"/>

        </div>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import Fly from './Fly.vue'
    import LayerTree from './LayerTree.vue'
    import ImagerySearch from './ImagerySearch.vue'

    import {mapActions, mapState} from 'vuex'
    import ISwitch from "../../../node_modules/iview/src/components/switch/switch.vue";

    export default {

        data() {
            return {
                location: {
                    minLon: -180,
                    maxLon: 180,
                    minLat: -90,
                    maxLat: 90
                },
                switch1: false
            };
        },
        created() {

        },
        computed: {
            ...mapState(['myMapHandleObject']),
        },
        methods: {
            clickShowLocation: function (e) {
                var mypop = L.popup();
                var map = this.$store.state.myMap;

                console.log(e.latlng);
                var content = '该点位置（经度,纬度)：<br>';
                content = content + e.latlng.lng + ',' + e.latlng.lat;
                mypop.setLatLng(e.latlng)
                    .setContent(content)
                    .openOn(map);
            },
            handleLocation() {
                let bounds = this.location.rectangle._bounds;
                this.locations['maxLat'] = bounds.getNorth();
                this.locations['maxLon'] = bounds.getEast();
                this.locations['minLat'] = bounds.getSouth();
                this.locations['minLon'] = bounds.getWest();

                console.log(this.location);


                this.$store.commit('setMyMapRect', {
                    minLon: bounds.getWest(),
                    maxLon: bounds.getEast(),
                    minLat: bounds.getSouth(),
                    maxLat: bounds.getNorth()
                });


            },
            switchChange(status) {
                this.$Message.info('开关状态：' + status);
                var map = this.$store.state.myMap;
                if (status) {
                    map.on('click', this.clickShowLocation);
                } else {
                    map.off('click', this.clickShowLocation);
                }

            }
            ,
            addRectArea() {
                var that = this; // 为了传递到函数中
                var map = that.$store.state.myMap; //获取已保存的地图
                if (that.stopRectArea != null) {  //stopRectArea在data中定义，清除重复的拉框操作
                    map.off('mousedown', that.stopRectArea.mousedown);
                }
                var rectangleMeasure = {
                    startPoint: null,
                    endPoint: null,
                    rectangle: null,
                    layer: L.layerGroup(),
                    color: "red",
                    addRectangle: function () {
                        rectangleMeasure.destory();
                        var bounds = [];
                        bounds.push(rectangleMeasure.startPoint);
                        bounds.push(rectangleMeasure.endPoint);
                        rectangleMeasure.rectangle = L.rectangle(bounds, {color: rectangleMeasure.color, weight: 1});
                        rectangleMeasure.rectangle.addTo(rectangleMeasure.layer);

                        var northWestPoint = rectangleMeasure.rectangle.getBounds().getNorthWest(),
                            northEastPoint = rectangleMeasure.rectangle.getBounds().getNorthEast(),
                            southEastPoint = rectangleMeasure.rectangle.getBounds().getSouthEast();
                        var width = northWestPoint.distanceTo(northEastPoint) / 1000,
                            height = northEastPoint.distanceTo(southEastPoint) / 1000;
                        var area = Number(width) * Number(height);
                        rectangleMeasure.layer.addTo(map);
                    },
                    mousedown: function (e) {

                        // 一次只绘制一个
                        if (that.location.layer !== undefined) {
                            that.location.layer.removeLayer(that.location.rectangle);
                        }

                        rectangleMeasure.rectangle = null;
                        map.dragging.disable();
                        rectangleMeasure.startPoint = e.latlng;
                        map.on('mousemove', rectangleMeasure.mousemove)
                    },
                    mousemove: function (e) {
                        rectangleMeasure.endPoint = e.latlng;
                        rectangleMeasure.addRectangle();
                        map.off('mousedown ', rectangleMeasure.mousedown).on('mouseup', rectangleMeasure.mouseup);
                    },
                    // 鼠标抬起
                    mouseup: function (e) {
                        // 恢复拖拽
                        map.dragging.enable();
                        // 取消move监听
                        map.off('mousemove', rectangleMeasure.mousemove).off('mouseup', rectangleMeasure.mouseup);
                        that.locations = that.location; //locations在data中定义
//                        that.locations['maxLat'] = rectangleMeasure.startPoint.lat;
//                        that.locations['maxLon'] = rectangleMeasure.startPoint.lng;
//                        that.locations['minLat'] = rectangleMeasure.endPoint.lat;
//                        that.locations['minLon'] = rectangleMeasure.endPoint.lng;
                        that.locations['layer_id'] = rectangleMeasure.layer._leaflet_id;
                        that.locations['layer'] = rectangleMeasure.layer;
                        that.locations['rectangle'] = rectangleMeasure.rectangle;
                        //在此处对数据进行处理（1）...
//                        that.allLocations.push()

                        that.handleLocation();

                    },
                    destory: function () {
                        if (rectangleMeasure.rectangle)
                            rectangleMeasure.layer.removeLayer(rectangleMeasure.rectangle);
                    }
                };
                that.stopRectArea = rectangleMeasure; //记录已点击拉框按钮，未在地图上拉框
                map.on('mousedown', rectangleMeasure.mousedown); //在地图上拉框
            },
            //清除框选
            clearFrame() {
                var that = this;
                console.log('clearFrame');
                if (that.stopRectArea != null) {
                    var map = that.$store.state.myMap;
                    map.off('mousedown', that.stopRectArea.mousedown);
                }
                //清除选框
                console.log(that.location);

                if (that.location.layer !== undefined) {
                    that.location.layer.removeLayer(that.location.rectangle);
                }

//                for (var i in that.allLocations) { //将（1）处保存框选图层数据，在此处删除图层
//                    console.log(i);
//                    that.allLocations[i].layer.removeLayer(that.allLocations[i].rectangle);
//                }
            },
        },
        components: {
            // 注册子组件
            ISwitch,
            Fly,
            LayerTree,
            ImagerySearch
        }
    };
</script>

<style lang="scss" scoped>

    .map-handle-container {
        width: 100%;
    }
</style>
