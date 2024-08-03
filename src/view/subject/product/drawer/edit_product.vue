<script setup>
import {ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";

const formData = ref({})
const rules = ref({})
const drawerVisible = ref(false)
const pid=ref()
const form = ref()
const emit = defineEmits(['success'])

const openDrawer = (data) => {
  pid.value = data
  requestFormData()
  drawerVisible.value = true
}

const closeDrawer = () => {
  initFormData()
  drawerVisible.value = false
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
}

const requestFormData = async () => {

}

const submitFormData = async () => {

}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="编辑账户" v-model="drawerVisible" size="30%" @close="closeDrawer">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">

    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
