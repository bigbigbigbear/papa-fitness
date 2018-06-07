<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">员工主页</h3>
    </div>
    <div class="form-container">
      <div class="form-section">
        <img :src="staffData.avatar_url + '?imageView2/1/w/64/h/64'" alt="" class="avatar fl" v-if="staffData.avatar_url">
        <img :src="avatar + '?imageView2/1/w/64/h/64'" alt="" class="avatar fl" v-if="!staffData.avatar_url">
        <div class="form-section--bd memberdata-bd">
          <el-button type="primary" class="fr" @click="editMemberData">编辑</el-button>
          <div class="memberName mt-9">{{staffData.personnel_name}}</div>
          <div class="mobile pt-16">
            <span>电话：{{staffData.mobile}}</span>
            <span class="ml-24px">所属场馆：{{staffData.gym_names}}</span>
            <span class="ml-24px">职位：{{staffData.position}}</span>
            <span class="ml-24px">状态：</span>
          </div>
          <div class="joinTime pt-16 font-12 font-grey">加入时间：{{staffData.c_time_value}}</div>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section--hd">基础信息</div>
        <div class="form-section--bd">
          <el-row>
            <el-col :span="6" class="font-606">姓名：{{staffData.personnel_name}}</el-col>
            <el-col :span="6" class="font-606">性别：{{staffData.sex_str}}</el-col>
            <el-col :span="6" class="font-606">手机：{{staffData.mobile}}</el-col>
            <el-col :span="6" class="font-606">身份证：{{staffData.identity_card}}</el-col>
          </el-row>
          <el-row class="mt-10">
            <el-col :span="6" class="font-606">生日：{{staffData.birthday}}</el-col>
            <el-col :span="6" class="font-606">微信：{{staffData.wx}}</el-col>
            <el-col :span="6" class="font-606">昵称：{{staffData.nick_name}}</el-col>
            <el-col :span="6" class="font-606">家庭住址：{{staffData.address_str}}</el-col>
          </el-row>
          <el-row class="mt-10">
            <el-col :span="6" class="font-606">所属场馆：{{staffData.gym_names}}</el-col>
            <el-col :span="6" class="font-606">职位：{{staffData.position}}</el-col>
            <el-col :span="12" class="font-606">个人简介：{{staffData.des}}</el-col>
          </el-row>
          <el-row class="mt-10">
            <el-col :span="6" class="font-606">系统账号：{{staffData.account}}</el-col>
            <el-col :span="6" class="font-606">系统角色：{{staffData.role_names}}</el-col>
            <el-col :span="12" class="font-606">备注：{{staffData.personnel_remark}}</el-col>
          </el-row>
          <el-row class="mt-10" v-for="(item, index) in staffData.position_ids" :key='index'>
            <el-row v-if="item == 1">
              <el-col :span="24" class="font-606">职位{{index == 0 ? '1' : index == 1 ? '2' : '3'}}：普通员工</el-col>
            </el-row>
            <el-row v-if="item == 2">
              <el-col :span="6" class="font-606">职位{{index == 0 ? '1' : index == 1 ? '2' : '3'}}：教练</el-col>
              <el-col :span="6" class="font-606">从业时间：{{staffData.coach_job_time}}</el-col>
              <el-col :span="6" class="font-606">擅长：{{staffData.position_tag}}</el-col>
              <el-col :span="6" class="font-606">每日私教课上限：{{staffData.day_upper_limit}}</el-col>
            </el-row>
            <el-row v-if="item == 3">
              <el-col :span="12" class="font-606">职位{{index == 0 ? '1' : index == 1 ? '2' : '3'}}：会籍顾问</el-col>
              <el-col :span="12" class="font-606">从业时间：{{staffData.advisor_job_time}}</el-col>
            </el-row>
          </el-row>
        </div>
      </div>
      <!-- <div class="form-section">
        <div class="form-section--bd">
          <el-tabs v-model="activeName" @tab-click="handleClick" :value="getdata">
            <el-tab-pane label="预约记录" name="first">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                  style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="预约课程" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="上课人数" prop="interface_path">

                  </el-table-column>
                  <el-table-column label="会员卡" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="上课时间" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="课程价格" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="预约时间">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="场馆">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                  @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="基础资料" name="second">
              <div class="form-section--bd">
                <el-row>
                  <el-col :span="6" class="font-606">姓名：</el-col>
                  <el-col :span="6" class="font-606">性别：</el-col>
                  <el-col :span="6" class="font-606">手机：</el-col>
                  <el-col :span="6" class="font-606">身份证：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">生日：</el-col>
                  <el-col :span="6" class="font-606">微信：</el-col>
                  <el-col :span="6" class="font-606">昵称：</el-col>
                  <el-col :span="6" class="font-606">家庭住址</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">所属场馆：</el-col>
                  <el-col :span="6" class="font-606">职位：</el-col>
                  <el-col :span="12" class="font-606">个人简介：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">系统账号：</el-col>
                  <el-col :span="6" class="font-606">系统角色：</el-col>
                  <el-col :span="12" class="font-606">每日私教课上限：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">擅长：</el-col>
                  <el-col :span="6" class="font-606">从业时间：</el-col>
                  <el-col :span="12" class="font-606">备注</el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="会员列表" name="third">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                  style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="姓名" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="手机号" prop="interface_path">

                  </el-table-column>
                  <el-table-column label="会员卡" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="场馆" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="来源" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="标签">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="最后约课时间">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                  @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="评价记录" name="fourth">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                  style="width: 100%">
                  <el-table-column align="center" label="评价时间" prop="id" sortable>

                  </el-table-column>
                  <el-table-column label="评价人" prop="interface_name" align="center">

                  </el-table-column>
                  <el-table-column label="评价内容" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                  @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section--bd">
          <el-tabs v-model="activeName" @tab-click="handleClick" :value="getdata">
            <el-tab-pane label="销售记录" name="first">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                  style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="会员" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="会员卡" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="销售时间" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="销售金额" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="销售场馆" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="消费说明" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                  @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="基础资料" name="second">
              <div class="form-section--bd">
                <el-row>
                  <el-col :span="6" class="font-606">姓名：</el-col>
                  <el-col :span="6" class="font-606">性别：</el-col>
                  <el-col :span="6" class="font-606">手机：</el-col>
                  <el-col :span="6" class="font-606">身份证：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">生日：</el-col>
                  <el-col :span="6" class="font-606">微信：</el-col>
                  <el-col :span="6" class="font-606">昵称：</el-col>
                  <el-col :span="6" class="font-606">家庭住址：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">所属场馆：</el-col>
                  <el-col :span="6" class="font-606">职位：</el-col>
                  <el-col :span="6" class="font-606">从业时间：</el-col>
                  <el-col :span="6" class="font-606">个人简介：</el-col>
                </el-row>
                <el-row class="mt-10">
                  <el-col :span="6" class="font-606">系统账号：</el-col>
                  <el-col :span="6" class="font-606">系统角色：</el-col>
                  <el-col :span="12" class="font-606">备注</el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="会员列表" name="third">
              <div class="table-container ph-20">
                <el-table :key='tableKey' :data="apiList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                  style="width: 100%">
                  <el-table-column align="center" label="序号" prop="id" width="60px">

                  </el-table-column>
                  <el-table-column label="姓名" prop="interface_name">

                  </el-table-column>
                  <el-table-column label="手机号" prop="interface_path">

                  </el-table-column>
                  <el-table-column label="会员卡" prop="interface_type">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_type | getApiType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="场馆" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="来源" prop="interface_status">
                    <template slot-scope="scope">
                      <span>{{scope.row.interface_status | compare}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="标签">
                    <template slot-scope="scope">
                      <span>{{scope.row.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="最后约课时间">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination-container ph-20 fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                  @next-click="handleNextClick" :current-page="page" :page-sizes="[10,15,20,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div> -->
    </div>
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
import { getStaffData } from '@/api/staffData'
export default {
  data() {
    return {
      avatar: avatar,
      activeName: 'first',
      staffData: {}
      // getdata: ''
    }
  },
  computed: {
  },
  mounted() {
    const personnel_id = this.$route.query.personnel_id
    if (!personnel_id) {
      this.$message.error('未选中员工！')
      return false
    } else {
      const param = {
        personnel_id: personnel_id
      }
      this.$nextTick(() => {
        getStaffData(param).then(result => {
          this.staffData = result.data
        })
      })
    }
  },
  methods: {
    // handleSizeChange (val) {
    //   this.pageSize = val
    //   this.getApiList()
    // },
    // handleCurrentChange (val) {
    //   this.page = val
    //   this.getApiList()
    // },
    // handlePrevClick (val) {
    //   this.page = val
    //   this.getApiList()
    // },
    // handleNextClick (val) {
    //   this.page = val
    //   this.getApiList()
    // },
    editMemberData() {
      this.$router.push({ name: 'EditStaffData', query: { personnel_id: this.staffData.personnel_id } })
    }
  }
}
</script>
