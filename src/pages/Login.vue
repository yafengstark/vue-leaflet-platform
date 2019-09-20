<template>
    <div class="login-container" style="">
        <div id="canvascontainer" ref='can'></div>

        <div class="login-div">

            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem>
                    <h1>XX平台</h1>
                </FormItem>
                <br/>
                <FormItem prop="userName">
                    <Input type="text" v-model="formInline.userName" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br/>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br/>
                <FormItem>
                    <Button class="login-button" type="primary" @click="handleSubmit">登录</Button>
                </FormItem>
            </Form>
        </div>


    </div>
</template>

<script>

    import {
        login,
    } from '../api'

    export default {
        data() {
            return {
                formInline: {
                    userName: '',
                    password: ''
                },
                ruleInline: {
                    userName: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 1,
                            message: '密码长度最少6位',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            async handleSubmit() {
//                this.$Message.info('开始登录');
                var message = this.$Message;
                var router = this.$router;
                let cookies = this.$cookies;


                const responseBody =  await login(this.formInline.userName, this.formInline.password);


                if (responseBody.status === 200) {
                    cookies.set('userNo', responseBody.result.user.userNo);
                    cookies.set('username', responseBody.result.user.username);
                    cookies.set('token', responseBody.result.user.token);

                    this.$store.commit('setUser',{
                        userNo: responseBody.result.user.userNo,
                        username: responseBody.result.user.username,
                        token: responseBody.result.user.token
                    });

                    message.info('登录成功');
                    router.push('main')
                } else {
                    message.info('登录失败！' + responseBody.message);
                }

            }
        }
    };
</script>

<style lang="scss" scoped>

    .login-container {
        height: 100%;
        background-color: #141a48;
        margin: auto;
        overflow: hidden;
        .login-div {
            position: relative;
            left: 40%;
            top: 40%;
            h1 {
                font-size: 36px;
                margin: auto;
            }
        }
        .login-button {
            width: 170px;
        }
    }

</style>
