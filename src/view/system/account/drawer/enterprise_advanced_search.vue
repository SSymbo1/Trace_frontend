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
    socialCode: '',
    legalPerson: '',
    address: '',
    del: 0,
    tel: '',
    zipCode: ''
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
      <el-form-item label="公司名称" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入公司名称"/>
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
