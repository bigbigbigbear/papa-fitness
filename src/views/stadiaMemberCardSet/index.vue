<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">会员卡设置</h3>
      <div class="btn-wrapper">
        <el-button size="small" type="success" icon="el-icon-plus" @click="handleAdd">添加新会员卡</el-button>
        <el-button size="small">导入</el-button>
        <el-button size="small">导出</el-button>
      </div>
    </div>
    <div class="app-container--bd">
      <div class="filter-container ph-20">
        <el-form :inline="true" :model="formFilter" class="demo-form-inline">
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.type" placeholder="全部会员卡类型">
              <el-option label="次数类型" value="1"></el-option>
              <el-option label="储值类型" value="2"></el-option>
              <el-option label="期限类型" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.send_type" placeholder="全部发卡">
              <el-option label="场馆卡" value="1"></el-option>
              <el-option label="连锁卡" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.buy_type" placeholder="全部购买方式">
              <el-option label="线上线下" value="3"></el-option>
              <el-option label="线上" value="2"></el-option>
              <el-option label="线下" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input size="small" @keyup.enter.native="handleFilter" v-model="formFilter.keyword" style="width:370px;" placeholder="请输入会员卡名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container ph-20">
        <el-table :key='tableKey' :data="memberCardList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60px">

          </el-table-column>
          <el-table-column label="会员卡名称" prop="name">

          </el-table-column>
          <el-table-column label="会员卡类型" prop="type_string">

          </el-table-column>
          <el-table-column label="购买方式" prop="buy_type_string">
          </el-table-column>
          <el-table-column label="发卡方式" prop="send_type_string">
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="scope.row.send_type !== 2" type="text" @click="handleEdit(scope.$index, scope.row)">{{$t('table.edit')}}</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.delete')}}</el-button>
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
.btn-wrapper {
  bottom: 10px;
}
</style>
<script>
import {
  getMemberCardTypeList,
  delMemberCardType
} from '@/api/stadiumMember/index'
import {
  parseTime,
  compare
} from '@/utils/filters'
export default {
  data() {
    return {
      formFilter: {
        type: '',
        send_type: '',
        buy_type: '',
        keyword: ''
      },
      tableKey: 0,
      memberCardList: [],
      page: 1,
      pageSize: 10,
      total: null,
      listLoading: false
    }
  },
  created() {
    this.getMemCardList()
  },
  methods: {
    // 搜索
    handleFilter() {
      this.getMemCardList()
    },
    // 获取会员卡设置列表
    getMemCardList() {
      const keyword = this.formFilter.keyword
      const type = this.formFilter.type
      const send_type = this.formFilter.send_type
      const buy_type = this.formFilter.buy_type
      const params = {
        page: this.page,
        size: this.pageSize
      }
      if (keyword !== '') {
        params.keyword = keyword
      }
      if (type !== '') {
        params.type = type
      }
      if (send_type !== '') {
        params.send_type = send_type
      }
      if (buy_type !== '') {
        params.buy_type = buy_type
      }
      getMemberCardTypeList(params).then(res => {
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
        name: 'AddStadiaMemberCardType'
      })
    },
    // 编辑会员
    handleEdit(index, item) {
      this.$router.push({
        name: 'EditStadiaMemberCardType',
        query: {
          tid: item.t_id
        }
      })
    },
    // 删除
    handleDel(index, info) {
      const params = {
        tid: info.t_id
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMemberCardType(params).then(res => {
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
