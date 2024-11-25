<script setup>
import {ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {processBatched} from "@/api/subject/product.js";
import {ElMessage} from "element-plus";

const form = ref()
const formData = ref({})
const dialogVisible = ref(false)
const rules = ref({
  statue: [
    {required: true, message: '请选择审批状态', trigger: 'blur'}
  ]
})
const pidMenue = ref([])
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = (ids) => {
  pidMenue.value = ids
  console.log(pidMenue.value)
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  initFormData()
  dialogVisible.value = false
}

const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
}

const submitFormData = async () => {
  await form.value.validate()
  let batch = []
  pidMenue.value.forEach(item => {
    batch.push({
      pid: item.pid,
      statue: formData.value.statue
    })
  })
  processBatched(batch).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      emit('success')
      closeDialog()
    } else {
      ElMessage.success(resp.message)
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="批量纳入产品目录" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style=";max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="审批状态" prop="statue">
        <el-select v-model="formData.statue" clearable>
          <el-option label="通过" :value="1"></el-option>
          <el-option label="不通过" :value="2"></el-option>
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
