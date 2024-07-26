<script setup>
import {ref} from "vue";
import {roleSubMenue} from "@/api/menue/sub_menue.js";
import {Delete, Search} from "@element-plus/icons-vue";

const drawerVisible = ref(false);
const formData = ref({})
const roleMenue = ref([])
const emit = defineEmits(['update:data'])

const openDrawer = (advance) => {
  formData.value = advance
  console.log(formData.value)
  getRoleMenue()
  drawerVisible.value = true
}

const closeDrawer = () => {
  drawerVisible.value = false
}

// 获取角色列表
const getRoleMenue = async () => {
  roleSubMenue().then(resp => {
    roleMenue.value = resp.data.menue
  })
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
    address: '',
    ban: 0,
    del: 0,
    email: '',
    gander: '',
    role: '',
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
      <el-form-item label="角色" prop="role">
        <el-select clearable v-model="formData.role" style="width: 200px">
          <el-option
              v-for="role in roleMenue"
              :key="role.index"
              :label="role.name"
              :value="role.rid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="禁用标记" prop="ban">
        <el-select clearable v-model="formData.ban" style="width: 100px;">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="删除标记" prop="del">
        <el-select clearable v-model="formData.del" style="width: 100px;">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="删除" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gander">
        <el-select clearable v-model="formData.gander" style="width: 100px;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="formData.tel" clearable placeholder="请输入电话号"/>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="formData.email" clearable placeholder="请输入电子邮箱地址"/>
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model="formData.address" clearable placeholder="请输入住址"/>
      </el-form-item>
      <el-form-item label="邮编" prop="zipCode">
        <el-input v-model="formData.zipCode" clearable placeholder="请输入邮编"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name" >
        <el-input v-model="formData.name" clearable placeholder="请输入账户所有者的姓名或用户名" style="width: 250px"/>
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
