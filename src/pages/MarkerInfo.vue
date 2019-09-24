<template>
    <div class="target-info-container">

        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <router-link to="/main">
                                <Icon type="ios-navigate"></Icon>
                                平台
                            </router-link>

                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            标注详情
                        </MenuItem>

                    </div>
                </Menu>
            </Header>
            <Layout>
                <div class="target-info-form">

                    <h1>{{editMark.name}}</h1>
                    <div class="content">
                        <Card>编号：{{id}}</Card>
                        <Card class="item">
                            <label>
                                位置：经度：{{editMark.lon}}, 纬度：{{editMark.lat}}
                            </label>
                            <!-- 编辑 -->
                            <location-selector></location-selector>


                        </Card>
                        <Card>
                            <label>
                                创建者：{{editMark.username}}
                            </label>
                        </Card>
                        <Card>
                            <label>
                                描述：{{editMark.description}}
                            </label>
                            <!-- 编辑 -->
                            <edit-description></edit-description>
                        </Card>
                        <Card>
                            <label>
                                分类编码：{{editMark.clazzCode}}
                            </label> <a>编辑</a></Card>
                        <Card>
                            <label>
                                创建时间：{{editMark.createTime | dateFormat}}
                            </label></Card>
                        <Card>
                            <label>
                                修改时间：{{editMark.updateTime | dateFormat}}
                            </label></Card>
                    </div>

                    <div class="handle-buttons">
                        <Button type="primary" @click="clickFavorite"> 收藏标注</Button>
                        <Button type="warning" @click="clickDelete">删除标注</Button>
                        <Button type="text">
                            <router-link :to="'/share/'+ editMark.markId" target="_blank">
                                分享
                            </router-link>
                        </Button>
                    </div>


                    <Modal
                            title="确认删除？"
                            v-model="isDeleteClicked"
                            class-name="vertical-center-modal"
                            @on-ok='deleteMark'
                            @on-cancel="cancelDelete"
                    >
                        <p>{{editMark.name}}</p>
                    </Modal>

                    <!--    评论       -->
                    <div class="comments">
                        <comment class="" :id="id"></comment>
                    </div>


                </div>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {
        getmarkDetail,
        removeMark,
        getClazzCode
    } from '../api'


    import MapContainer from '../components/MapContainer.vue'
    import Comment from '../components/mark/Comment.vue'
    import LocationSelector from '../components/mark/edit/LocationSelector.vue'
    import EditDescription from '../components/mark/edit/EditDescription.vue'


    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                isDeleteClicked: false,
                isClazzCodeDrawer: false, //  窗体是否打开,
                clazzCodeArray: []
            };
        },
        computed: {
            ...mapState(['editMark']),
        },
        created() {
            this.$store.commit('checkToken', {token: this.$cookies.get('token')});
            console.log('' + this.$store.state.isPass);
            if (this.$store.state.isPass) {

            } else {
                this.$router.push('/login');
                return;
            }

            this.getInfo()

        },
        methods: {
            async getInfo() {

                const responseBody = await getmarkDetail(this.$cookies.get('token'), this.id);
                if (responseBody.status === 200) {


                    var id = this.id;
                    console.log(responseBody.result.clazzCode);
                    var clazzCodeNum = responseBody.result.clazzCode.clazzCode;
                    //注意，分类码必须是6位数字
                    var clazzCode = [parseInt(clazzCodeNum / 10000), parseInt(clazzCodeNum / 100), clazzCodeNum];

                    this.$store.commit('setEditMark', {
                        markId: id,
                        name: responseBody.result.mark.name,
                        lon: responseBody.result.mark.lon,
                        lat: responseBody.result.mark.lat,
                        username: responseBody.result.username,
                        description: responseBody.result.mark.description,
                        createTime: responseBody.result.mark.gmtCreate,
                        updateTime: responseBody.result.mark.gmtUpdate,
                        clazzCode: clazzCode
                    });


                    this.$Message.info('获取标注成功');

                } else {
                    this.$Message.info('获取标注失败！' + responseBody.message);
                }

            },
            edit() {

            },
            cancel() {
                this.$router.go(-1);
            },
            clickDelete() {
                this.isDeleteClicked = true;
            },
            cancelDelete() {
//                console.log('点击了取消')
//                this.$Message.info('选择了取消');
            },
            async deleteMark() {

                const responseBody = await removeMark(this.id);
                if (responseBody.status === 200) {

                    if (responseBody.result === true) {
                        this.$Message.info('删除成功');

                        const markId = this.id;
                        this.$store.commit('removeTargetFromList', {markId});

                        this.$router.push('/main')
                    } else {
                        this.$Message.info('删除失败');
                    }


                } else {
                    this.$Message.info('删除失败！' + responseBody.message);
                }
            },
            clickFavorite() {
                this.$Message.info('正在开发');
            },
            async getClazzCode() {
                // 获取分类码
                const responseBody2 = await getClazzCode();
                if (responseBody2.status === 200) {


                    console.log(responseBody2.result);

                    this.clazzCodeArray = [];

//                    var typeTreeArray = arr.filter(item => item.indexOf('b')<0)

                    var typeTreeArray = [];
                    responseBody2.result.typeThree.forEach(clazzCode => {
                        typeTreeArray.push({
                                value: clazzCode.clazzCode,
                                label: clazzCode.name,
                                children: []
                            }
                        )
                    });

                    var typeTwoArray = [];
                    responseBody2.result.typeTwo.forEach(clazzCode => {
                        typeTwoArray.push({
                                value: clazzCode.clazzCode,
                                label: clazzCode.name,
                                children: typeTreeArray.filter(item => parseInt(item.value / 100) === clazzCode.clazzCode)
                            }
                        )
                    });

                    var typeOneArray = [];
                    responseBody2.result.typeOne.forEach(clazzCode => {
                        typeOneArray.push({
                                value: clazzCode.clazzCode,
                                label: clazzCode.name,
                                children: typeTwoArray.filter(item => parseInt(item.value / 100) === clazzCode.clazzCode)
                            }
                        )
                    });

                    this.clazzCodeArray = typeOneArray;

                    console.log(typeTreeArray);
                    console.log(typeTwoArray);
                    console.log(typeOneArray);

                    this.$Message.info('获取分类码成功');
                } else {
                    this.$Message.info('获取分类码失败！' + responseBody2.message);
                }
            }

        },
        props: ["id"],
        components: {
            // 注册子组件
            MapContainer,
            Comment,
            LocationSelector,
            EditDescription

        }
    };
</script>

<style lang="scss">
    .target-info-container {
        .target-info-form {
            margin-top: 30px;
            margin-left: 15%;
            margin-right: 15%;
            .ivu-btn {
                margin-left: 15px;
            }

            .vertical-center-modal {
                display: flex;
                align-items: center;
                justify-content: center;

                .ivu-modal {
                    top: 0;
                }
            }
            /* 上部列表 */
            .content {
                .ivu-card-body {
                    display: flex;
                    label {
                        flex-grow: 1;
                    }
                    a {
                        flex-grow: 0;
                    }

                }
                button {
                    color: dodgerblue;
                }
            }
            .handle-buttons {
                margin-top: 20px;
                margin-left: -15px;
            }
        }

        .comments {
            margin-top: 20px;

        }

    }

</style>
