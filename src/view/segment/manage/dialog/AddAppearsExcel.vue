<script setup>
import {ref} from "vue";
import {uploadAppearsExcel} from "@/api/file/file_upload.js";
import {ElMessage, ElNotification} from "element-plus";

const formData = ref({})
const dialogVisible = ref(false)
const file = ref([])
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
  formData.value = {}
  file.value = []
}

// 上传资源前，校验资源
const handleTestFile = (file) => {
  let regx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  console.log(file.type)
  if (file.size > 50 * 1024 * 1024) {
    ElMessage.error("最大电子表格大小50Mb")
    return false
  }
  if (regx !== file.type) {
    ElMessage.error("表格格式不正确!")
    return false
  }
  return true
}

// 当上传复数文件时
const handleExceed = (file, fileList) => {
  if (fileList.length > 1) {
    fileList.splice(0, 1);
  }
}

// 上传文件资源（头像）
const handleSubmitAvatar = async (files) => {
  let file = new FormData()
  file.append('excel', files.file)
  uploadAppearsExcel(file).then(resp => {
    if (resp.code === 200) {
      ElNotification.success({
        title: '成功',
        message: resp.message,
        offset: 48
      })
      closeDialog()
      emit('success')
    } else {
      ElNotification.error({
        title: '失败',
        message: resp.data.info.message,
        offset: 48
      })
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="按表格导入" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form-item label="表格" label-width="100px" prop="file" style="margin-top: 15px">
      <el-upload
          :file-list="file"
          :before-upload="handleTestFile"
          :on-change="handleExceed"
          :http-request="handleSubmitAvatar"
          :limit="2"
          list-type="text"
          accept=".xlsx"
          :auto-upload="true">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">
            表格必须是.xlsx格式且小于50Mb
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
