<template>
    <div class="container">

        请先在地图上框选范围
        <Button type="text" @click="value3 = true">
            <Icon type="md-search" size="20"/>
            <br/>搜索
        </Button>


        <Drawer
                title="搜索"
                v-model="value3"
                width="400"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">

                    </Col>
                    <Col span="12">
                    <FormItem label="位置" label-position="top">
                        <br>
                        <label>最小经度：</label><Input class="input" v-model="myMapHandleObject.rectangle.minLon"
                                                   placeholder="120" style="width: 300px"/>
                        <br/>
                        <label>最大经度：</label><Input class="input" v-model="myMapHandleObject.rectangle.maxLon"
                                                   placeholder="120" style="width: 300px"/>
                        <br/>
                        <label>最小纬度：</label><Input class="input" v-model="myMapHandleObject.rectangle.minLat"
                                                   placeholder="120" style="width: 300px"/>
                        <br/>
                        <label>最大纬度：</label><Input class="input" v-model="myMapHandleObject.rectangle.maxLat"
                                                   placeholder="120" style="width: 300px"/>
                    </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                <Button type="primary" @click="value3 = false">Submit</Button>
            </div>
        </Drawer>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {mapActions, mapState} from 'vuex'


    export default {
        data() {
            return {
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    name: '',
                    url: '',
                    owner: '',
                    type: '',
                    approver: '',
                    date: '',
                    desc: '',
//                    rectangle: this.myMapHandleObject.rectangle,
                },
            };
        },
        computed: {
            ...mapState(['myMapHandleObject']),
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .container{
        label{
            display: inline;
        }
        input{
            display: inline;
        }
    }

</style>
