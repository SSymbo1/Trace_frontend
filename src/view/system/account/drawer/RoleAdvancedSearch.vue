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

const search = () => {
  emit('update:data', formData.value)
  drawerVisible.value = false
}

const init = () => {
  formData.value = {
    pageSize: 5,
    total: 0,
    currentPage: 1,
    name: '',
    del: 0,
    ban: 0
  }
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
      <el-form-item label="角色名称" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入角色名称"/>
      </el-form-item>
      <el-form-item label="禁用标记" prop="del">
        <el-select clearable v-model="formData.ban" style="width: 100px;">
          <el-option label="禁用" :value="1"></el-option>
          <el-option label="启用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="删除标记" prop="del">
        <el-select clearable v-model="formData.del" style="width: 100px;">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="删除" :value="1"></el-option>
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
