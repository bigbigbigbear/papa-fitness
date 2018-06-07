<template>
  <div class="app-container">
    <div class="app-container--hd">
      <h3 class="pb-20">品牌设置</h3>
    </div>
    <div class="form-container">
      <el-form ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <div class="form-section clearfix">
          <el-col :span='24'>
            <div class="form-section--hd">
              <div class="fr edit-brands pointer" @click="brandsEdit">编辑品牌</div>
              <h4>基础信息</h4>
            </div>
            <div class="form-section--bd clearfix">
              <el-col :span="12">
                <el-form-item label="品牌图像" prop="">
                  <img :src="brandsData.LogoUrl ? brandsData.LogoUrl : stadiumLogo" alt="" class="avatar-logo">
                </el-form-item>
                <el-form-item label="品牌名称" prop="">
                  <div>{{brandsData.business_name}}</div>
                </el-form-item>
                <el-form-item label="联系人" prop="">
                  <div>{{brandsData.linkman}}</div>
                </el-form-item>
                <el-form-item label="联系人手机" prop="">
                  <div>{{brandsData.telephone}}</div>
                </el-form-item>
                <el-form-item label="品牌介绍" prop="">
                  <div>{{brandsData.description}}</div>
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
                <el-form-item label="品牌类型" prop="">
                  <div>{{brandsData.business_type}}</div>
                </el-form-item>
                <el-form-item label="创建时间" prop="">
                  <div>{{brandsData.c_time_str}}</div>
                </el-form-item>
                <el-form-item label="到期时间" prop="" class="">
                  <div>{{brandsData.end_effective}}</div>
                </el-form-item>
                <el-form-item label="场馆限制" prop="">
                  <div>{{brandsData.business_name}}</div>
                </el-form-item>
                <el-form-item label="商户状态" prop="">
                  <div>{{brandsData.business_status}}</div>
                </el-form-item>
                <el-form-item label="场馆目前数量" prop="">
                  <div>{{brandsData.stadium_maxcount}}</div>
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
.avatar-logo {
  height: 64px;
  width: 64px;
}
.edit-brands {
  color: #008cee;
}
</style>
<script>
import { getBrandsData } from '@/api/brandsSet'
import stadiumLogo from '@/assets/imgs/stadium-logo-none.png'
export default {
  data() {
    return {
      brandsData: {},
      stadiumLogo
    }
  },
  mounted() {
    getBrandsData().then(result => {
      if (!result.is_error) {
        this.brandsData = result.data
      }
    })
  },
  methods: {
    brandsEdit() {
      this.$router.push({ name: 'BrandsEdit' })
    }
  }
}
</script>
