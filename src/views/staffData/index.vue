<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pt-20">员工资料</h3>
      <div class="tab-container">
        <el-tabs class="tabs-wrapper" v-model="member_status" :value="api_belong" @tab-click="tabClick">
          <el-tab-pane label="全部会员" name="1"></el-tab-pane>
          <el-tab-pane label="卡即将失效会员" name="2"></el-tab-pane>
          <el-tab-pane label="失效卡会员" name="3"></el-tab-pane>
          <el-tab-pane label="无卡会员" name="4"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="btn-wrapper">
        <el-button size="small" type="success" icon="el-icon-plus" @click="addStaff">添加员工</el-button>
      </div>
    </div>
    <div class="app-container--bd">
      <div class="filter-container ph-20">
        <el-form :inline="true" :model="formFilter" class="demo-form-inline">
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.position_id" placeholder="全部职位">
              <el-option label="全部职位" value=""></el-option>
              <el-option label="普通员工" value="1"></el-option>
              <el-option label="教练" value="2"></el-option>
              <el-option label="会籍顾问" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.sex" placeholder="全部性别">
              <el-option label="全部性别" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input size="small" @keyup.enter.native="handleFilter" v-model="formFilter.keyword" placeholder="请输入员工姓名/手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleFilter" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container ph-20">
        <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" prop="$index" width="60px">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="personnel_name">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="">
              <span>{{ scope.row.personnel_name }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" label="性别" prop="sex">

          </el-table-column>
          <el-table-column label="手机号" prop="mobile">

          </el-table-column>
          <el-table-column label="场馆" prop="gyms">

          </el-table-column>
          <el-table-column label="职位" prop="position">

          </el-table-column>
          <el-table-column label="加入时间" prop="c_time">

          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="lookOver(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">{{$t('table.edit')}}</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container ph-20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
$blue: #409eff;
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
import { staffList, delStaffData } from '@/api/staffData'

export default {
  data() {
    return {
      member_status: '1',
      formFilter: {
        card_type: '',
        coach: '',
        mem_consultant: '',
        keyword: '',
        status: ''
      },
      tableKey: 0,
      apiList: [],
      page: 1,
      pageSize: 10,
      total: null,
      listLoading: false,
      interface_id: 1,
      loading: false // 确认按钮loading
    }
  },
  created() {
    this.getApiList()
  },
  methods: {
    // 切换tab
    tabClick() {
      this.getApiList()
    },
    // 搜索
    handleFilter() {
      this.getApiList()
    },
    // 获取会员列表
    getApiList() {
      const keyword = this.formFilter.keyword
      const position_id = this.formFilter.position_id
      const sex = this.formFilter.sex
      const params = {
        page: this.page,
        size: this.pageSize
      }
      if (keyword !== '') {
        params.keyword = keyword
      }
      if (position_id !== '') {
        params.position_id = position_id
      }
      if (sex !== '') {
        params.sex = sex
      }
      staffList(params).then(res => {
        const list = res.data.list
        this.apiList = list
        this.total = res.data.count
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getApiList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getApiList()
    },
    handlePrevClick(val) {
      this.page = val
      this.getApiList()
    },
    handleNextClick(val) {
      this.page = val
      this.getApiList()
    },
    // 删除
    handleDel(index, info) {
      const params = {
        personnel_id: info.personnel_id
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStaffData(params).then(res => {
          this.$message.success('删除成功！')
          this.getApiList()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(info) {
      this.$router.push({ name: 'EditStaffData', query: { personnel_id: info.personnel_id } })
    },
    // 添加员工
    addStaff() {
      this.$router.push({ name: 'AddStaff' })
    },
    // 查看员工信息
    lookOver(info) {
      this.$router.push({ name: 'StaffMessage', query: { personnel_id: info.personnel_id } })
    }
  }
}

</script>
