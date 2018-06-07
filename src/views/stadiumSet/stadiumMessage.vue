<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">场馆主页</h3>
    </div>
    <div class="form-container">
      <div class="form-section">
        <img :src="avatar + '?imageView2/1/w/64/h/64'" alt="" class="avatar fl">
        <div class="form-section--bd memberdata-bd">
          <el-button type="primary" class="fr" @click="editMemberData">编辑</el-button>
          <div class="memberName mt-9">ys</div>
          <div class="mobile pt-16">
            <span>电话：18679670158</span>
          </div>
          <div class="joinTime pt-16 font-12 font-grey">加入时间：xxxxxx</div>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section--bd">
          <el-tabs v-model="activeName" @tab-click="handleClick" :value="getdata">
            <el-tab-pane label="场馆信息" name="first">
              <div class="form-section--bd">
                <el-row>
                  <el-col :span="6" class="font-606">场馆名称：</el-col>
                  <el-col :span="6" class="font-606">联系电话：</el-col>
                  <el-col :span="6" class="font-606">营业面积：</el-col>
                  <el-col :span="6" class="font-606">场馆地址：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">健身内容：</el-col>
                  <el-col :span="6" class="font-606">标签：</el-col>
                  <el-col :span="6" class="font-606">微信公众号：</el-col>
                  <el-col :span="6" class="font-606">邮箱：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="12" class="font-606">简介：</el-col>
                  <el-col :span="12" class="font-606">备注：</el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="销售统计" name="second">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="订单编号" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="商品" prop="interface_path">

                  </el-table-column>
                  <el-table-column label="会员" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="会员手机" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="支付方式">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column label="交易时间" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="场馆员工" name="third">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="姓名" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="性别" prop="interface_path">

                  </el-table-column>
                  <el-table-column label="手机号" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="职位" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="加入时间" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="场馆会员" name="fourth">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="姓名" prop="id" sortable>

                  </el-table-column>
                  <el-table-column label="手机号" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="会员卡" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="来源" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="标签" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="最后约课时间" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- <div class="form-container"> -->
    <!-- </div> -->
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  margin: 24px;
}
.mt-9 {
  margin-top: 9px;
}
.joinTime {
  margin-left: 90px;
}
.ml-24px {
  margin-left: 24px;
}
</style>

<script>
import avatar from '@/assets/imgs/avatar-no.png'
export default {
  data() {
    return {
      avatar: avatar,
      activeName: 'first',
      getdata: ''
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
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
    editMemberData() {
      this.$router.push({ name: 'AddStaff' })
    }
  }
}
</script>
