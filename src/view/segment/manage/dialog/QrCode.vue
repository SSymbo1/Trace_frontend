<script setup>
import {ref} from "vue";
import {requestQrCode} from "@/api/segment/segment.js";

const dialogVisible = ref(false)
const traceCode = ref()
const qrCode = ref()

// 打开添加账户窗口
const openDialog = (code) => {
  traceCode.value = code
  getQrCode()
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  dialogVisible.value = false
}

const getQrCode = async () => {
  requestQrCode(traceCode.value).then(resp => {
    if (resp.code === 200) {
      qrCode.value = "data:image/png;base64," + resp.data.qr
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="二维码" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-image :src="qrCode" class="qr-container"/>
  </el-dialog>
</template>

<style scoped lang="scss">
.qr-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
