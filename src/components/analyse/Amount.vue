<template>
    <div class="container">

        <div>
            <h1>用户量</h1>
            <!-- 总数 数字-->
            <div>
                <h3>注册用户数 {{ amount_num }}</h3>
            </div>
            <div>
                <div class="echarts">
                    <v-chart :options="pie"
                             ref="pie"/>
                </div>
            </div>

        </div>
        <div>
            <h1>标注</h1>

            <div>
                <div class="markBar">
                    <v-chart :options="markBarOption"
                    />
                </div>
            </div>

        </div>


    </div>
</template>

<script>


    // 导入自己封装的轮播图子组件
    import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue


    // 填坑：必须引入，先后顺序也重要
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/map'
    import 'echarts/lib/chart/radar'
    import 'echarts/lib/chart/scatter'
    import 'echarts/lib/chart/effectScatter'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/polar'
    import 'echarts/lib/component/geo'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/visualMap'
    import 'echarts/lib/component/dataset'
    import 'echarts/map/js/world'
    import 'zrender/lib/svg/svg'


    import {
        getUserDepartments,

    } from '../../api'


    export default {
        components: {
            'v-chart': ECharts
        },
        data() {
//            let data = [];
//
//            for (let i = 0; i <= 360; i++) {
//                let t = i / 180 * Math.PI
//                let r = Math.sin(2 * t) * Math.cos(2 * t)
//                data.push([r, i])
//            }


            return {
                amount_num: 13,
                departmentData: {},
                pie: {
                    title: {
                        text: '所属部门分布',
                        subtext: '动态更新',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: [], //departmentData.legendData,
                        selected: [], //departmentData.selected
                    },
                    series: [
                        {
                            name: '部门',
                            type: 'pie',
                            radius: '55%',
                            center: ['40%', '50%'],
                            data: [], //departmentData.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                markBarOption: {
                    title: {
                        text: '标注总量分布',
                        subtext: '实时更新'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2011年', '2012年']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['巴西', '印尼', '美国', '印度', '中国', '总数量']
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]
                },

            }
        },
        mounted() {
            // 在mounted阶段更新
            this.getDepartmentData();
//            this.pie.title.text = 'Trends';
        },
        methods: {
            async getDepartmentData() {

                const responseBody = await getUserDepartments(this.$cookies.get('token'));
                if (responseBody.status === 200) {


                    var data = [];
                    responseBody.result.forEach(item => {
                        data.push({
                            name: item.departmentName,
                            value: item.num
                        })
                    });


                    this.$Message.info('获取成功');


                    var legendData = [];
                    var seriesData = [];
                    var selected = {};


                    data.forEach(item => {
                        legendData.push(item.name);
                        seriesData.push({
                            name: item.name,
                            value: item.value
                        });
                        selected[item.name] = true;
                    });

                    // 属性都是响应的
                    this.pie.legend.data = legendData;
                    this.pie.legend.selected = selected;
                    this.pie.series[0].data = seriesData;


                } else {
                    this.$Message.info('获取失败！' + responseBody.message);
                }


            },

        }
    }


</script>

<style lang="scss" scoped>

    /**
     * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
     * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
     */
    .echarts {
        width: 600px;
        height: 400px;
    }
    .markBar {
        width: 600px;
        height: 400px;
        margin-left: 50px;
    }
</style>
