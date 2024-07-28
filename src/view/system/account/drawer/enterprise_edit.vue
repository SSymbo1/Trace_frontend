<script setup>
import {ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {getEnterpriseEditInfo} from "@/api/common/common.js";
import {editEnterprise} from "@/api/system/enterprise.js";
import {ElNotification} from "element-plus";

const formData = ref({})
const rules = ref({
  name: [
    {required: true, message: '请输入公司名称', trigger: 'blur'},
    {max: 50, message: '公司名称长度应该在50个字符内', trigger: 'blur'}
  ],
  legalPerson: [
    {required: true, message: '请输入法人姓名', trigger: 'blur'},
    {max: 10, message: '法人姓名长度应该在10个字符内', trigger: 'blur'}
  ],
  tel: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {max: 13, message: '电话号码长度无效', trigger: 'blur'}
  ],
  socialCode: [
    {required: true, message: '请输入社会代码', trigger: 'blur'},
    {max: 25, message: '不合法的社会代码', trigger: 'blur'}
  ],
  address: [
    {required: true, message: '请输入地址', trigger: 'blur'},
    {max: 60, message: '地址长度无效', trigger: 'blur'}
  ],
  zipCode: [
    {required: true, message: '请输入邮编', trigger: 'blur'},
    {max: 6, message: '邮编长度无效', trigger: 'blur'}
  ]
})
const drawerVisible = ref(false)
const form = ref()
const eid = ref()
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDrawer = (data) => {
  eid.value = data.eid
  getEditInfo()
  drawerVisible.value = true
}

// 关闭添加账户窗口
const closeDrawer = () => {
  initFormData()
  drawerVisible.value = false
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
}

const getEditInfo = async () => {
  getEnterpriseEditInfo(eid.value).then(resp => {
    if (resp.code === 200) {
      formData.value = resp.data.form
    }
  })
}

const submitForm = async () => {
  await form.value.validate()
  formData.value = {...formData.value, eid: eid.value}
  editEnterprise(formData.value).then(resp => {
    if (resp.code === 200) {
      ElNotification.success({
        title: '成功',
        message: resp.message,
        offset: 48
      })
      emit('success')
    } else {
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
  <el-drawer title="编辑企业" v-model="drawerVisible" size="30%" @close="closeDrawer">
    <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="公司名称" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入公司名称"/>
      </el-form-item>
      <el-form-item label="法人" label-width="100px" prop="legalPerson">
        <el-input v-model="formData.legalPerson" clearable placeholder="请输入法人姓名"/>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px" prop="tel">
        <el-input v-model="formData.tel" clearable placeholder="请输入联系电话"/>
      </el-form-item>
      <el-form-item label="社会代码" label-width="100px" prop="socialCode">
        <el-input v-model="formData.socialCode" clearable placeholder="请输入社会代码"/>
      </el-form-item>
      <el-form-item label="地址" label-width="100px" prop="address">
        <el-input v-model="formData.address" clearable placeholder="请输入地址"/>
      </el-form-item>
      <el-form-item label="邮编" label-width="100px" prop="zipCode">
        <el-input v-model="formData.zipCode" clearable placeholder="请输入邮编"/>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitForm">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
