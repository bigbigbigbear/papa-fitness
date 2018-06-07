<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3>会员资料</h3>
      <div class="tab-container">
        <el-tabs class="tabs-wrapper" v-model="bind_status" :value="bind_status" @tab-click="tabClick">
          <el-tab-pane label="全部会员卡" name=""></el-tab-pane>
          <el-tab-pane label="绑定会员卡" name="2"></el-tab-pane>
          <el-tab-pane label="未绑定会员卡" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="btn-wrapper">
        <el-button size="small" type="success" icon="el-icon-plus" @click="handleAdd">会员办卡</el-button>
        <el-button size="small">导入</el-button>
        <el-button size="small">导出</el-button>
      </div>
    </div>
    <div class="app-container--bd">
      <div class="filter-container ph-20">
        <el-form :inline="true" :model="formFilter" class="demo-form-inline">
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.status" placeholder="全部状态">
              <el-option label="全部状态" value=""></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="已停用" value="2"></el-option>
              <el-option label="已失效" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.tid" placeholder="全部会员卡名称">
              <el-option label="全部会员卡名称" value=""></el-option>
              <el-option v-for="(item, index) in memberCardTypeList" :label="item.name" :value="item.t_id" :key="index"></el-option>
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
        <el-table :key='tableKey' :data="memberList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60px">

          </el-table-column>
          <el-table-column label="会员卡名称" prop="memberCard">
          </el-table-column>
          <el-table-column label="绑定会员">
            <template slot-scope="scope">
              <img class="avatar" :src="scope.row.avatar" alt="">&nbsp;&nbsp;
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile">

          </el-table-column>
          <el-table-column label="卡片卡号" prop="memberCard">
          </el-table-column>
          <el-table-column label="余额" prop="instructor">
          </el-table-column>
          <el-table-column label="发卡时间" prop="reserve_time">
          </el-table-column>
          <el-table-column label="状态" prop="instructor">
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="checkedMember(scope.$index, scope.row)">{{$t('table.checked')}}</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{$t('table.recharge')}}</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.chargeback')}}</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.stopCard')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container ph-20 fr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" :current-page="page" :page-sizes="[10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
import {
  getMemberCardTypeList,
  getMemberCardList,
  delMember
} from '@/api/stadiumMember/index'
import {
  parseTime,
  compare
} from '@/utils/filters'
export default {
  data() {
    return {
      bind_status: '',
      formFilter: {
        status: '',
        tid: '',
        keyword: ''
      },
      memberCardTypeList: [],
      tableKey: 0,
      memberCardList: [],
      page: 1,
      pageSize: 10,
      total: null,
      listLoading: false
    }
  },
  created() {
    this.getMemCardTypeList()
    this.getMemCardList()
  },
  methods: {
    // 获取会员卡类型列表
    getMemCardTypeList() {
      const params = {
        page: 1,
        size: 99
      }
      getMemberCardTypeList(params).then(res => {
        const list = res.data.list
        this.memberCardTypeList = list
      })
    },
    // 切换tab
    tabClick() {
      this.getMemCardList()
    },
    // 搜索
    handleFilter() {
      this.getMemCardList()
    },
    // 获取卡列表
    getMemCardList() {
      const bind_status = this.bind_status
      const status = this.formFilter.status
      const tid = this.formFilter.tid
      const keyword = this.formFilter.keyword
      const params = {
        page: this.page,
        size: this.pageSize
      }
      if (bind_status !== '') {
        params.bind_status = bind_status
      }
      if (status !== '') {
        params.status = status
      }
      if (tid !== '') {
        params.tid = tid
      }
      if (keyword !== '') {
        params.keyword = keyword
      }
      getMemberCardList(params).then(res => {
        const list = res.data.list
        this.memberCardList = list
        this.total = res.data.count
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getMemCardList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMemCardList()
    },
    handlePrevClick(val) {
      this.page = val
      this.getMemCardList()
    },
    handleNextClick(val) {
      this.page = val
      this.getMemCardList()
    },
    // 新增会员
    handleAdd() {
      this.$router.push({
        name: 'AddMember'
      })
    },
    // 编辑会员
    handleEdit(index, item) {
      this.$router.push({
        name: 'EditMember',
        query: {
          uid: item.uid
        }
      })
    },
    // 删除
    handleDel(index, info) {
      const params = {
        member_id: info.member_id
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMember(params).then(res => {
          this.$message.success('删除成功！')
          this.getMemCardList()
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
    compare
  }
}

</script>
