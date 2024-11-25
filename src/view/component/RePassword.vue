<script setup>
import {ref} from 'vue'
import {getPictureCaptcha, rePassword} from "@/api/welcome/welcome.js";
import {Edit} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useRemember} from "@/store/base/remember.js";
import {useAccountStore} from "@/store/base/account.js";
import {useToken} from "@/store/index.js";
import {useRouter} from "vue-router";

const useTokenStore = useToken()
const formData = ref({})
const rules = ref({
  password: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {pattern: /^[.\w@]+$/, message: '新密码只能包括数字字母 "." "_" "@"', trigger: 'blur'},
    {min: 6, max: 18, message: '新密码长度应该在6-18个字符内', trigger: 'blur'}
  ],
  rePass: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {pattern: /^[.\w@]+$/, message: '密码只能包括数字字母 "." "_" "@"', trigger: 'blur'},
    {min: 6, max: 18, message: '密码长度应该在6-18个字符内', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
  verify: [{required: true, message: '验证码不能为空', trigger: 'blur'}]
})
const dialogVisible = ref(false)
const form = ref()
const captcha = ref({})
const router = useRouter()

const openDialog = () => {
  requestPictureCaptcha()
  dialogVisible.value = true
}

const closeDialog = () => {
  formData.value = {}
  form.value.clearValidate()
  dialogVisible.value = false
}

const requestPictureCaptcha = () => {
  getPictureCaptcha().then(resp => {
    if (resp.code === 200) {
      captcha.value = resp.data.captcha
      formData.value.captcha = resp.data.captcha.captcha
      captcha.value.picture = "data:image/png;base64," + captcha.value.picture
    }
  })
}

const resetPassword = async () => {
  await form.value.validate()
  formData.value.timestamp = Date.now()
  await rePassword(formData.value).then(resp => {
    if (resp.code === 200) {
      if (useRemember().history.remember) {
        useRemember().history.username = ''
        useRemember().history.password = ''
        useRemember().history.remember = false
      }
      ElMessage.success(resp.message)
      closeDialog()
      ElMessage.warning("即将退出登录")
      useTokenStore.removeToken()
      useAccountStore().removeAccount()
      router.push('/login')
    } else {
      ElMessage.error(resp.message)
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="请求修改密码" v-model="dialogVisible" width="30%" @close="closeDialog">
    <el-form
        @keyup.enter="resetPassword"
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;margin-left: 30px;margin-top: 15px">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="rePass">
        <el-input v-model="formData.rePass" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <el-input
            placeholder="请输入验证码"
            v-model="formData.verify"
            clearable
            style="width: 120px;float: none">
        </el-input>
        <img
            :src="captcha.picture"
            alt="验证码"
            title="点击更换验证码"
            @click="requestPictureCaptcha"
            style="cursor: pointer;float: none;margin-left: 10px"/>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="primary" :icon="Edit" @click="resetPassword">修改</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
