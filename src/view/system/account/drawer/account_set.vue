<script setup>
import {ref} from "vue";
import {Edit} from "@element-plus/icons-vue";
import {setAccountStatue} from "@/api/system/account.js";
import {ElMessage, ElNotification} from "element-plus";
import caution from '@/json/account_set_caution.json'

const drawerVisible = ref(false);
const formData = ref({})
const rules = ref({
  ban: [{required: true, message: '请选择禁用标记', trigger: 'blur'}],
  del: [{required: true, message: '请选择删除标记', trigger: 'blur'}]
})
const form = ref()
const emit = defineEmits(['success'])

const openDrawer = (data) => {
  formData.value.aid = data.account.aid
  formData.value.ban = data.account.ban
  formData.value.del = data.account.del
  drawerVisible.value = true
}

const closeDrawer = () => {
  formData.value = {}
  drawerVisible.value = false
  form.value.clearValidate()
}

const submitFormData = async () => {
  await form.value.validate()
  setAccountStatue(formData.value).then(resp => {
    if (resp.code===200){
      ElNotification.success({
        title: '成功',
        message: resp.message,
        offset: 48
      })
      emit('success')
    }else {
      ElNotification.error({
        title: '失败',
        message: resp.message,
        offset: 48
      })
    }
    closeDrawer()
  })
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="用户设置" v-model="drawerVisible" size="25%" @close="closeDrawer">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="禁用标记" label-width="100px" prop="ban">
        <el-select clearable v-model="formData.ban">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="删除标记" label-width="100px" prop="del">
        <el-select clearable v-model="formData.del">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="删除" :value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
    </div>
    <el-input
        v-model="caution.caution"
        type="textarea"
        disabled
        style="margin-top: 15px"
        resize="none"
        rows="10"></el-input>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
