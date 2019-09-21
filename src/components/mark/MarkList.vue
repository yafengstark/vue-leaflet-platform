<template>
    <div class="mak-list-container">

        <Layout>
            <Content class='mark-list-scroll'>
                <Scroll :on-reach-bottom="handleReachBottom" class="scroll">
                    <Card dis-hover v-for="(item, index) in markList" :key="index">
                        <router-link :to="'/mark/' + item.pk_id" target="_blank">
                            <div class='footer'>
                                <div class='item'><h1>{{ item.name }}</h1></div>

                                <div>
                                    <router-link  :to="'/share/'+ item.pk_id" target="_blank"><Icon type="md-share-alt" size="24" /></router-link>
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
                </Scroll>

            </Content>


            <Sider class="mark-list-handle">
                <handle></handle>
            </Sider>
        </Layout>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'

    import Handle from '../Handle.vue'

    import MyBackTop from '../MyBackTop.vue'


    export default {
        data() {
            return {}
        },
        mounted() {

            this.$store.dispatch('addMarkList')
        },
        computed: {
            ...mapState(['markList']),
            ...mapActions(['addMarkList']),
        },
        methods: {
            handleReachBottom() {

                return new Promise(resolve => {
                    setTimeout(() => {

                        this.$store.commit('pageIndexIncrement');
                        this.$store.dispatch('addMarkList');
                        resolve();
                    }, 1);
                });
            },
            delete(markId){
                this.$Message.info('delete'+ markId);
            }
        },
        components: {
            // 注册子组件
            Handle,
            MyBackTop
        }
    };
</script>

<style lang="scss">

    .mak-list-container {
        /*height: 90%;*/
        display: flex;
        margin-right: 10px;
        height: 1500px;
        margin-left: 50px;

        .ivu-scroll-container {
            height: 1400px !important;

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
