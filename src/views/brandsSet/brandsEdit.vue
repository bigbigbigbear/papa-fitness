<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">品牌编辑</h3>
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
                <!--  <el-form-item label="" prop="">
                  <img :src="ruleForm.business_logo ? ruleForm.business_logo : stadiumLogo" alt="" class="avatar-logo">
                </el-form-item> -->
                <el-row>
                  <el-form-item label="品牌图像" prop="avatar">
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
                <el-form-item label="品牌名称" prop="business_name">
                  <el-input v-model="ruleForm.business_name" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                  <el-input v-model="ruleForm.linkman" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系人手机" prop="telephone">
                  <el-input v-model="ruleForm.telephone" placeholder="请输入联系人手机"></el-input>
                </el-form-item>
                <el-form-item label="品牌介绍" prop="description">
                  <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入品牌介绍"></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <h4>品牌信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span='12'>
                <el-form-item label="品牌类型" prop="business_type">
                  <div>{{brandsData.business_type}}</div>
                </el-form-item>
                <el-form-item label="创建时间" prop="c_time_str">
                  <div>{{brandsData.c_time_str}}</div>
                </el-form-item>
                <el-form-item label="到期时间" prop="end_effective">
                  <div>{{brandsData.end_effective}}</div>
                </el-form-item>
                <el-form-item label="场馆限制" prop="business_name">
                  <div>{{brandsData.business_name}}</div>
                </el-form-item>
                <el-form-item label="商户状态" prop="business_status">
                  <div>{{brandsData.business_status}}</div>
                </el-form-item>
                <el-form-item label="场馆目前数量" prop="stadium_maxcount">
                  <div>{{brandsData.stadium_maxcount}}</div>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </div>
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
.edit-brands {
  color: #008cee;
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
import { getBrandsData, editBands } from '@/api/brandsSet'
import stadiumLogo from '@/assets/imgs/stadium-logo-none.png'
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
      brandsData: {},
      stadiumLogo,
      ruleForm: {
        business_name: '',
        linkman: '',
        telephone: '',
        business_logo: '',
        description: ''
      },
      rules: {
        business_name: [{
          required: true,
          message: '请输入品牌名称'
        }],
        linkman: [{
          required: true,
          message: '请输入联系人'
        }],
        telephone: [{
          required: true,
          message: '请输入联系人手机'
        }]
      }
    }
  },
  mounted() {
    getBrandsData().then(result => {
      if (!result.is_error) {
        this.brandsData = result.data
        this.ruleForm.business_name = result.data.business_name
        this.ruleForm.linkman = result.data.linkman
        this.ruleForm.telephone = result.data.telephone
        this.ruleForm.business_logo = result.data.business_logo
        this.ruleForm.description = result.data.description
      }
    })
  },
  components: {
    Webcam
  },
  methods: {
    // 切换头像上传方式
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.editBrands()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editBrands() {
      editBands(this.ruleForm).then(result => {
        if (!result.is_error) {
          this.$message({
            message: '保存成功！',
            type: 'success',
            onClose: this.$router.push({ name: 'BrandsSet' })
          })
        }
      })
    }
  }
}
</script>
