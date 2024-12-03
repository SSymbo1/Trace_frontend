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
  drawerVisible.value = false
}

const init = () => {
  formData.value = {
    pageSize: 5,
    total: 0,
    currentPage: 1,
    name: '',
    code: '',
    generate: 0,
    isTrace: 0
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
      <el-form-item label="供应商名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入供应商名称"/>
      </el-form-item>
      <el-form-item label="供应商编号" prop="code">
        <el-input v-model="formData.code" clearable placeholder="请输入供应商编号"/>
      </el-form-item>
      <el-form-item label="数据生成规则" prop="generate">
        <el-select clearable v-model="formData.generate" style="width: 100px;">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="停用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="追溯体系" prop="isTrace">
        <el-select clearable v-model="formData.isTrace" style="width: 100px;">
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
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
