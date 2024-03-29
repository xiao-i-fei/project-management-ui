<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口地址" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入接口地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接口状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择接口状态" clearable>
          <el-option
            v-for="dict in dict.type.api_interface_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请求类型" prop="method">
        <el-select v-model="queryParams.method" placeholder="请选择请求类型" clearable>
          <el-option
            v-for="dict in dict.type.method_request_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-link style="margin-left: 10px" type="primary" href="https://github.com/xiao-i-fei/customer-starter">SDK下载</el-link>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['api:info:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['api:info:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['api:info:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['api:info:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="接口名称" align="center" prop="name"/>
      <el-table-column label="描述" align="center" prop="description"/>
      <el-table-column label="接口地址" align="center" prop="url"/>
      <!--<el-table-column label="请求参数" align="center" prop="requestParams" />-->
      <!--<el-table-column label="请求头" align="center" prop="requestHeader" />-->
      <!--<el-table-column label="响应头" align="center" prop="responseHeader" />-->
      <el-table-column label="接口状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.api_interface_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="请求类型" align="center" prop="method">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.method_request_type" :value="scope.row.method"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['api:info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleCheck(scope.row.id)"
            v-hasPermi="['api:info:check']"
          >查看
          </el-button>

          <el-button size="mini" type="text" icon="el-icon-view"
                     @click="handleSubscription(scope.row.id)" v-hasPermi="['api:userInterfaceInfo:subscription']"
          >订阅
          </el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['api:info:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改接口信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述"/>
        </el-form-item>
        <el-form-item label="接口地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入接口地址"/>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.requestParams"/>
        </el-form-item>
        <el-form-item label="请求头">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.requestHeader"/>
        </el-form-item>
        <el-form-item label="响应头">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.responseHeader"/>
        </el-form-item>
        <el-form-item label="接口状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.api_interface_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请求类型" prop="method">
          <el-select v-model="form.method" placeholder="请选择请求类型">
            <el-option
              v-for="dict in dict.type.method_request_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/api/info'
import { handleSubscription } from '@/api/api/userInterfaceInfo'

export default {
  name: 'Info',
  dicts: ['api_interface_status', 'method_request_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 接口信息表格数据
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        description: null,
        url: null,
        requestParams: null,
        requestHeader: null,
        responseHeader: null,
        status: null,
        method: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '接口地址不能为空', trigger: 'blur' }
        ],
        requestParams: [
          { required: true, message: '请求参数不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '接口状态不能为空', trigger: 'change' }
        ],
        method: [
          { required: true, message: '请求类型不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询接口信息列表 */
    getList() {
      this.loading = true
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        description: null,
        url: null,
        requestParams: null,
        requestHeader: null,
        responseHeader: null,
        status: null,
        method: null,
        userId: null,
        createTime: null,
        updateTime: null,
        isDelete: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加接口信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改接口信息'
      })
    },
    handleCheck(interfaceId) {
      this.$router.push({ path: `/api/interface/check/${interfaceId}` })
    },
    handleSubscription(interfaceId) {
      handleSubscription(interfaceId).then(response => {
        this.$modal.msgSuccess(response.msg)
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInfo(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addInfo(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除接口信息编号为"' + ids + '"的数据项？').then(function() {
        return delInfo(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('api/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
