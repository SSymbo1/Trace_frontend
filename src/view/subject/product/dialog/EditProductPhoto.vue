<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {productImgUpload} from "@/api/file/file_upload.js";

const formData = ref({})
const dialogVisible = ref(false)
const file = ref([])
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = (pid) => {
  formData.value.pid = pid
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
  let regx = /^image\/(jpeg|png|jpg|JPEG|PNG|JPG)$/
  if (file.size > 50 * 1024 * 1024) {
    ElMessage.error("最大图片大小50Mb")
    return false
  }
  if (!regx.test(file.type)) {
    ElMessage.error("图片格式不正确!")
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
const handleSubmitPhoto = async (files) => {
  let file = new FormData()
  file.append('photo', files.file)
  file.append('goodsId', formData.value.pid)
  productImgUpload(file).then(resp => {
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
  <el-dialog title="修改产品图片" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form-item label="表格" label-width="100px" prop="file" style="margin-top: 15px">
      <el-upload
          :file-list="file"
          :before-upload="handleTestFile"
          :on-change="handleExceed"
          :http-request="handleSubmitPhoto"
          :limit="2"
          list-type="picture"
          accept="image/*"
          :auto-upload="true">
        <template #trigger>
          <el-button type="primary">选择图片</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">
            图片必须是jpg/png/jpeg格式且小于50Mb
          </div>
        </template>
      </el-upload>
    </el-form-item>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
