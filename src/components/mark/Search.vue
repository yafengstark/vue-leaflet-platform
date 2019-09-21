<template>
    <div class="container">

        <Button type="text" @click="value3 = true">
            <Icon type="md-search" size="28"/>
            <br/>搜索
        </Button>


        <Drawer
                title="搜索"
                v-model="value3"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="名称" label-position="top">
                        <Input v-model="formData.name" placeholder="请输入名称"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="位置" label-position="top">
                        <label>最小经度：</label><Input class="input" v-model="myMapHandleObject.rectangle.minLon"
                                                   placeholder="120" style="width: 300px"/>
                        <label>最大经度：</label><Input class="input" v-model="myMapHandleObject.rectangle.maxLon"
                                                   placeholder="120" style="width: 300px"/>
                        <label>最小纬度：</label><Input class="input" v-model="myMapHandleObject.rectangle.minLat"
                                                   placeholder="120" style="width: 300px"/>
                        <label>最大纬度：</label><Input class="input" v-model="myMapHandleObject.rectangle.maxLat"
                                                   placeholder="120" style="width: 300px"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="Url" label-position="top">
                        <Input v-model="formData.url" placeholder="please enter url">
                        <span slot="prepend">http://</span>
                        <span slot="append">.com</span>
                        </Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="Owner" label-position="top">
                        <Select v-model="formData.owner" placeholder="please select an owner">
                            <Option value="jobs">Steven Paul Jobs</Option>
                            <Option value="ive">Sir Jonathan Paul Ive</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="Type" label-position="top">
                        <Select v-model="formData.type" placeholder="please choose the type">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="Approver" label-position="top">
                        <Select v-model="formData.approver" placeholder="please choose the approver">
                            <Option value="jobs">Steven Paul Jobs</Option>
                            <Option value="ive">Sir Jonathan Paul Ive</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="DateTime" label-position="top">
                        <DatePicker v-model="formData.date" type="daterange" placeholder="please select the date"
                                    style="display: block" placement="bottom-end"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="描述" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="请输入描述关键字"/>
                </FormItem>
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


</style>
