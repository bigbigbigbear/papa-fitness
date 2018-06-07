<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">会员主页</h3>
    </div>
    <div class="app-container--bd">
      <el-row :gutter="10" class="ph-20">
        <el-col :xs="24" :lg="12">
          <div class="grid-content">
            <div class="grid-content--l">
              <img src="../../assets/imgs/member-none.png" alt="" v-if="memberInfo.avatar === ''">
              <img :src="memberInfo.avatar" alt="" v-else>
            </div>
            <div class="grid-content--r ph-20">
              <h4>{{memberInfo.user_name}}</h4>
              <p class="font-14">电话：{{memberInfo.mobile}}&nbsp;&nbsp;教练：{{memberInfo.instructor_id}}&nbsp;&nbsp;顾问：{{memberInfo.personnel_id}}</p>
              <p class="font-12 font-grey">创建时间：{{memberInfo.c_time | parseTime('{y}-{M}-{d} {h}:{m}')}}</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <div class="grid-content btn-wrapper">
            <el-button @click="editMember">编辑</el-button>
            <el-button>办卡</el-button>
            <el-button>预约</el-button>
            <el-button type="success">跟进</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="app-container--bd">
      <div class="tab-container ph-20">
        <el-tabs class="tabs-wrapper">
          <el-tab-pane label="预约记录">
            <div class="table-container">
              <el-table :key='tableKey' :data="memberList" v-loading="listLoading" element-loading-text="正在获取数据。。。" border fit stripe highlight-current-row
                style="width: 100%">
                <el-table-column align="center" type="index" label="序号" width="60px">

                </el-table-column>
                <el-table-column label="预约课程" prop="mobile">

                </el-table-column>
                <el-table-column label="上课人数" prop="mobile">

                </el-table-column>
                <el-table-column label="会员卡" prop="memberCard">
                </el-table-column>
                <el-table-column label="上课时间" prop="instructor">
                </el-table-column>
                <el-table-column label="课程价格" prop="personnel">
                </el-table-column>
                <el-table-column label="教练" prop="from">
                </el-table-column>
                <el-table-column label="状态" prop="tag">
                </el-table-column>
                <el-table-column label="预约时间" prop="reserve_time">
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{$t('table.edit')}}</el-button>
                    <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.signup')}}</el-button>
                    <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{$t('table.cancel')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination-container fr">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click="handlePrevClick"
                @next-click="handleNextClick" :current-page="page" :page-sizes="[10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="账户消费">
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
                    <el-button type="text" @click="checkedMember(scope.$index, scope.row)">{{$t('table.checked')}}</el-button>
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
          </el-tab-pane>
          <el-tab-pane label="跟进记录">
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
                    <el-button type="text" @click="checkedMember(scope.$index, scope.row)">{{$t('table.checked')}}</el-button>
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
          </el-tab-pane>
          <el-tab-pane label="会员卡">
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
                    <el-button type="text" @click="checkedMember(scope.$index, scope.row)">{{$t('table.checked')}}</el-button>
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
          </el-tab-pane>
          <el-tab-pane label="基础资料">
            <div class="section">
              <div class="section--hd">
                <h4>基础信息</h4>
              </div>
              <div class="section--bd">
                <el-row :gutter="20">
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      姓名：{{memberInfo.user_name}}<br>
                      生日：{{memberInfo.birthday}}<br>
                      会籍顾问：{{memberInfo.personnel_string}}<br>
                      家庭地址：{{memberInfo.home_address}}
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      性别：{{memberInfo.sex | compare(3)}}<br>
                      微信：{{memberInfo.wx}}<br>
                      入籍推荐人：{{memberInfo.referrer_string}}<br>
                      工作地址：{{memberInfo.company_address}}
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      手机：{{memberInfo.mobile}}<br>
                      昵称：{{memberInfo.nick_name}}<br>
                      教练：{{memberInfo.instructor_string}}<br>
                      备注：{{memberInfo.remark}}
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      身份证：{{memberInfo.identity_card}}<br>
                      来源：{{memberInfo.from_string}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <hr>
            <div class="section">
              <div class="section--hd">
                <h4>健身信息</h4>
              </div>
              <div class="section--bd">
                <el-row :gutter="20">
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      身高：{{memberInfo.height}}<br>
                      健身目标：无
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      体重：{{memberInfo.weight}}
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      体型：无
                    </div>
                  </el-col>
                  <el-col :xs="24" :lg="6">
                    <div class="grid-content">
                      健身经验：无
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <hr>
            <div class="section">
              <div class="section--hd">
                <h4>标签</h4>
              </div>
              <div class="section--bd">
                <div class="tag active" v-for="(item, index) in tagsList" :key="index">{{item}}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .grid-content {
    display: flex;
    .grid-content--l {
      width: 64px;
      height: 64px;
      overflow: hidden;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .grid-content--r {
      line-height: 1.5;
    }
  }
  .btn-wrapper{
    justify-content: flex-end;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
<script>
  import {
    getMemberInfo
  } from '@/api/stadiumMember/index'
  import {
    parseTime,
    compare
  } from '@/utils/filters'
  export default {
    data () {
      return {
        memberInfo: {},
        tagsList: [],
        width: '104px',
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
      this.getMemInfo()
    },
    methods: {
      getMemInfo () {
        const uid = this.$route.query.uid
        const params = {
          uid: uid
        }
        getMemberInfo(params).then(res => {
          const tags = res.data.tag_names
          this.memberInfo = res.data
          this.tagsList = tags.split(',')
        })
      },
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
      // 编辑会员
      editMember: function () {
        const uid = this.$route.query.uid
        this.$router.push({
          name: 'EditMember',
          query: {
            uid: uid
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
