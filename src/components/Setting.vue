<template>
    <div class="container">

        <el-tabs tab-position="left" style="" type="border-card">
            <el-tab-pane label="重置密码">

                <Form  :label-width="80">
                    <FormItem label="旧密码" >
                        <Input type="password" v-model="formPassword.passwordOld"></Input>
                    </FormItem>
                    <FormItem label="新密码" >
                        <Input type="password" v-model="formPassword.passwordNew"></Input>
                    </FormItem>
                    <FormItem label="确认新密码" >
                        <Input type="password" v-model="formPassword.passwordNewRe"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit()">修改</Button>
                        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
                    </FormItem>

                </Form>

            </el-tab-pane>
            <el-tab-pane label="隐私">隐私


            </el-tab-pane>
            <el-tab-pane label="偏好设置">偏好设置</el-tab-pane>
            <el-tab-pane label="消息与提示">消息与提示</el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {
        resetPassword
    } from '../api'


    export default {
        data() {
            return {
                formPassword: {
                    passwordOld: '',
                    passwordNew: '',
                    passwordNewRe: ''
                },
            };
        },
        created() {

        },
        methods: {
            async handleSubmit () {
                if(this.formPassword.passwordNew !== this.formPassword.passwordNewRe){
                    this.$Message.warning('两次输入的密码不同');
                    return;
                }

                var message = this.$Message;
                var router = this.$router;

                var token = this.$cookies.get("token");
                console.log('token');
                console.log(token);

                const responseBody = await resetPassword(
                    token,
                    this.formPassword.passwordOld,
                    this.formPassword.passwordNew,
                    this.formPassword.passwordNewRe
                );

                if (responseBody.status === 200) {
                    message.info('修改成功');
                } else {
                    message.info('修改失败！' + responseBody.message);
                }


            },
            handleReset () {
                this.formPassword.passwordOld =  '';
                this.formPassword.passwordNew= '';
                this.formPassword.passwordNewRe = '';

            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
        height: 600px;
    }

</style>
