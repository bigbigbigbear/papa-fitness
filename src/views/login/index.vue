<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0">
      <h3 class="title">
        <img src="../../assets/imgs/logo-login.png" alt="健身馆家">
      </h3>
      <p class="slogan">{{$t('login.slogan')}}</p>
      <el-form-item prop="username" label="">
        <el-input v-model="loginForm.username" autoComplete="off" :placeholder="$t('login.username')">
          <svg-icon slot="prefix" class="el-input__icon" icon-class="icon-user" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off"
          :placeholder="$t('login.password')">
          <svg-icon slot="prefix" class="el-input__icon" icon-class="icon-password" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{$t('login.logIn')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    isvalidUsername
  } from '@/utils/validate'
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  export default {
    name: 'login',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'ppfs',
          password: 'admin'
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    computed: {
      ...mapGetters([
        'menuitems', // 菜单对象
        'isLoadRoutes' // 用来判断是否是第一次登录，用来排除重复加载路由规则
      ])
    },
    methods: {
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('Login', this.loginForm)
              .then(() => {
                this.loading = false
                // 登录成功后重定向到首页
                this.$router.push({
                  path: '/'
                })
              })
              .catch(err => {
                this.loading = false
                this.$message.error(err) // 登录失败提示错误
              })
          } else {
            console.log('提交失败!!')
            return false
          }
        })
      },
      ...mapActions([
        'addMenu', // 添加菜单
        'loadRoutes' // 更改loadRoutes的值
      ])
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: rgba(234,241,255,0.07);
  $dark_gray: #889aa4;
  $light_gray: #EFEFF4;
  $orange: #f56839;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background: $dark_gray url('../../assets/imgs/bg-login.png') no-repeat center;
    .login-form {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 528px;
      padding: 30px 80px 36px 80px;
      background-color: $bg;
      .svg-icon {
        width: 25px;
      }
    }
    .title {
      text-align: center;
    }
    .slogan {
      margin: 0 auto 20px;
      font-size: 14px;
      text-align: center;
      color: $light_gray;
    }
  }
</style>
