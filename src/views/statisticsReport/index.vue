<template>
  <div class="app-container">
    <div class="tab-container ph-10">
      <el-tabs v-model="api_belong" :value="api_belong" @tab-click="tabClick">
        <el-tab-pane label="运营端" name="1"></el-tab-pane>
        <el-tab-pane label="商户端" name="2"></el-tab-pane>
        <el-tab-pane label="营业端" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="filter-container ph-10">
      <el-form :inline="true" :model="formFilter" class="demo-form-inline">
        <el-form-item label="">
          <el-input @keyup.enter.native="handleFilter" v-model="formFilter.keyword" placeholder="请输入接口名/接口路径"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select @change="handleFilter" v-model="formFilter.status" placeholder="接口状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增接口</el-button>
      </el-form>
    </div>
    <div class="table-container ph-10">
      <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="序号" prop="id" width="60px">

        </el-table-column>
        <el-table-column label="接口名称" prop="interface_name">

        </el-table-column>
        <el-table-column min-width="150px" label="接口路径" prop="interface_path">

        </el-table-column>
        <el-table-column label="接口类型" prop="interface_type">
          <template slot-scope="scope">
            <span>{{scope.row.interface_type | getApiType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口类型" prop="interface_status">
          <template slot-scope="scope">
            <span>{{scope.row.interface_status | compare}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口状态" prop="interface_status">
          <template slot-scope="scope">
            <span>{{scope.row.interface_status | compare}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{$t('table.edit')}}</el-button>
            <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container ph-10">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
        @next-click="handleNextClick" :current-page="page" :page-sizes="[10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="addRules" ref="addForm" class="add-form">
        <el-form-item label="接口名称" :label-width="formLabelWidth" prop="interface_name">
          <el-col :xs="24" :lg="12">
            <el-input v-model="form.interface_name" auto-complete="off" autofocus="true" placeholder="请输入接口名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="接口路径" :label-width="formLabelWidth" prop="interface_path">
          <el-col :xs="24" :lg="12">
            <el-input v-model="form.interface_path" auto-complete="off" placeholder="请输入接口路径"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="接口状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.interface_status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.interface_type">
            <el-radio :label="1">读</el-radio>
            <el-radio :label="2">写</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口验证" :label-width="formLabelWidth">
          <el-radio-group v-model="form.interface_verify">
            <el-radio :label="1">需要</el-radio>
            <el-radio :label="0">不需要</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="submitForm('addForm')">{{$t('form.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  $blue: #409EFF;
  .item {
    padding: 6px 0;
    font-size: 14px;
    &:hover {
      color: $blue;
      cursor: pointer;
    }
    &.active {
      color: $blue;
    }
  }

</style>
<script>
  import {
    getApiList,
    addApi,
    editApi,
    delApi
  } from '@/api/api'
  import {
    parseTime,
    compare
  } from '@/utils/filters'
  export default {
    data () {
      return {
        api_belong: '1',
        formFilter: {
          keyword: '',
          status: ''
        },
        tableKey: 0,
        apiList: [],
        page: 1,
        pageSize: 10,
        total: null,
        listLoading: false,
        dialogFormVisible: false, // 弹框显示/隐藏
        dialog_title: '新增接口',
        dialog_form_type: 'add',
        interface_id: 1,
        form: {
          interface_name: '',
          interface_path: '',
          interface_status: 1,
          interface_type: 2,
          interface_verify: 1
        },
        addRules: {
          interface_name: [{
            required: true,
            message: '请输入接口名称',
            trigger: 'blur'
          }],
          interface_path: [{
            required: true,
            message: '请输入接口路径',
            trigger: 'blur'
          }]
        },
        loading: false, // 确认按钮loading
        formLabelWidth: '160px'
      }
    },
    created () {
      this.getApiList()
    },
    methods: {
      // 切换tab
      tabClick: function () {
        this.getApiList()
      },
      // 搜索
      handleFilter: function () {
        this.getApiList()
      },
      // 获取接口列表
      getApiList: function () {
        const keyword = this.formFilter.keyword
        const status = this.formFilter.status
        const params = {
          interface_belong: this.api_belong,
          page: this.page,
          size: this.pageSize
        }
        if (keyword !== '') {
          params.keyword = keyword
        }
        if (status !== '') {
          params.interface_status = status
        }
        getApiList(params).then(res => {
          const list = res.data.list
          this.apiList = list
          this.total = res.data.count
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getApiList()
      },
      handleCurrentChange (val) {
        this.page = val
        this.getApiList()
      },
      handlePrevClick (val) {
        this.page = val
        this.getApiList()
      },
      handleNextClick (val) {
        this.page = val
        this.getApiList()
      },
      // 新增接口弹窗
      handleAdd: function () {
        this.dialog_title = '新增接口'
        this.dialog_form_type = 'add'
        this.dialogFormVisible = true
      },
      // 弹出编辑页面
      handleEdit: function (index, info) {
        this.interface_id = info.interface_id
        const form = {
          interface_name: info.interface_name,
          interface_path: info.interface_path,
          interface_status: info.interface_status,
          interface_type: info.interface_type,
          interface_verify: info.interface_verify
        }
        this.form = form
        this.dialog_title = '编辑接口'
        this.dialog_form_type = 'edit'
        this.dialogFormVisible = true
      },
      // 删除
      handleDel: function (index, info) {
        const params = {
          interface_id: info.interface_id
        }
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delApi(params).then(res => {
            this.$message.success('删除成功！')
            this.getApiList()
          }).catch(err => {
            this.$message.error(err)
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 提交表单
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            const params = this.form
            params.interface_belong = this.api_belong
            if (this.dialog_form_type === 'add') {
              addApi(params).then(res => {
                this.loading = false
                this.$message.success('提交成功！')
                this.dialogFormVisible = false
                this.getApiList()
              }).catch(err => {
                this.loading = false
                this.$message.error(err)
              })
            } else {
              params.interface_id = this.interface_id
              editApi(params).then(res => {
                this.loading = false
                this.$message.success('提交成功！')
                this.dialogFormVisible = false
                this.getApiList()
              }).catch(err => {
                this.loading = false
                this.$message.error(err)
              })
            }
          } else {
            this.$message.error('提交失败！')
            return false
          }
        })
      }
    },
    filters: {
      parseTime,
      compare,
      getApiType: function (type) {
        const type_str = type === 1 ? '读' : '写'
        return type_str
      }
    }
  }

</script>
