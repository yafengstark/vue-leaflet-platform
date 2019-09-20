<template>
    <div class="layout target-new-container">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            平台
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            新建标注
                        </MenuItem>

                    </div>
                </Menu>
            </Header>
            <Layout>
                <div class="target-new-form">



                    <Form :model="formItem" :label-width="80">
                        <FormItem label="名称">
                            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="经度">
                            <Input v-model="formItem.lon" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="纬度">
                            <Input v-model="formItem.lat" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="分类编码">
                            <Select v-model="formItem.select">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
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
                            <Input v-model="formItem.summarizeTextarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="描述">
                            <Input v-model="formItem.descriptionTextArea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="create">新建</Button>
                            <Button style="margin-left: 8px" @click="cancel">取消</Button>
                        </FormItem>
                    </Form>
                </div>
            </Layout>
        </Layout>
    </div>

</template>

<script>
    //
    import {
        createMark,
    } from '../api'


    export default {
        data() {
            return {
                formItem: {
                    name: '',
                    lon: 0,
                    lat: 0,
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    summarizeTextarea: '',
                    descriptionTextArea:''
                }
            };
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            },
            cancel() {
                this.$router.go(-1);
            },
            async create(){
                var message = this.$Message;
                var router = this.$router;

                const responseBody =  await createMark( {
                    lon: this.formItem.lon,
                    lat: this.formItem.lat,
                    name: this.formItem.name,
                    description: this.formItem.description

                });

                if (responseBody.status === 200) {
                    message.info('新建成功');
                    router.push('/main')
                } else {
                    message.info('新建失败！'+ body.message);
                }

            }


        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .target-new-container{
        .target-new-form{
            margin-top: 30px;
            margin-left: 30%;
            margin-right: 30%;
        }
    }

</style>
