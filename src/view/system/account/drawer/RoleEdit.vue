<script setup>
import {ref} from "vue";
import {roleMenueTree} from "@/api/menue/tree_menue.js";
import {Delete, Edit} from "@element-plus/icons-vue";
import {getRoleEditInfo} from "@/api/common/common.js";
import {editRoleStatue} from "@/api/system/role.js";
import {ElNotification} from "element-plus";

const roleId = ref()
const formData = ref({})
const rules = ref({
  name: [
    {required: true, message: '请输入角色名称', trigger: 'blur'},
    {max: 15, message: '角色名称长度在15个字符内', trigger: 'blur'}
  ],
  menues: [
    {required: true, message: '请选择权限', trigger: 'blur'},
  ]
})
const drawerVisible = ref(false)
const form = ref()
const menueList = ref()
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDrawer = (data) => {
  roleId.value = data.rid
  requestMenueList()
  requestEditData()
  drawerVisible.value = true
}

// 关闭添加账户窗口
const closeDrawer = () => {
  initFormData()
  drawerVisible.value = false
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
}

const requestMenueList = async () => {
  roleMenueTree().then(resp => {
    if (resp.code === 200) {
      menueList.value = resp.data.tree
    }
  })
}

const requestEditData = async () => {
  getRoleEditInfo(roleId.value).then(resp => {
    if (resp.code === 200) {
      formData.value = resp.data.form
    }
  })
}

const submitFormData = async () => {
  await form.value.validate()
  formData.value = {...formData.value, rid: roleId.value}
  editRoleStatue(formData.value).then(resp => {
    if (resp.code === 200) {
      ElNotification.success({
        title: '成功',
        message: resp.message,
        offset: 48
      })
      emit('success')
    } else {
      ElNotification.error({
        title: '失败',
        message: resp.message,
        offset: 48
      })
    }
    closeDrawer()
  })
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="修改角色" v-model="drawerVisible" width="27%" @close="closeDrawer">
    <el-form
        @submit.native.prevent
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="角色名称" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="权限" label-width="100px" prop="menues">
        <el-tree-select
            :data="menueList"
            v-model="formData.menues"
            multiple
            show-checkbox>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="描述" label-width="100px" prop="memo">
        <el-input v-model="formData.memo" clearable placeholder="请输入用户名"/>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
