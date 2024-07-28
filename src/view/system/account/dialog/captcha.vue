<script setup>
import {ref} from "vue";
import {getPictureCaptcha} from "@/api/welcome/welcome.js";
import {Edit} from "@element-plus/icons-vue";
import {decodePass} from "@/api/common/common.js";
import {ElMessage} from "element-plus";

const dialogVisible = ref(false)
const formData = ref({})
const rules = ref({
  verify: [{required: true, message: '验证码不能为空', trigger: 'blur'},]
})
const captcha = ref({})
const form = ref()
const emit = defineEmits(['update:data'])

const openDialog = (encode, aid) => {
  formData.value.encodePass = encode
  formData.value.aid = aid
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

const submitFormData = async () => {
  await form.value.validate()
  formData.value.timestamp = Date.now()
  console.log(formData.value)
  decodePass(formData.value).then(resp => {
    if (resp.code === 200) {
      ElMessage.success({
        grouping: true,
        message: resp.message
      })
      emit('update:data', resp.data.decode)
      closeDialog()
    } else {
      ElMessage.error({
        grouping: true,
        message: resp.message
      })
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="请求解码密码" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;margin-left: 30px;margin-top: 15px">
      <el-form-item label="验证码" prop="verify">
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
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
