<script setup>
import {ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {roleMenueTree} from "@/api/menue/tree_menue.js";
import {addRole} from "@/api/system/role.js";
import {ElMessage} from "element-plus";

const formData = ref({})
const dialogVisible = ref(false)
const rules = ref({
  name: [
    {required: true, message: '请输入角色名称', trigger: 'blur'},
    {max: 15, message: '角色名称长度在15个字符内', trigger: 'blur'}
  ],
  menues: [
    {required: true, message: '请选择权限', trigger: 'blur'},
  ]
})
const form = ref()
const menueList = ref()
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = () => {
  requestMenueList()
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  initFormData()
  dialogVisible.value = false
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

const submitForm = async () => {
  await form.value.validate()
  addRole(formData.value).then(resp => {
    if (resp.code===200){
      ElMessage.success(resp.message)
      emit('success')
      closeDialog()
    }else {
      ElMessage.error(resp.message)
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="添加角色" v-model="dialogVisible" width="27%" @close="closeDialog">
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
      <el-button type="success" :icon="Edit" @click="submitForm">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
