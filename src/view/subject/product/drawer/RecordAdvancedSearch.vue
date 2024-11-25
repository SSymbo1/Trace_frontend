<script setup>
import {ref} from "vue";
import {Delete, Search} from "@element-plus/icons-vue";

const drawerVisible = ref(false);
const formData = ref({})
const emit = defineEmits(['update:data'])

const openDrawer = (advance) => {
  formData.value = advance
  drawerVisible.value = true
}

const closeDrawer = () => {
  init()
  formData.value = {}
  drawerVisible.value = false
}

const init = () => {
  formData.value = {
    pageSize: 5,
    total: 0,
    currentPage: 1,
    name: '',
    enterprise: '',
    classification: '',
    isMajor: 0,
    importType: 0,
    statue: 0
  }
}

const search = () => {
  emit('update:data', formData.value)
  drawerVisible.value = false
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="高级搜索" v-model="drawerVisible" direction="ttb" @close="closeDrawer">
    <el-form
        v-model="formData"
        label-position="right"
        label-width="auto"
        :inline="true">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入商品名称或商品编码"/>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="formData.enterprise" clearable placeholder="请输入企业名称或企业编码"/>
      </el-form-item>
      <el-form-item label="产品分类" prop="cid">
        <el-input v-model="formData.classification" clearable placeholder="请输入产品分类名称"/>
      </el-form-item>
      <el-form-item label="是否重点产品" prop="isMajor">
        <el-select v-model="formData.isMajor" style="width: 100px;">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导入类型" prop="importType">
        <el-select v-model="formData.importType" style="width: 150px;">
          <el-option label="逐条导入" :value="1"></el-option>
          <el-option label="批量表格导入" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态" prop="statue">
        <el-select v-model="formData.statue" style="width: 150px;">
          <el-option label="通过" :value="1"></el-option>
          <el-option label="未通过" :value="2"></el-option>
          <el-option label="等待审核" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Search" @click="search">搜索</el-button>
      <el-button type="primary" :icon="Delete" @click="init">清空条件</el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
