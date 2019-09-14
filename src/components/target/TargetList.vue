<template>
    <div class="target-list-container">

        <Layout>
            <Content class='target-list-scroll'>
                <Scroll :on-reach-bottom="handleReachBottom" class="scroll">
                    <Card dis-hover v-for="(item, index) in targetList" :key="index">

                        <h1>
                            {{ item.name }}
                        </h1>
                        <p>
                            自编号: {{item.pk_id}}
                        </p>
                        <p>
                            位置：{{item.lat}}, {{ item.lon}}
                        </p>
                        <p> 概述：{{ item.summarize }}</p>
                        <p> 分类：{{ item.clazz_code.name }}</p>
                    </Card>
                </Scroll>

            </Content>
            <Sider class="target-list-handle">
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
            return {
            }
        },
        mounted() {

            this.$store.commit('setMessageView', this.$Message);

//            this.getMarkList();
            this.$store.dispatch('getMarkList')

        },
        computed: {
            ...mapState(['targetList']),
            ...mapActions(['getMarkList']),
        },
        methods: {
            handleReachBottom() {

                return new Promise(resolve => {
                    setTimeout(() => {

                        this.$store.commit('pageIndexIncrement');
                        this.$store.dispatch('getMarkList');
                        resolve();
                    }, 1);
                });
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

    .target-list-container {
        /*height: 90%;*/
        margin-right: 10px;
        height: 1500px;

        .ivu-scroll-container {
            height: 1400px !important;

        }

        .target-list-scroll {
            /* 左移动隐藏滚动条 */
            position: relative;
            left: 26px;
            top: -10px;
            right: -17px;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        .target-list-handle {
            /*height: 2000px;*/
            background-color: white;
            /*margin-top: 10px;*/
        }

    }

</style>
