<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3>会员资料</h3>
      <div class="tab-container">
        <el-tabs class="tabs-wrapper" v-model="card_status" :value="card_status" @tab-click="tabClick">
          <el-tab-pane label="全部会员" name="0"></el-tab-pane>
          <el-tab-pane label="卡即将失效会员" name="2"></el-tab-pane>
          <el-tab-pane label="失效卡会员" name="3"></el-tab-pane>
          <el-tab-pane label="无卡会员" name="9"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="btn-wrapper">
        <el-button size="small" type="success" icon="el-icon-plus" @click="handleAdd">添加会员</el-button>
        <el-button size="small">导入</el-button>
        <el-button size="small">导出</el-button>
      </div>
    </div>
    <div class="app-container--bd">
      <div class="filter-container ph-20">
        <el-form :inline="true" :model="formFilter" class="demo-form-inline">
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.card_type" placeholder="全部会员卡类型">
              <el-option label="次数类型" value="1"></el-option>
              <el-option label="储值类型" value="2"></el-option>
              <el-option label="期限类型" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.coach" placeholder="全部教练">
              <el-option label="教练1" value="1"></el-option>
              <el-option label="教练2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.mem_consultant" placeholder="全部会籍顾问">
              <el-option label="会籍顾问1" value="1"></el-option>
              <el-option label="会籍顾问2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input size="small" @keyup.enter.native="handleFilter" v-model="formFilter.keyword" style="width:370px;" placeholder="请输入会员手机号/会员姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container ph-20">
        <el-table :key='tableKey' :data="memberList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
          style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60px">

          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <img class="avatar" :src="scope.row.avatar" alt="">&nbsp;&nbsp;
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile">

          </el-table-column>
          <el-table-column label="会员卡" prop="memberCard">
          </el-table-column>
          <el-table-column label="教练" prop="instructor">
          </el-table-column>
          <el-table-column label="会籍顾问" prop="personnel">
          </el-table-column>
          <el-table-column label="来源" prop="from">
          </el-table-column>
          <el-table-column label="标签" prop="tag">
          </el-table-column>
          <el-table-column label="最后约课时间" prop="reserve_time">
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="checkMember(scope.$index, scope.row)">{{$t('table.checked')}}</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{$t('table.edit')}}</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container ph-20 fr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
          @next-click="handleNextClick" :current-page="page" :page-sizes="[10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
<script>
  import {
    getMemberList,
    delMember
  } from '@/api/stadiumMember/index'
  import {
    parseTime,
    compare
  } from '@/utils/filters'
  export default {
    data () {
      return {
        card_status: 0,
        formFilter: {
          card_type: '',
          coach: '',
          mem_consultant: '',
          keyword: ''
        },
        tableKey: 0,
        memberList: [],
        page: 1,
        pageSize: 10,
        total: null,
        listLoading: false
      }
    },
    created () {
      this.getMemList()
    },
    methods: {
      // 切换tab
      tabClick: function () {
        this.getMemList()
      },
      // 搜索
      handleFilter: function () {
        this.getMemList()
      },
      // 获取接口列表
      getMemList: function () {
        const keyword = this.formFilter.keyword
        const card_status = this.card_status
        const params = {
          page: this.page,
          size: this.pageSize
        }
        if (card_status !== '') {
          params.card_status = card_status
        }
        if (keyword !== '') {
          params.keyword = keyword
        }
        getMemberList(params).then(res => {
          const list = res.data.list
          this.memberList = list
          this.total = res.data.count
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getMemList()
      },
      handleCurrentChange (val) {
        this.page = val
        this.getMemList()
      },
      handlePrevClick (val) {
        this.page = val
        this.getMemList()
      },
      handleNextClick (val) {
        this.page = val
        this.getMemList()
      },
      // 新增会员
      handleAdd: function () {
        this.$router.push({
          name: 'AddMember'
        })
      },
      // 查看会员
      checkMember: function (index, item) {
        this.$router.push({
          name: 'MemberCenter',
          query: {
            uid: item.uid
          }
        })
      },
      // 编辑会员
      handleEdit: function (index, item) {
        this.$router.push({
          name: 'EditMember',
          query: {
            uid: item.uid
          }
        })
      },
      // 删除
      handleDel: function (index, info) {
        const params = {
          uid: info.uid
        }
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMember(params).then(res => {
            this.$message.success('删除成功！')
            this.getMemList()
          }).catch(err => {
            this.$message.error(err)
          })
        }).catch(err => {
          console.log(err)
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
