<template>
    <div class="target-list-container">

        <Layout>
            <Content class='target-list-scroll'>
                <Scroll :on-reach-bottom="handleReachBottom" class="scroll">
                    <Card dis-hover v-for="(item, index) in list1" :key="index">

                        <h1>
                            {{ item.name }}
                        </h1>
                        <h2>
                            {{item.pk_id}}
                        </h2>
                        <h2>
                            {{item.lat}}, {{ item.lon}}
                        </h2>
                        <p> {{ item.summarize }}</p>
                        <p> {{ item.description }}</p>
                        <p>{{ item.clazz_code.name }}</p>
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

    import Handle from '../Handle.vue'

    import MyBackTop from '../MyBackTop.vue'

    export default {
        data() {
            return {
                list1: [{
                    pk_id: 1,
                    name: '上海市公司',
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }, {
                    pk_id: 1,
                    name: '上海市公司',
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }, {
                    pk_id: 1,
                    name: '上海市公司',
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }, {
                    pk_id: 1,
                    name: '上海市公司',
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }, {
                    pk_id: 1,
                    name: '上海市公司',
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }
                    , {
                        pk_id: 1,
                        name: '上海市公司',
                        lat: 120,
                        lon: 120,
                        summarize: '100人',
                        description: '是第一个成立的子公司',
                        clazz_code: {
                            id: 100,
                            name: '一级部门'
                        }
                    }, {
                        pk_id: 1,
                        name: '上海市公司',
                        lat: 120,
                        lon: 120,
                        summarize: '100人',
                        description: '是第一个成立的子公司',
                        clazz_code: {
                            id: 100,
                            name: '一级部门'
                        }
                    }, {
                        pk_id: 1,
                        name: '上海市公司',
                        lat: 120,
                        lon: 120,
                        summarize: '100人',
                        description: '是第一个成立的子公司',
                        clazz_code: {
                            id: 100,
                            name: '一级部门'
                        }
                    }, {
                        pk_id: 1,
                        name: '上海市公司',
                        lat: 120,
                        lon: 120,
                        summarize: '100人',
                        description: '是第一个成立的子公司',
                        clazz_code: {
                            id: 100,
                            name: '一级部门'
                        }
                    }, {
                        pk_id: 1,
                        name: '上海市公司',
                        lat: 120,
                        lon: 120,
                        summarize: '100人',
                        description: '是第一个成立的子公司',
                        clazz_code: {
                            id: 100,
                            name: '一级部门'
                        }
                    }]
            }
        },
        created() {

        },
        methods: {
            handleReachBottom() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.list1[this.list1.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list1.push(
                                {
                                    pk_id: i,
                                    name: '上海市公司',
                                    lat: 120,
                                    lon: 120,
                                    summarize: '100人',
                                    description: '是第一个成立的子公司',
                                    clazz_code: {
                                        id: 100,
                                        name: '一级部门'
                                    }
                                }
                            );
                        }
                        resolve();
                    }, 2000);
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
        height: 2000px;

        .ivu-scroll-container {
            height: 2000px !important;

        }

        .target-list-scroll{
            /* 左移动隐藏滚动条 */
            position: relative;
            left: 26px;
            top: -10px;
            right: -17px;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        .target-list-handle{
            /*height: 2000px;*/
            background-color: white;
            /*margin-top: 10px;*/
        }

    }

</style>
