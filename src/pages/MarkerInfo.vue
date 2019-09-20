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
                            修改与删除
                        </MenuItem>

                    </div>
                </Menu>
            </Header>
            <Layout>
                <div class="target-info-form">


                    <Form :model="formItem" :label-width="80">
                        <FormItem label="名称">
                            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="经度、纬度">
                            <Input v-model="formItem.lon" placeholder="Enter something..."></Input>
                            <Input v-model="formItem.lat" placeholder="Enter something..."></Input>
                            <map-container :id="id"></map-container>
                        </FormItem>
                        <FormItem label="分类编码">
                            <input v-model="formItem.clazzCode"></input>
                            <Button type="primary" @click="isClazzCodeDrawer = true">选择</Button>
                        </FormItem>
                        <Drawer title="分类编码" :closable="false" v-model="isClazzCodeDrawer">
                            <Cascader :data="clazzCodeArray" v-model="formItem.clazzCode"></Cascader>
                        </Drawer>
                        <!--<FormItem label="DatePicker">-->
                        <!--<Row>-->
                        <!--<Col span="11">-->
                        <!--<DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>-->
                        <!--</Col>-->
                        <!--<Col span="2" style="text-align: center">-</Col>-->
                        <!--<Col span="11">-->
                        <!--<TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>-->
                        <!--</Col>-->
                        <!--</Row>-->
                        <!--</FormItem>-->
                        <FormItem label="是否为国外">
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="male">Male</Radio>
                                <Radio label="female">Female</Radio>
                            </RadioGroup>
                        </FormItem>
                        <!--<FormItem label="Checkbox">-->
                        <!--<CheckboxGroup v-model="formItem.checkbox">-->
                        <!--<Checkbox label="Eat"></Checkbox>-->
                        <!--<Checkbox label="Sleep"></Checkbox>-->
                        <!--<Checkbox label="Run"></Checkbox>-->
                        <!--<Checkbox label="Movie"></Checkbox>-->
                        <!--</CheckboxGroup>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="Switch">-->
                        <!--<i-switch v-model="formItem.switch" size="large">-->
                        <!--<span slot="open">On</span>-->
                        <!--<span slot="close">Off</span>-->
                        <!--</i-switch>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="Slider">-->
                        <!--<Slider v-model="formItem.slider" range></Slider>-->
                        <!--</FormItem>-->
                        <FormItem label="概要">
                            <Input v-model="formItem.summarizeTextarea" type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="描述">
                            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="edit">修改</Button>
                            <Button type="default" @click="cancel">取消</Button>
                            <Button type="warning" @click="clickDelete">删除</Button>
                        </FormItem>

                        <Modal
                                title="确认删除？"
                                v-model="isDeleteClicked"
                                class-name="vertical-center-modal"
                                @on-ok='deleteMark'
                                @on-cancel="cancelDelete"
                        >
                            <p>{{formItem.name}}</p>
                        </Modal>

                        <!--    评论       -->
                        <div class="comments">
                            <comment class="" :id="id"></comment>
                        </div>


                    </Form>
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
    import Comment from '../components/target/Comment.vue'

    export default {
        data() {
            return {
                formItem: {
                    name: '',
                    lon: 0,
                    lat: 0,
                    clazzCode: [],
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    summarizeTextarea: '',
                    description: ''
                },
                isDeleteClicked: false,
                isClazzCodeDrawer: false, //  窗体是否打开,
                clazzCodeArray: []
            };
        },
        created() {
            this.$store.commit('checkToken', {token: this.$cookies.get('token')});
            console.log(''+this.$store.state.isPass);
            if(this.$store.state.isPass){

            }else{
                this.$router.push('/login');
                return;
            }

            this.getInfo()

        },
        methods: {
            async getInfo() {

                const responseBody = await getmarkDetail(this.id);
                if (responseBody.status === 200) {

                    this.formItem.name = responseBody.result.mark.name;
                    this.formItem.lat = responseBody.result.mark.lat;
                    this.formItem.lon = responseBody.result.mark.lon;
                    this.formItem.description = responseBody.result.mark.description;

                    console.log(responseBody.result.clazzCode);
                    var clazzCodeNum = responseBody.result.clazzCode.clazzCode;
                    this.formItem.clazzCode = [parseInt(clazzCodeNum/10000),parseInt(clazzCodeNum/100), clazzCodeNum];
//                  注意，分类码必须是6位数字

                    this.$Message.info('获取标注成功');

                } else {
                    this.$Message.info('获取标注失败！' + responseBody.message);
                }


                // 获取分类码
                const responseBody2 = await getClazzCode();
                if (responseBody2.status === 200) {



                    console.log(responseBody2.result);

                    this.clazzCodeArray = [];

//                    var typeTreeArray = arr.filter(item => item.indexOf('b')<0)

                    var typeTreeArray =[];
                    responseBody2.result.typeThree.forEach(clazzCode =>{
                        typeTreeArray.push({
                            value: clazzCode.clazzCode,
                            label: clazzCode.name,
                            children: [

                            ]
                        }
                        )
                    });

                    var typeTwoArray = [];
                    responseBody2.result.typeTwo.forEach(clazzCode =>{
                        typeTwoArray.push({
                                value: clazzCode.clazzCode,
                                label: clazzCode.name,
                                children: typeTreeArray.filter(item => parseInt(item.value/100) === clazzCode.clazzCode)
                            }
                        )
                    });

                    var typeOneArray = [];
                    responseBody2.result.typeOne.forEach(clazzCode =>{
                        typeOneArray.push({
                                value: clazzCode.clazzCode,
                                label: clazzCode.name,
                                children: typeTwoArray.filter(item => parseInt(item.value/100) === clazzCode.clazzCode)
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
//                this.$Message.info('选择了确定');
//
//                return;

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
            }

        },
        props: ["id"],
        components: {
            // 注册子组件
            MapContainer,
            Comment

        }
    };
</script>

<style lang="scss" scoped>
    .target-info-container {
        .target-info-form {
            margin-top: 30px;
            margin-left: 50px;
            margin-right: 50px;
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
        }

        .comments{
        }

    }

</style>
