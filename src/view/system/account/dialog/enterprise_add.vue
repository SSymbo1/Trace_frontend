<script setup>
import {ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {addEnterprise} from "@/api/system/enterprise.js";
import {ElMessage} from "element-plus";

const formData = ref({})
const rules = ref({
  name: [
    {required: true, message: '请输入公司名称', trigger: 'blur'},
    {max: 50, message: '公司名称长度应该在50个字符内', trigger: 'blur'}
  ],
  type: [
    {required: true, message: '请输入公司性质', trigger: 'blur'},
  ],
  ilk: [
    {required: true, message: '请选择公司类型', trigger: 'blur'},
  ],
  legalPerson: [
    {required: true, message: '请输入法人姓名', trigger: 'blur'},
    {max: 10, message: '法人姓名长度应该在10个字符内', trigger: 'blur'}
  ],
  tel: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
    {min: 13, max: 13, message: '电话号码长度无效', trigger: 'blur'}
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
const dialogVisible = ref(false)
const form = ref()
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = () => {
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  initFormData()
  dialogVisible.value = false
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
}

const submitFormData = async () => {
  await form.value.validate()
  addEnterprise(formData.value).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      emit('success')
      closeDialog()
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
  <el-dialog title="添加企业" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="公司名称" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入公司名称"/>
      </el-form-item>
      <el-form-item label="公司性质" label-width="100px" prop="type">
        <el-select clearable v-model="formData.type">
          <el-option label="正常企业" value="0"></el-option>
          <el-option label="供应商" value="1"></el-option>
          <el-option label="供销商" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业类型" label-width="100px" prop="ilk">
        <el-select clearable v-model="formData.ilk">
          <el-option label="团体单位" :value="0"></el-option>
          <el-option label="种植企业" :value="1"></el-option>
          <el-option label="养殖企业" :value="2"></el-option>
          <el-option label="生产加工" :value="3"></el-option>
          <el-option label="屠宰企业" :value="4"></el-option>
          <el-option label="批发市场" :value="5"></el-option>
          <el-option label="农贸市场" :value="6"></el-option>
          <el-option label="连锁超市" :value="7"></el-option>
        </el-select>
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
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
