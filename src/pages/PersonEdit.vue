<template>
    <div class="container">

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
                            编辑个人资料
                        </MenuItem>

                    </div>
                </Menu>
            </Header>
            <layout class="person-edit-form">

                <Form :label-width="80">
                    <FormItem label="头像">
                        <img src="../common/images/header-icon.jpg">
                    </FormItem>
                    <FormItem label="姓名">
                        <Input v-model="username" placeholder="Enter something..."></Input>
                    </FormItem>

                    <FormItem label="一句话介绍">
                        <Input v-model="summarize" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="个人简介">
                        <Input v-model="description" type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="私人电话">
                        <Input v-model="mobile" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="办公室电话">
                        <Input v-model="phone" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem label="所属部门">
                        <Input v-model="department" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="edit">修改</Button>
                        <Button style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </layout>
        </Layout>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {
        getCurrentUser,
        editUser
    } from '../api'

    import Layout from "../../node_modules/iview/src/components/layout/layout.vue";

    export default {
        data() {
            return {
                userNo: '',
                username: '',
                summarize: '',
                description: '',
                mobile: '',
                phone: '',
                department: ''
            };
        },
        created() {
            this.getInfo();
        },
        methods: {
            async getlunbotu() {

            },
            async edit() {
                var message = this.$Message;
                var router = this.$router;

                var token = this.$cookies.get("token");
                console.log('token');
                console.log(token);

                const responseBody = await editUser(
                    token,
                    this.username,
                    this.summarize,
                    this.description,
                    this.mobile,
                    this.phone,
                    this.department
                );

                if (responseBody.status === 200) {
                    message.info('修改成功');
                    router.go(-1)
                } else {
                    message.info('修改失败！' + responseBody.message);
                }

            },
            async getInfo() {

                const responseBody = await getCurrentUser(this.$cookies.get('token'));
                if (responseBody.status === 200) {

//                    this.formItem.name = responseBody.result.name;
//                    this.formItem.lat = responseBody.result.lat;
//                    this.formItem.lon = responseBody.result.lon;
//                    this.formItem.description = responseBody.result.description;

                    this.userNo = responseBody.result.userNo;
                    this.username = responseBody.result.username;
                    this.summarize = responseBody.result.summarize;
                    this.description = responseBody.result.description;
                    this.mobile = responseBody.result.mobile;
                    this.phone = responseBody.result.phone;
                    this.department = responseBody.result.department;


                    this.$Message.info('获取成功');

                } else {
                    this.$Message.info('获取失败！' + responseBody.message);
                }
            }
        },
        components: {
            Layout
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .container {
        img {
            width: 80px;
            height: 80px;
        }
        .person-edit-form {
            margin-top: 10px;
            margin-left: 30%;
            margin-right: 30%;
        }
    }

</style>
