<template>
    <div class="person-container">
        <!-- 头像，名称，简介，编辑按钮 -->

        <!-- 个人数据统计 -->

        <div class="calling-card" style="text-align:center">
            <img src="../common/images/header-icon.jpg">

            <div class="card">
                <div class="card-header">
                    <h1>{{ username }}</h1>
                    <p>{{ summarize }}</p>
                </div>

                <div class="card-content">
                    <p>电话: {{mobile}}</p>
                    <p>邮箱: {{email}}</p>
                </div>
            </div>
            <Button type="primary" size="small">编辑个人资料</Button>
        </div>


        <div class="info-container">
            <h1>个人成就</h1>
            <div class="cards">

                <Card>
                    <p slot="title">你注册了</p>
                    <label class="number">{{ day }}</label>
                    <label>天</label>
                </Card>
                <Card>
                    <p slot="title">你标注了</p>
                    <label class="number">{{ markNum }}</label>
                    <label>个</label>
                </Card>
                <Card>
                    <p slot="title">你贡献了</p>
                    <label class="number">{{commentNum}}</label>
                    <label>次</label>
                </Card>
                <Card>
                    <p slot="title">你获得了</p>
                    <label class="number">{{starNum}}</label>
                    <label>次赞同</label>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {
        getCurrentUser
    } from '../api'

    export default {
        data() {
            return {
                username: '马同学',
                summarize: '',
                description: ' 我是一个小程序',
                day: 100,
                markNum: 43,
                commentNum: 120,
                starNum: 100,
                mobile: '120000',
                email: '@'
            };
        },
        created() {
            if (this.$store.state.isPass) {

            } else {
                this.$router.push('/login')
            }

            this.getInfo()
        },
        methods: {
            async getlunbotu() {

            },
            async getInfo() {


                const responseBody = await getCurrentUser(this.$cookies.get('token'));
                if (responseBody.status === 200) {

//                    this.formItem.name = responseBody.result.name;
//                    this.formItem.lat = responseBody.result.lat;
//                    this.formItem.lon = responseBody.result.lon;
//                    this.formItem.description = responseBody.result.description;

                    this.username = responseBody.result.username;
                    this.summarize = responseBody.result.summarize;
                    this.description = responseBody.result.description;
                    this.mobile = responseBody.result.mobile;
                    this.email = responseBody.result.email;


                    this.$Message.info('获取成功');

                } else {
                    this.$Message.info('获取失败！' + responseBody.message);
                }
            },
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .person-container {
        margin-top: 30px;

        height: 1000px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .calling-card {
            margin-bottom: 10px;

            display: flex;
            flex-direction: row;
            align-items: flex-start;
            img {
                flex-grow: 0;
                width: 160px;
                height: 160px;
            }
            h1 {
                font-size: 32px;
                font-weight: 900;
            }
            p {
                display: block;
                margin-top: 14px;
                margin-left: 15px;
                font-size: 20px;
            }
            button {
                flex-grow: 0;
                margin-top: 16px;
                margin-left: 20px;
            }

            .card{
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                .card-header{
                    display: flex;
                    flex-direction: row;

                }
                .card-content{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                     p{
                         font-size: 16px;
                     }
                }
            }

        }
        .info-container {
            .cards {

                display: flex;
                flex-direction: row;
            }
            .ivu-card {
                width: 200px;
            }
            .number {
                font-size: 50px;
            }
        }
    }

</style>
