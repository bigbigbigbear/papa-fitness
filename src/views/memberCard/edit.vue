<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">编辑会员</h3>
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
                <el-form-item label="会员头像" prop="avatar">
                  <el-radio-group v-model="avatar.upload_way" @change="changeUploadWay">
                    <el-radio :label="1">本地上传</el-radio>
                    <el-radio :label="2">拍照上传</el-radio>
                  </el-radio-group>
                  <div class="local-container" v-show="avatar.showLocal">
                    <el-upload class="upload-demo" :headers="headers" :action="imgAction" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess"
                    :file-list="fileList" list-type="picture" name="image">
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
                <el-form-item label="姓名" prop="user_name">
                  <el-input v-model="form.user_name" placeholder="请输入会员姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                  <el-input v-model="form.mobile" placeholder="请输入会员手机号"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>身份信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="生日" prop="birthday">
                   <el-date-picker v-model="form.birthday" type="date" placeholder="请选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="身份证" prop="identity_card">
                  <el-input v-model="form.identity_card" placeholder="请输入会员身份证号"></el-input>
                </el-form-item>
                <el-form-item label="家庭地址" prop="home_area">
                  <area-select v-model="selected" :level="2" size="large" :placeholders="placeholders" :data="pcaa" @change="getHomeArea"></area-select>
                </el-form-item>
                <el-form-item label="" prop="home_address">
                  <el-input v-model="form.identity_card" placeholder="请输入会员家庭地址"></el-input>
                </el-form-item>
                <el-form-item label="工作地址" prop="company_area">
                  <area-select v-model="selected" :level="2" size="large" :placeholders="placeholders" :data="pcaa" @change="getCompanyArea"></area-select>
                </el-form-item>
                <el-form-item label="" prop="company_address">
                  <el-input v-model="form.identity_card" placeholder="请输入会员工作地址"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="wx">
                  <el-input v-model="form.wx"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                  <el-input v-model="form.nick_name"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>体测信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="身高" prop="height">
                  <el-input v-model="form.height"></el-input>
                </el-form-item>
                <el-form-item label="体重" prop="weight">
                  <el-input v-model="form.weight"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tag_ids">

                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span="24">
            <div class="form-section--hd">
              <h4>入籍信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="入籍推荐人" prop="referrer_id">
                  <el-select v-model="form.referrer_id" placeholder="请选择">
                    <el-option label="推荐人1" value="1"></el-option>
                    <el-option label="推荐人2" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会籍顾问" prop="personnel_id">
                  <el-select v-model="form.personnel_id" placeholder="请选择">
                    <el-option label="会籍顾问1" value="1"></el-option>
                    <el-option label="会籍顾问2" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="教练" prop="instructor_id">
                  <el-select v-model="form.instructor_id" placeholder="请选择">
                    <el-option label="教练1" value="1"></el-option>
                    <el-option label="教练2" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="来源" prop="from_id">
                  <el-select v-model="form.from_id" placeholder="请选择">
                    <el-option label="线下" value="1"></el-option>
                    <el-option label="小程序" value="2"></el-option>
                    <el-option label="公众号" value="3"></el-option>
                    <el-option label="会员引荐" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input type="textarea" v-model="form.remark" placeholder="请输入备注，限100字"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="submitForm('addForm')">提交</el-button>
                  <el-button size="small" @click="cancelSubmit">取消</el-button>
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
.photo-container{
  position: relative;
  .preview-container{
    position: absolute;
    top: 0;
    left: 410px;
    width: 200px;
    height: 150px;
    background-color: #eee;
    text-align: center;
    img{
      width: 100%;
    }
    span{
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
<style>
.area-select-wrap .area-select:nth-of-type(1){
  margin-left: 0;
}
</style>
<script>
import Webcam from '@/components/Webcam'
import { uploadImg } from '@/api/common'
import { dataURItoBlob } from '@/utils'
import { getToken } from '@/utils/auth'
import { pcaa } from 'area-data' // 省市区数据
import { validateMobile } from '@/utils/validate'
import { getMemberInfo, editMember } from '@/api/stadiumMember/index'
export default {
  data () {
    const modifyMobile = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      imgAction: process.env.BASE_API + '/images/upload', // 图片上传地址
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
      pcaa, // 省市区数据
      selected: [], // 省市区默认值
      placeholders: ['选择省', '选择市', '选择区/县'],
      form: {
        avatar: '',
        user_name: '',
        sex: 1,
        mobile: '',
        birthday: '',
        identity_card: '',
        home_area: '',
        home_address: '',
        company_area: '',
        company_address: '',
        wx: '',
        nick_name: '',
        height: '',
        weight: '',
        tag_ids: '',
        referrer_id: 1,
        personnel_id: '',
        instructor_id: '',
        from_id: 1,
        remark: ''
      },
      rules: {
        user_name: [
          {
            required: true, message: '请输入会员姓名', trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true, message: '请选择性别', trigger: 'change'
          }
        ],
        mobile: [
          {
            required: true, message: '请输入会员手机号', trigger: 'blur'
          },
          { required: true, validator: modifyMobile, trigger: 'blur' }
        ],
        referrer_id: [
          {
            required: true, message: '请选择推荐人', trigger: 'change'
          }
        ]
      }
    }
  },
  components: {
    Webcam
  },
  created () {
    this.getMemberInfo()
  },
  methods: {
    getMemberInfo () {
      const uid = this.$route.query.uid
      const params = {
        uid: uid
      }
      getMemberInfo(params).then(res => {
        console.log(res)
      })
    },
    // 切换头像上传方式
    changeUploadWay (val) {
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
    uploadSuccess (res, file, fileList) {
      // console.log(res, file, fileList)
      this.form.avatar = res.data.imgUrl
    },
    // 拍照上传
    savePhoto () {
      this.avatar.previewTip = null
      this.avatar.avatarImg = this.$refs.webcam.capture()
      const base64 = this.$refs.webcam.capture()

      // FormData对象
      var formData = new FormData()
      var blob = dataURItoBlob(base64, 'png')
      formData.append('image', blob, 'test.png')
      uploadImg(formData).then(res => {
        this.form.avatar = res.data.imgUrl
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 获取家庭区域
    getHomeArea (val) {

    },
    // 获取公司区域
    getCompanyArea (val) {

    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const uid = this.$route.query.uid
          const params = this.form
          params.uid = uid
          editMember(params).then(res => {
            this.$message.success('提交成功！')
          })
          this.$router.push({
            name: 'MemberData'
          })
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    cancelSubmit () {
      this.$router.push({
        name: 'MemberData'
      })
    }
  }
}
</script>
