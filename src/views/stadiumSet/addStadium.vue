<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">添加场馆</h3>
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
                  <el-form-item label="场馆图片" prop="avatar">
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
                <el-form-item label="品牌" prop="personnel_name">
                  <el-input v-model="ruleForm.personnel_name" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="场馆名称" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入场馆名称"></el-input>
                </el-form-item>
                <el-form-item label="场馆电话" prop="telephone">
                  <el-input v-model="ruleForm.telephone" placeholder="请输入场馆电话"></el-input>
                </el-form-item>
                <el-form-item label="场馆地址" prop="address" class="area_address">
                  <area-select v-model="selected" :level="2" size="large" :placeholders="placeholders" :data="pcaa" @change="getAddress"></area-select>
                </el-form-item>
                <el-form-item label="" prop="address">
                  <el-input v-model="ruleForm.address" placeholder="请输入场馆地址"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>场馆信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span='12'>
                <el-form-item label="营业面积" prop="gym_area">
                  <el-input v-model="ruleForm.gym_area" placeholder="请输入场馆营业面积"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                  <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入场馆简介，限300字"></el-input>
                </el-form-item>
                <el-form-item label="健身内容" prop="sport_tag_id">
                  <el-select v-model="ruleForm.sport_tag_id" placeholder="请选择健身内容" multiple>
                    <el-option label="区域一" value="111"></el-option>
                    <el-option label="区域二" value="222"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标签" prop="label_id">
                  <el-select v-model="ruleForm.label_id" placeholder="请选择标签" multiple>
                    <el-option label="区域一" value="111"></el-option>
                    <el-option label="区域二" value="222"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注，限100字"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>其余联系方式</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span='12'>
                <el-form-item label="微信公众号" prop="we_chat_official_accounts">
                  <el-input v-model="ruleForm.we_chat_official_accounts" placeholder="请输入微信公众号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
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
        <el-form-item prop='business_id' class="hide">
          <el-input v-model="ruleForm.business_id"></el-input>
        </el-form-item>

        <div class="from-section--bd">
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
import { addStadium } from '@/api/StadiumSet'
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
        gym_logo: '',
        business_id: '',
        name: '',
        telephone: '',
        address: '',
        gym_area: '',
        description: '',
        sport_tag_id: '',
        label_id: '',
        province_id: '',
        city_id: '',
        county_id: '',
        remark: '',
        we_chat_official_accounts: '',
        email: ''
      },
      pcaa,
      selected: [],
      rules: {
        name: [{
          required: true,
          message: '请输入场馆名称',
          trigger: 'change'
        }],
        telephone: [{
          required: true,
          message: '请输入场馆电话',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入场馆地址',
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
      addStadium(this.ruleForm).then((result) => {
        if (!result.is_error) {
          this.$message({
            message: '成功添加场馆！',
            type: 'success',
            onClose: this.$router.push({ name: 'StadiumSet' })
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
