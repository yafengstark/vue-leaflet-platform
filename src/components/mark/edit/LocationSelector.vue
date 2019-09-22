<template>
    <div class="container">


        <a @click="value3 = true">编辑</a>

        <Drawer
                title="修改位置"
                v-model="value3"
                width="400"
                :mask-closable="false"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">

                    </Col>
                    <Col span="12">
                    <FormItem label="位置" label-position="top">
                        <br>
                        <label>经度：</label><Input class="input" v-model="editMark.lon"
                                                 placeholder="120" style="width: 300px"/>
                        <br/>
                        <label>纬度：</label><Input class="input" v-model="editMark.lat"
                                                 placeholder="120" style="width: 300px"/>

                    </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="primary" @click="submit">提交</Button>
            </div>
        </Drawer>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {mapActions, mapState} from 'vuex'

    import {
        resetMarkLocation
    } from '../../../api'

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

            };
        },
        computed: {
            ...mapState(['editMark']),
        },
        created() {


        },
        methods: {
            async getlunbotu() {

            },
            async submit() {

                const responseBody = await resetMarkLocation(this.$cookies.get('token'),
                    this.editMark.markId,
                    parseFloat(this.editMark.lon),
                    parseFloat(this.editMark.lat));

                if (responseBody.status === 200) {
                    this.$Message.info('修改成功');
                    this.value3 = false;
                } else {
                    this.$Message.info('修改失败！' + responseBody.message);
                }





            },
            cancel() {
                this.value3 = false;
            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .container {
        label {
            display: inline;
        }
        input {
            display: inline;
        }
    }

</style>
