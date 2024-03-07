<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        pieChartData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            chart: null
        }
    },
    watch: {
        pieChartData: {
            deep: true,
            handler(val) {
                var newData = val.map(item => {
                    return {
                        value: item.requestCount,
                        name: item.userName
                    }
                })
                this.initChart(newData)
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart(pieChartData) {
            var nameData = []
            if (pieChartData != null && pieChartData.length > 0) {
                nameData = pieChartData.map(item => item.name)
            }
            this.chart = echarts.init(this.$el, 'macarons')

            this.chart.setOption({
                title: {
                    text: '用户调用次数'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: nameData
                },
                series: [
                    {
                        name: '请求总数',
                        type: 'pie',
                        roseType: 'radius',
                        radius: [15, 95],
                        center: ['50%', '38%'],
                        data: pieChartData,
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            })
        }
    }
}
</script>
