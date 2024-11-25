<script setup>
import {ref} from "vue";
import {enterpriseSubMenue} from "@/api/menue/sub_menue.js";
import {Delete, Edit} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {addImportantEnterprise} from "@/api/analysis/struct.js";

const dialogVisible = ref(false)
const formData = ref({})
const form = ref()
const rules = ref({
  eid: [
    {required: true, message: '请选择企业', trigger: 'blur'},
  ],
})
const enterpriseMenue = ref([])
const enterpriseKeyWord = ref('')
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = () => {
  getEnterpriseMenue()
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  initFormData()
  enterpriseMenue.value = []
  dialogVisible.value = false
}

// 根据关键字获取企业列表
const getEnterpriseMenue = async () => {
  enterpriseSubMenue(enterpriseKeyWord.value).then(resp => {
    enterpriseMenue.value = resp.data.menue
  })
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
  enterpriseKeyWord.value = ''
}

// 提交表单数据
const submitFormData = async () => {
  await form.value.validate()
  addImportantEnterprise(formData.value).then(resp => {
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
  <el-dialog title="添加重要企业" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="选择企业" label-width="100px" prop="eid">
        <el-select clearable v-model="formData.eid">
          <template #header>
            <el-input
                v-model="enterpriseKeyWord"
                clearable
                @keyup="getEnterpriseMenue"
                placeholder="请输入公司名或社会代码"></el-input>
          </template>
          <el-option
              v-for="enterprise in enterpriseMenue"
              :key="enterprise.index"
              :label="enterprise.name"
              :value="enterprise.eid"></el-option>
        </el-select>
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
