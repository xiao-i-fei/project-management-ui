<template>
    <div class="dashboard-editor-container">

        <panel-group @handleSetLineChartData="handleSetLineChartData" :request-count="requestCount"/>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData"/>
        </el-row>

        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="10">
                <div class="chart-wrapper">
                    <pie-chart :pie-chart-data="pieChartData"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="14">
                <div class="chart-wrapper">
                    <bar-chart :chart-data="barChartData"/>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import { statisticalQuery } from '@/api/api/interfaceRequestInfo'

const lineChartData = {}

export default {
    name: 'Index',
    components: {
        PanelGroup,
        LineChart,
        RaddarChart,
        PieChart,
        BarChart
    },

    created() {
        this.getData()
    },
    data() {
        return {
            lineChartData: {
                expectedData: [1, 2, 3, 1458, 1410, 1455, 1407, 546],
                data: []
            },
            barChartData: {
                expectedData: [1, 2, 3, 1458, 1410, 1455, 1407, 546],
                data: []
            },
            pieChartData: [],
            //请求总数
            requestCount: 0
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        },
        async getData() {
            try {
                const resp = await statisticalQuery()
                const count = resp.data.countRequestByDate.reduce((acc, item) => {
                    acc += item.requestCount * 1
                    return acc
                }, 0)

                this.lineChartData.expectedData = resp.data.countRequestByDate.map(item => item.requestCount)
                this.lineChartData.data = resp.data.countRequestByDate.map(item => item.createTime)

                this.barChartData.expectedData = resp.data.countInterfaceRequest.map(item => item.requestCount)
                this.barChartData.data = resp.data.countInterfaceRequest.map(item => item.describe)

                this.pieChartData = resp.data.userRequestCount

                this.requestCount = count
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}

@media (max-width: 1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>
