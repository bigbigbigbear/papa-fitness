<template>
  <div class="app-container">
    <div class="app-container--hd">
      <el-button size="small" type="success" icon="el-icon-plus" @click="addStadium" class="fr">添加场馆</el-button>
      <h3 class="pb-20">场馆设置</h3>
    </div>
    <div class="app-container--bd">
      <div class="filter-container ph-20">
        <el-form :inline="true" :model="formFilter" class="demo-form-inline">
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.province_id" placeholder="全部省份">
              <el-option label="全部省份" value=""></el-option>
              <el-option label="普通员工" value="1"></el-option>
              <el-option label="教练" value="2"></el-option>
              <el-option label="会籍顾问" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.city_id" placeholder="全部城市">
              <el-option label="全部城市" value=""></el-option>
              <el-option label="普通员工" value="1"></el-option>
              <el-option label="教练" value="2"></el-option>
              <el-option label="会籍顾问" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select size="small" @change="handleFilter" v-model="formFilter.sex" placeholder="全部健身内容">
              <el-option label="全部健身内容" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input size="small" @keyup.enter.native="handleFilter" v-model="formFilter.keyword" placeholder="请输入场馆名称/电话号码"></el-input>
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
          <el-table-column label="场馆名称" prop="name">
            <template slot-scope="scope">
              <img :src="scope.row.gym_logo" alt="">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" label="电话" prop="telephone">

          </el-table-column>
          <el-table-column label="地址" prop="address">

          </el-table-column>
          <el-table-column label="营业面积" prop="gym_area">

          </el-table-column>
          <el-table-column label="健身内容" prop="position">

          </el-table-column>
          <el-table-column label="会员数量" prop="c_time">

          </el-table-column>
          <el-table-column label="月营业额" prop="position">

          </el-table-column>
          <el-table-column label="创建时间" prop="c_time">

          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="lookOver(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">{{$t('table.edit')}}</el-button>
              <el-button type="text" @click="handleDel(scope.row)">{{$t('table.delete')}}</el-button>
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
</style>
<script>
import { getSdiumList, delStadium } from '@/api/stadiumSet'

export default {
  data() {
    return {
      member_status: '1',
      formFilter: {
        city_id: '',
        province_id: '',
        keyword: '',
        sport_tag_id: ''
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
    this.getSdiumList()
  },
  methods: {
    // 搜索
    handleFilter() {
      this.getSdiumList()
    },
    // 获取场馆列表
    getSdiumList() {
      const keyword = this.formFilter.keyword
      const city_id = this.formFilter.city_id
      const province_id = this.formFilter.province_id
      const sport_tag_id = this.formFilter.sport_tag_id
      const params = {
        page: this.page,
        size: this.pageSize
      }
      if (keyword !== '') {
        params.keyword = keyword
      }
      if (city_id !== '') {
        params.city_id = city_id
      }
      if (province_id !== '') {
        params.province_id = province_id
      }
      if (sport_tag_id !== '') {
        params.sport_tag_id = sport_tag_id
      }
      getSdiumList(params).then(res => {
        const list = res.data.list
        this.apiList = list
        this.total = res.data.count
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getSdiumList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSdiumList()
    },
    handlePrevClick(val) {
      this.page = val
      this.getSdiumList()
    },
    handleNextClick(val) {
      this.page = val
      this.getSdiumList()
    },
    // 删除
    handleDel(index, info) {
      const params = {
        gym_id: info.gym_id
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStadium(params).then(res => {
          this.$message.success('删除成功！')
          this.getSdiumList()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑场馆
    handleEdit(info) {
      this.$router.push({ name: 'EditStadium', query: { gym_id: info.gym_id }})
    },
    // 添加场馆
    addStadium() {
      this.$router.push({ name: 'AddStadium' })
    },
    // 查看场馆信息
    lookOver(info) {
      this.$router.push({ name: 'StadiumMessage', query: { gym_id: info.gym_id }})
    }
  }
}

</script>
