<template>
    <div class="app-container">
        <el-descriptions class="margin-top" :title="interfaceInfo.description" :column="2" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="handleSendRequest">发送请求</el-button>
            </template>
            <el-descriptions-item>
                <template slot="label">
                    接口名称
                </template>
                {{ interfaceInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    请求地址
                </template>
                {{ interfaceInfo.url }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    请求方式
                </template>
                {{ interfaceInfo.method }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    接口状态
                </template>
                <span v-if="interfaceInfo.status===0">下线</span>
                <span v-if="interfaceInfo.status===1">上线</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    请求头
                </template>
                {{ interfaceInfo.requestHeader }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    响应头
                </template>
                {{ interfaceInfo.responseHeader }}
            </el-descriptions-item>
        </el-descriptions>

        <!-- 请求参数 -->
        <el-collapse v-model="activeNames">
            <el-collapse-item title="请求参数类型" name="1" style="font-size: 333px;">
                <el-table height="350" stripe :data="requestType">
                    <el-table-column label="请求参数" align="center" prop="name"/>
                    <el-table-column label="参数说明" align="center" prop="description"/>
                    <el-table-column label="请求类型" align="center" prop="in"/>
                    <el-table-column label="是否必须" align="center" prop="required">
                        <template slot-scope="scope">
                            {{ scope.row.required }}
                        </template>
                    </el-table-column>
                    <el-table-column label="数据类型" align="center" prop="type"/>
                </el-table>
            </el-collapse-item>
        </el-collapse>

        <!-- 请求参数 -->
        <el-collapse v-model="activeNames">
            <el-collapse-item title="请求参数" name="2">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="requestParam"/>
            </el-collapse-item>
        </el-collapse>

        <!-- 响应结果 -->
        <el-collapse v-model="activeNames">
            <el-collapse-item title="响应结果" name="3">
                <json-viewer :value="responseParam" :expand-depth="3" boxed expanded show-double-quotes copyable sort>
                    <template slot-scope="scope">
                    </template>
                </json-viewer>
            </el-collapse-item>
        </el-collapse>


    </div>
</template>

<script>
import { getInfo, interfaceRequest } from '@/api/api/info'

export default {

    created() {
        this.getInterfaceInfo(this.$route.params.interfaceId)
    },
    methods: {
        getInterfaceInfo(interfaceId) {
            getInfo(interfaceId).then(response => {
                this.interfaceInfo = response.data
                if (this.interfaceInfo.requestParams != null && this.interfaceInfo.requestParams !== '') {
                    this.requestType = JSON.parse(this.interfaceInfo.requestParams)
                }
            })
        },

        // 发送请求
        handleSendRequest() {
            let jsonParams = {
                interfaceId: this.interfaceInfo.id,
                jsonParam: this.requestParam
            }
            interfaceRequest(jsonParams).then(response => {
                this.responseParam = response
            })
        }
    },
    data() {
        return {
            interfaceInfo: {},
            requestType: [],
            activeNames: ['2', '3'],
            requestParam: '',
            responseParam: ''
        }
    }
}
</script>
