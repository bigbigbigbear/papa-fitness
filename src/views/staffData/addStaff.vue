<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">添加员工</h3>
    </div>
    <div class="form-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>基础信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-row>
                  <el-form-item label="会员头像" prop="avatar">
                    <el-radio-group v-model="avatar.upload_way" @change="changeUploadWay">
                      <el-radio :label="1">本地上传</el-radio>
                      <el-radio :label="2">拍照上传</el-radio>
                    </el-radio-group>
                    <div class="local-container" v-show="avatar.showLocal">
                      <el-upload class="upload-demo" :headers="headers" :action="imgAction" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess" :file-list="fileList" list-type="picture" name="image">
                        <el-button size="small" type="primary" plain>选择图片</el-button>

                        <div slot="tip" class="el-upload__tip font-grey">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </div>
                    <div class="photo-container" v-show="avatar.showPhoto">
                      <webcam ref="webcam"></webcam>
                      <div class="preview-container">
                        <span class="font-grey font-12">{{avatar.previewTip}}</span>
                        <img :src="avatar.avatarImg" alt="" />
                      </div>
                      <el-button class="btn" size="small" type="primary" @click="savePhoto" plain>保存上传</el-button>
                    </div>
                  </el-form-item>
                </el-row>
                <el-form-item label="姓名" prop="personnel_name">
                  <el-input v-model="ruleForm.personnel_name" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                  <el-input v-model="ruleForm.mobile" placeholder="请输入员工手机号"></el-input>
                </el-form-item>
                <el-form-item label="场馆" prop="gym_id">
                  <el-select v-model="ruleForm.gym_id" placeholder="请选择场馆" multiple>
                    <el-option label="区域一" value="111"></el-option>
                    <el-option label="区域二" value="222"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="position_id">
                  <el-checkbox-group v-model="ruleForm.position_id">
                    <el-checkbox label="1">普通员工</el-checkbox>
                    <el-checkbox label="2">教练</el-checkbox>
                    <el-checkbox label="3">会籍顾问</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>个人信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span='12'>
                <el-form-item label="生日" prop="birthday">
                  <el-input v-model="ruleForm.birthday" placeholder="请输入员工生日"></el-input>
                </el-form-item>
                <el-form-item label="身份证" prop="identity_card">
                  <el-input v-model="ruleForm.identity_card" placeholder="请输入员工身份证号"></el-input>
                </el-form-item>
                <el-form-item label="家庭地址" prop="home_area" class="area_address">
                  <area-select v-model="selected" :level="2" size="large" :placeholders="placeholders" :data="pcaa" @change="getAddress"></area-select>
                </el-form-item>
                <el-form-item label="" prop="address">
                  <el-input v-model="ruleForm.address" placeholder="请输入会员家庭地址"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="wx">
                  <el-input v-model="ruleForm.wx" placeholder="请输入员工微信号"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                  <el-input v-model="ruleForm.nick_name" placeholder="请输入员工昵称"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="des">
                  <el-input type="textarea" v-model="ruleForm.des" placeholder="请输入员工简介"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="personnel_remark">
                  <el-input type="textarea" v-model="ruleForm.personnel_remark" placeholder="请输入员工简介"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>系统账号与角色</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span='12'>
                <el-form-item label="是否允许登录" prop="is_allowed_login">
                  <el-select v-model="ruleForm.is_allowed_login" placeholder="请选择场馆">
                    <el-option label="不允许" value="0"></el-option>
                    <el-option label="允许" value="1"></el-option>
                  </el-select>
                  <el-checkbox-group v-model="ruleForm.role_ids">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="禁用" disabled></el-checkbox>
                    <el-checkbox label="选中且禁用" disabled></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="账号" prop="acount">
                  <el-input v-model="ruleForm.acount" placeholder="请输入员工系统账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="ruleForm.password" placeholder="请输入员工系统密码"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix" v-for='(item, index) in ruleForm.position_id' :key="index">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>职位{{index == 0 ? '一' : index == 1 ? '二' : '三'}}</h4>
            </div>
            <div class="form-section--bd clearfix" v-if='item == 1'>
              <el-col :span='12'>
                <el-form-item label="场馆职位">
                  <span>普通员工</span>
                </el-form-item>
              </el-col>
            </div>
            <div class="form-section--bd clearfix" v-if='item == 2'>
              <el-col :span='12'>
                <el-form-item label="场馆职位">
                  <span>教练</span>
                </el-form-item>
                <el-form-item label="从业时间" prop="coach_job_time	">
                  <el-input v-model="ruleForm.coach_job_time	" placeholder="请输入从业时间"></el-input>
                </el-form-item>
                <el-form-item label="擅长" prop="position_tag">
                  <el-select v-model="ruleForm.position_tag" placeholder="请选择特长">
                    <el-option label="区域一" value="1"></el-option>
                    <el-option label="区域二" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="每日私教课上限" prop="day_upper_limit">
                  <el-input v-model="ruleForm.day_upper_limit" placeholder="每日私教课上限"></el-input>
                </el-form-item>
              </el-col>
            </div>
            <div class="form-section--bd clearfix" v-if='item == 3'>
              <el-col :span='12'>
                <el-form-item label="场馆职位">
                  <span>会籍顾问</span>
                </el-form-item>
                <el-form-item label="从业时间" prop="advisor_job_time">
                  <el-input v-model="ruleForm.advisor_job_time" placeholder="请输入从业时间"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <!-- 隐藏域提交 省市区id -->
        <el-form-item prop='province_id'>
          <el-input v-model="ruleForm.province_id" class="hide"></el-input>
        </el-form-item>
        <el-form-item prop='city_id' class="hide">
          <el-input v-model="ruleForm.city_id"></el-input>
        </el-form-item>
        <el-form-item prop='county_id' class="hide">
          <el-input v-model="ruleForm.county_id"></el-input>
        </el-form-item>

        <div class="from-section--bd">
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.area_address /deep/ .area-select:nth-of-type(1) {
  margin-left: 0;
}
.photo-container {
  position: relative;
  .preview-container {
    position: absolute;
    top: 0;
    left: 410px;
    width: 200px;
    height: 150px;
    background-color: #eee;
    text-align: center;
    img {
      width: 100%;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .btn {
    position: absolute;
    bottom: 10px;
    left: 470px;
  }
}
</style>

<script>
import Webcam from '@/components/Webcam'
import { uploadImg } from '@/api/common'
import { dataURItoBlob } from '@/utils'
import { getToken } from '@/utils/auth'
import { addStaffData } from '@/api/staffData'
import { pcaa } from 'area-data'
export default {
  data() {
    return {
      imgAction: process.env.BASE_API + '/images/upload', // 图片上传地址
      placeholders: ['选择省', '选择市', '选择区/县'],
      headers: {
        token: getToken() // 图片上传headers配置
      },
      fileList: [], // 默认上传的图片列表
      avatar: {
        previewTip: '点击"保存上传"查看预览图',
        avatarImg: null,
        upload_way: 1,
        showLocal: true,
        showPhoto: false,
        showCamera: false
      },
      fileList2: [],
      ruleForm: {
        avatar: '',
        personnel_name: '',
        sex: '1',
        mobile: '',
        gym_id: '',
        position_id: [],
        birthday: '',
        identity_card: '',
        address: '',
        wx: '',
        nick_name: '',
        des: '',
        is_allowed_login: '1',
        role_ids: '',
        acount: '',
        password: '',
        coach_job_time: 0,
        advisor_job_time: '',
        position_tag: '',
        day_upper_limit: 0,
        province_id: '',
        city_id: '',
        county_id: '',
        personnel_remark: '',
        checkList: ['选中且禁用', '复选框 A']
      },
      pcaa: pcaa,
      selected: [],
      rules: {
        personnel_name: [
          {
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            message: '名字长度不能少于两个字符',
            trigger: 'blur'
          }
        ],
        sex: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        mobile: [{
          required: true,
          message: '请输入员工手机号码',
          trigger: 'blur'
        }],
        gym_id: [{
          required: true,
          message: '请选择场馆',
          trigger: 'change'
        }],
        position_id: [{
          required: true,
          message: '请选择员工职位',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
  },
  components: {
    Webcam
  },
  mounted() {
  },
  methods: {// 切换头像上传方式
    changeUploadWay(val) {
      if (val === 1) {
        this.avatar.showLocal = true
        this.avatar.showPhoto = false
        return
      }
      if (val === 2) {
        this.avatar.showLocal = false
        this.avatar.showPhoto = true
        this.$refs.webcam.requestMedia()
        return
      }
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.ruleForm.avatar = res.data.imgUrl
    },
    // 拍照上传
    savePhoto() {
      this.avatar.previewTip = null
      this.avatar.avatarImg = this.$refs.webcam.capture()
      const base64 = this.$refs.webcam.capture()

      // FormData对象
      var formData = new FormData()
      var blob = dataURItoBlob(base64, 'png')
      formData.append('image', blob, 'test.png')
      uploadImg(formData).then(res => {
        this.ruleForm.avatar = res.data.imgUrl
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitForm(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.addData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addData() {
      // 对数据进行格式转换，以满足后台需要格式
      this.ruleForm.position_ids = this.ruleForm.position_id.join(',')
      this.ruleForm.gym_ids = this.ruleForm.gym_id.join(',')
      addStaffData(this.ruleForm).then((result) => {
        if (!result.is_error) {
          this.$message({
            message: '成功添加员工！',
            type: 'success',
            onClose: this.$router.push({ name: 'StaffData' })
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取家庭住址的值
    getAddress() {
      const that = this
      that.selected.forEach(function(v, k) {
        if (k === 0) {
          that.ruleForm.province_id = v
        }
        if (k === 1) {
          that.ruleForm.city_id = v
        }
        if (k === 2) {
          that.ruleForm.county_id = v
        }
      })
    }
  }
}
</script>
