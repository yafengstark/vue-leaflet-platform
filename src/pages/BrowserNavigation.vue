<template>
    <div class="container">
        <div>
            <h2>每周安排</h2>
            {{timestamp | dateFormat}}
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <!--分享{{id}}-->
        <Row>
            <Col span="12">149网址大全</Col>
            <Col span="12">col-12</Col>
        </Row>
        <div style="background:#eee;padding: 20px">
            <h3>实用查询</h3>
            <Card :bordered="false">
                <CellGroup>
                    <Cell title="电话本" />
                    <Cell title="官网" label="label content" />
                    <Cell title="Display right content" extra="details" />
                    <Cell title="Link" extra="details" to="/components/button" />
                    <Cell title="Open link in new window" to="/components/button" target="_blank" />
                    <Cell title="Disabled" disabled />
                    <!--<Cell title="Selected" selected />-->
                    <!--<Cell title="With Badge" to="/components/badge">-->
                        <!--<Badge :count="10" slot="extra" />-->
                    <!--</Cell>-->
                    <!--<Cell title="With Switch">-->
                        <!--<Switch v-model="switchValue" slot="extra" />-->
                    <!--</Cell>-->
                </CellGroup>
            </Card>
        </div>
        <div style="background:#eee;padding: 20px">
            <h3>网址大全</h3>
            <Card :bordered="false">

            </Card>
        </div>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件



    export default {
        data() {
            return {
                timestamp: new Date().getTime(),
                columns1: [
                    {
                        title: '时间',
                        key: 'day'
                    },
                    {
                        title: '7：00 - 7：30',
                        key: 'age'
                    },
                    {
                        title: '8：00',
                        key: 'address'
                    },
                    {
                        title: '8：00',
                        key: 'address'
                    }
                    ,
                    {
                        title: '8：00',
                        key: 'address'
                    }
                    ,
                    {
                        title: '8：00',
                        key: 'address'
                    },
                    {
                        title: '8：00',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        day: '周一',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        day: '周二',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        day: '周三',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        day: '周四',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            };
        },
        created() {

            this.circleRun();
        },
        methods: {
            async getlunbotu() {

            },
            updateClock(){
                this.timestamp = new Date().getTime();
                console.log(this.timestamp)
            },
            circleRun() {
//                毫秒
                window.setInterval(this.updateClock,1000);
            }
        },
        props: ["id"],
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

</style>
