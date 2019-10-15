<template>
    <div class="mak-list-container">

        <Layout>

            <Content class='mark-list-scroll'>

                <div class="demo-split">
                    <Split v-model="split1">
                        <div slot="left" class="demo-split-pane">

                            <Tabs value="name1">
                                <TabPane label="标注" name="name1">
                                    <Page :total="markAmount" size="small" :page-size-opts="[10]"
                                          show-total show-elevator show-sizer @on-change="changePage"/>
                                    <div>
                                        <Card dis-hover v-for="(item, index) in markList" :key="index">
                                            <router-link :to="'/mark/' + item.pk_id" target="_blank">
                                                <div class='footer'>
                                                    <div class='item'><h1>{{ item.name }}</h1></div>

                                                    <div>
                                                        <router-link :to="'/share/'+ item.pk_id" target="_blank">
                                                            <Icon type="md-share-alt" size="24"/>
                                                        </router-link>
                                                    </div>
                                                </div>
                                                <p>
                                                    自编号: {{item.pk_id}}
                                                </p>
                                                <p>
                                                    位置：{{item.lat}}, {{ item.lon}}
                                                </p>
                                                <p> 概述：{{ item.summarize }}</p>
                                                <!--<p> 分类：{{ item.clazz_code.name }}</p>-->
                                            </router-link>
                                        </Card>
                                    </div>
                                </TabPane>
                                <TabPane label="影像" name="name2">
                                    <imagery-search></imagery-search>


                                </TabPane>
                                <TabPane label="工具" name="name3">
                                    <div class="handle-container">
                                        <handle class="mark-handle"></handle>
                                        <map-handle class="map-handle"></map-handle>
                                    </div>
                                </TabPane>
                            </Tabs>



                        </div>
                        <div slot="right" class="demo-split-pane">
                            <markers-map></markers-map>


                        </div>
                    </Split>
                </div>


            </Content>


            <!--<Sider class="mark-list-handle">-->
                <!--<handle></handle>-->
            <!--</Sider>-->
        </Layout>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import Handle from '../Handle.vue'
    import MarkersMap from '../mark/MarkersMap.vue'
    import MapHandle from '../map/MapHandle.vue'
    import ImagerySearch from '../map/ImagerySearch.vue'

    import MyBackTop from '../MyBackTop.vue'


    export default {
        data() {
            return {
                split1: 0.3
            }
        },
        mounted() {
            this.$store.dispatch('addMarkList')
        },
        computed: {
            ...mapState(['markList', 'markAmount']),
            ...mapActions(['addMarkList']),
        },
        methods: {
            changePage(index) {
                console.log('change page' + index);

                this.$store.commit('setPageIndex', {index: index});
                this.$store.dispatch('addMarkList')
            },
            handleReachBottom() {

                return new Promise(resolve => {
                    setTimeout(() => {

                        this.$store.commit('pageIndexIncrement');
                        this.$store.dispatch('addMarkList');
                        resolve();
                    }, 1);
                });
            },
            delete(markId) {
                this.$Message.info('delete' + markId);
            }
        },
        components: {
            // 注册子组件
            Handle,
            MarkersMap,
            MapHandle,
            ImagerySearch,
            MyBackTop
        }
    };
</script>

<style lang="scss">

    .mak-list-container {
        /*height: 90%;*/
        display: flex;
        /*margin-right: 10px;*/
        /*height: 1500px;*/
        /*margin-left: 10px;*/

        .ivu-scroll-container {
            /*height: 1400px !important;*/

        }

        .mark-list-scroll {
            /* 左移动隐藏滚动条 */
            position: relative;
            left: 1px;
            top: -10px;
            right: -17px;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            .footer {
                display: flex;
                .item {
                    flex: 1;
                }
            }

            .demo-split {
                height: 800px;
                border: 1px solid #dcdee2;

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
            .demo-split-pane {
                padding: 10px;
                height: 100%;
            }
        }
        .mark-list-handle {
            /*height: 2000px;*/
            background-color: white;
            /*margin-top: 10px;*/
        }

        a {
            color: #464646;
        }
    }

</style>
