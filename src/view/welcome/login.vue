<script setup>
import welcomeLabel from '@/json/welcome.json';
import {onActivated, onDeactivated, ref} from "vue";
import * as THREE from 'three';
import NET from "vanta/src/vanta.net.js";
import Slide_security from "@/view/component/slide_security.vue";
import {ElMessage} from "element-plus";
import {getPictureCaptcha, userLogin} from "@/api/welcome/welcome.js";
import {useRemember} from "@/store/base/remember.js";

let vantaEffect = null
const area = ref(null)
const showVerity = ref(false)
const remember = ref(false)
const form = ref()
const formData = ref({})
const captcha = ref({})
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  verify: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
  ]
}

// 初始化vanta
const vantaInit = () => {
  vantaEffect = NET({
    el: area.value,
    THREE: THREE,
    color: 0xff3f81,
    backgroundColor: 0x23153c,
    points: 20,
    maxDistance: 27,
    spacing: 20,
    showDots: true
  })
}

// 处理滑块验证成功
const onSlideSecuritySuccess = () => {
  showVerity.value = true
  ElMessage.success({
    grouping: true,
    message: "验证成功"
  })
  requestPictureCaptcha()
}

// 处理滑块验证失败
const onSlideSecurityFailed = () => {
  ElMessage.error({
    grouping: true,
    message: "验证失败"
  })
}

// 记住我
const rememberMe = () => {
  if (useRemember().history.remember) {
    remember.value = true
    formData.value.username = useRemember().history.username
    formData.value.password = useRemember().history.password
  }
}

// 获取图片验证码
const requestPictureCaptcha = () => {
  getPictureCaptcha().then(resp => {
    if (resp.code === 200) {
      captcha.value = resp.data.captcha
      captcha.value.picture = "data:image/png;base64," + captcha.value.picture
    }
  })
}

// 点击登录按钮
const login = async () => {
  if (showVerity.value === false) {
    ElMessage.error({
      grouping: true,
      message: "请先完成滑块验证"
    })
  } else {
    await form.value.validate()
    formData.value = {...formData.value, captcha: captcha.value.captcha}
    userLogin(formData.value).then(resp => {
      if (resp.code === 200) {
        if (remember.value) {
          useRemember().setHistory({
            username: formData.value.username,
            password: formData.value.password,
            remember: remember.value
          })
        } else {
          if (useRemember().history !== null) {
            useRemember().removeHistory()
          }
        }
        ElMessage.success({
          grouping: true,
          message: resp.msg
        })
      }else {
        ElMessage.error({
          grouping: true,
          message: resp.msg
        })
        requestPictureCaptcha()
      }
    })

  }
}

// 生命周期钩子
onActivated(() => {
  vantaInit()
  rememberMe()
})

onDeactivated(() => {
  // 在组件卸载前销毁vanta
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<template>
  <el-row class="login">

    <!--背景及左侧logo文字-->
    <el-col :span="12" class="background">
      <div class="vanta-area" ref="area">
        <div class="logo-area">
          <vuetyped :strings="welcomeLabel.site_title" :loop="false" :smart-backspace='true'>
            <h1 class="typing" style="font-size: xxx-large"></h1>
          </vuetyped>
          <vuetyped :strings="welcomeLabel.slogn" :loop="true" :smart-backspace='true'>
            <h2 class="typing"></h2>
          </vuetyped>
        </div>
      </div>
    </el-col>

    <!--右侧表单-->
    <el-col :span="9" :offset="3" class="form">
      <div class="glass-card">
        <div class="form-content">
          <el-form
              label-position="right"
              label-width="auto"
              ref="form"
              :model="formData"
              :rules="rules"
              style="max-width: 350px"
              :hide-required-asterisk="true"
              @keyup.enter="login">
            <el-form-item>
              <h1 style="margin: 0 auto;padding-bottom: 20px;color: white">系统登录</h1>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="请输入用户名" v-model="formData.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input show-password placeholder="请输入密码" v-model="formData.password" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <slide_security
                  class="slide"
                  @success="onSlideSecuritySuccess"
                  @failed="onSlideSecurityFailed">
              </slide_security>
            </el-form-item>
            <el-form-item label="验证码" prop="verify" v-if="showVerity">
              <el-input
                  placeholder="请输入验证码"
                  v-model="formData.verify"
                  clearable
                  style="width: 140px;float: none">
              </el-input>
              <img
                  :src="captcha.picture"
                  alt="验证码"
                  title="点击更换验证码"
                  @click="requestPictureCaptcha"
                  style="cursor: pointer;float: none;margin-left: 10px"/>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                  style="margin-left: 53px"
                  v-model="remember"
                  label="记住我"
                  size="large"/>
            </el-form-item>
            <el-form-item>
              <el-button
                  type="primary"
                  round
                  size="large"
                  @click="login"
                  style="width: 200px;margin: 0 auto">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<style scoped lang="less">
::v-deep .el-form-item__label {
  color: white;
}

::v-deep .el-checkbox {
  color: white;
}

.vanta-area {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.login {
  height: 100vh;
}

.glass-card {
  background-color: rgba(151, 148, 148, 0.5);
  border-radius: 15px;
  height: 100vh;
}

.logo-area {
  z-index: 1;
  position: absolute;
  top: 40%;
  left: 10%;
  right: 55%;
  color: white;
}

.form-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide {
  margin-left: 6vh;
}
</style>