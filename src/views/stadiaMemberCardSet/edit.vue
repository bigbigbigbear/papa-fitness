<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">添加会员卡种类</h3>
    </div>
    <div class="form-container">
      <el-form :model="form" :rules="rules" ref="addForm" label-width="170px" class="form">
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>基础信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="会员卡名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入会员卡名称" autofocus="true"></el-input>
                </el-form-item>
                <el-form-item label="会员卡类型" prop="type">
                  <el-select v-model="form.type" placeholder="请选择" prop="type" @change="changeType">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>会员卡价格</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="次数" prop="times" v-show="form.type == 1">
                  <el-input type="number" v-model="form.times" placeholder="请输入会员卡次数">
                    <span slot="suffix">次</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="储值金额" prop="money" v-show="form.type == 2">
                  <el-input v-model="form.money" placeholder="请输入会员卡储值">
                    <span slot="suffix">元</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="期限" prop="days" v-show="form.type == 3">
                  <el-input type="number" v-model="form.days" placeholder="请输入会员卡有效期">
                    <span slot="suffix">天</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="原价" prop="original">
                  <el-input v-model="form.original" placeholder="请输入会员卡原价">
                    <span slot="suffix">元</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="售价" prop="current">
                  <el-input v-model="form.current" placeholder="请输入会员卡售价">
                    <span slot="suffix">元</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="有效期" prop="validity" v-show="form.type != 3">
                  <el-input type="number" v-model="form.validity" placeholder="请输入会员卡有效期">
                    <span slot="suffix">天</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>高级设置</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="即将失效提醒" prop="remind">
                  <el-radio-group v-model="form.remind">
                    <el-radio :label="7">剩余7天</el-radio>
                    <el-radio :label="15">剩余15天</el-radio>
                    <el-radio :label="30">剩余30天</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--ft clearfix">
              <el-col :span="12">
                <el-form-item>
                  <el-button size="small" @click="cancelSubmit">取消</el-button>
                  <el-button size="small" type="primary" @click="submitForm('addForm')">提交</el-button>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
import { getMemberCardType, editMemberCardType } from '@/api/stadiumMember/index'
export default {
  data() {
    return {
      form: {
        name: '',
        type: 1,
        times: '',
        money: '',
        days: '',
        original: '',
        current: '',
        validity: '',
        remind: 7
      },
      options: [{
        value: 1,
        label: '次数类型'
      }, {
        value: 2,
        label: '储值类型'
      }, {
        value: 3,
        label: '期限类型'
      }],
      rules: {
        name: [
          {
            required: true, message: '请输入会员姓名', trigger: 'blur'
          }
        ],
        type: [
          {
            required: true, message: '请选择会员卡类型', trigger: 'change'
          }
        ],
        times: [
          {
            required: true, message: '请输入会员卡次数', trigger: 'blur'
          }
        ],
        money: [
          {
            required: true, message: '请输入会员卡储值', trigger: 'blur'
          }
        ],
        days: [
          {
            required: true, message: '请输入会员卡期限', trigger: 'blur'
          }
        ],
        original: [
          {
            required: true, message: '请输入会员卡原价', trigger: 'blur'
          }
        ],
        current: [
          {
            required: true, message: '请输入会员卡售价', trigger: 'blur'
          }
        ],
        validity: [
          {
            required: true, message: '请输入会员卡有效期', trigger: 'blur'
          }
        ],
        remind: [
          {
            required: true, message: '请选择失效提醒时间', trigger: 'change'
          }
        ]
      }
    }
  },
  components: {

  },
  created() {
    this.getCardTypeInfo()
  },
  methods: {
    changeType(val) {
      console.log(val)
    },
    getCardTypeInfo() {
      const tid = this.$route.query.tid
      const params = {
        tid: tid
      }
      getMemberCardType(params).then(res => {
        const data = res.data
        this.form = data
      })
    },
    editMemCardType(fieldList, form) {
      Promise.all(fieldList.map((item, index) => {
        return form.validateField(item, (valid) => {
          if (!valid) {
            const len = fieldList.length
            const tid = this.$route.query.tid
            if (len - 1 === index) {
              const params = this.form
              params.tid = tid
              editMemberCardType(params).then(res => {
                this.$message.success('提交成功！')
                this.$router.push({
                  name: 'StadiaMemberCardSet'
                })
              })
            }
            console.log('验证成功')
          } else {
            console.log('验证失败')
            return false
          }
        })
      }))
    },
    submitForm(formName) {
      const form = this.$refs[formName]
      const type = this.form.type
      let fieldList = []
      switch (type) {
        case 1:
          fieldList = ['name', 'type', 'times', 'original', 'current', 'validity', 'remind']
          break
        case 2:
          fieldList = ['name', 'type', 'money', 'original', 'current', 'validity', 'remind']
          break
        case 3:
          fieldList = ['name', 'type', 'days', 'original', 'current', 'remind']
          break
      }
      this.editMemCardType(fieldList, form)
    },
    cancelSubmit() {
      this.$router.push({
        name: 'StadiaMemberCardSet'
      })
    }
  }
}
</script>
