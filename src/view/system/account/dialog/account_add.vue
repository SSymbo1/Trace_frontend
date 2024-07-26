<script setup>
import {ref} from "vue";
import {enterpriseSubMenue, roleSubMenue} from "@/api/menue/sub_menue.js";
import {Delete, Edit} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import {useBackend} from "@/store/base/backend.js";
import {useToken} from "@/store/index.js";
import {avatarUpload} from "@/api/file/file_upload.js";
import {addAccountInfo} from "@/api/system/account.js";

const formData = ref({})
const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 11, message: '用户名长度应该在5-11个字符内', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 18, message: '密码长度应该在6-18个字符内', trigger: 'blur'}
  ],
  role: [
    {required: true, message: '请选择角色', trigger: 'blur'},
  ],
  enterprise: [
    {required: true, message: '请选择所属企业', trigger: 'blur'},
  ],
  name: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {max: 30, message: '姓名长度应该在30个字符内', trigger: 'blur'}
  ],
  gander: [
    {required: true, message: '请选择性别', trigger: 'blur'},
  ],
  tel: [
    {required: true, message: '请输入电话号码', trigger: 'blur'},
    {min: 11, max: 11, message: '电话号码长度无效', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
    {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱地址', trigger: 'blur'}
  ],
  address: [
    {required: true, message: '请输入地址', trigger: 'blur'},
    {max: 60, message: '地址长度无效', trigger: 'blur'}
  ],
  zipCode: [
    {required: true, message: '请输入邮编', trigger: 'blur'},
    {max: 6, message: '邮编长度无效', trigger: 'blur'}
  ]
})
const dialogVisible = ref(false)
const form = ref()
const roleMenue = ref([])
const enterpriseMenue = ref([])
const enterpriseKeyWord = ref('')
const avatar = ref([])
const avatarUrl = ref('')
const emit = defineEmits(['success'])

// 打开添加账户窗口
const openDialog = () => {
  getRoleMenue()
  getEnterpriseMenue()
  dialogVisible.value = true
}

// 关闭添加账户窗口
const closeDialog = () => {
  initFormData()
  roleMenue.value = []
  enterpriseMenue.value = []
  dialogVisible.value = false
}

// 获取角色列表
const getRoleMenue = async () => {
  roleSubMenue().then(resp => {
    roleMenue.value = resp.data.menue
  })
}

// 根据关键字获取企业列表
const getEnterpriseMenue = async () => {
  enterpriseSubMenue(enterpriseKeyWord.value).then(resp => {
    enterpriseMenue.value = resp.data.menue
  })
}

// 初始化表单
const initFormData = () => {
  form.value.clearValidate()
  formData.value = {}
  enterpriseKeyWord.value = ''
  avatarUrl.value = ''
  avatar.value = []
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

// 移除上传资源
const handleRemove = () => {
  avatarUrl.value = ''
}

// 当上传复数文件时
const handleExceed = (file, fileList) => {
  if (fileList.length > 1) {
    fileList.splice(0, 1);
  }
}

// 上传文件资源（头像）
const handleSubmitAvatar = async (files) => {
  let avatar = new FormData()
  avatar.append("avatar", files.file)
  avatarUpload(avatar).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.msg)
      avatarUrl.value = resp.data.avatar.name
      console.log(avatarUrl.value)
    } else {
      ElMessage.error(resp.msg)
    }
  })
}

// 提交表单数据
const submitFormData = async () => {
  await form.value.validate()
  formData.value = {...formData.value, avatar: avatarUrl.value}
  addAccountInfo(formData.value).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.msg)
      emit('success')
      closeDialog()
    } else {
      ElMessage.error(resp.msg)
    }
  })
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog title="添加账户" v-model="dialogVisible" width="27%" @close="closeDialog">
    <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="auto"
        style="max-width: 350px;vertical-align: center;margin-top: 15px">
      <el-form-item label="头像" label-width="100px" prop="avatar">
        <el-upload
            :file-list="avatar"
            :before-upload="handleTestFile"
            :on-change="handleExceed"
            :on-remove="handleRemove"
            :http-request="handleSubmitAvatar"
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
      <el-form-item label="用户名" label-width="100px" prop="username">
        <el-input v-model="formData.username" clearable placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码" label-width="100px" prop="password">
        <el-input v-model="formData.password" clearable show-password placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item label="角色" label-width="100px" prop="role">
        <el-select clearable v-model="formData.role">
          <el-option
              v-for="role in roleMenue"
              :key="role.index"
              :label="role.name"
              :value="role.rid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属企业" label-width="100px" prop="enterprise">
        <el-select clearable v-model="formData.enterprise">
          <template #header>
            <el-input
                v-model="enterpriseKeyWord"
                clearable
                @keyup="getEnterpriseMenue"
                placeholder="请输入公司名或社会代码"></el-input>
          </template>
          <el-option
              v-for="enterprise in enterpriseMenue"
              :key="enterprise.index"
              :label="enterprise.name"
              :value="enterprise.eid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" label-width="100px" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="性别" label-width="100px" prop="gander">
        <el-select clearable v-model="formData.gander">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" label-width="100px" prop="tel">
        <el-input v-model="formData.tel" clearable placeholder="请输入电话号"/>
      </el-form-item>
      <el-form-item label="电子邮箱" label-width="100px" prop="email">
        <el-input v-model="formData.email" clearable placeholder="请输入电子邮箱地址"/>
      </el-form-item>
      <el-form-item label="住址" label-width="100px" prop="address">
        <el-input v-model="formData.address" clearable placeholder="请输入住址"/>
      </el-form-item>
      <el-form-item label="邮编" label-width="100px" prop="zipCode">
        <el-input v-model="formData.zipCode" clearable placeholder="请输入邮编"/>
      </el-form-item>
    </el-form>
    <div style="display: flex;justify-content: end">
      <el-button type="success" :icon="Edit" @click="submitFormData">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="initFormData">重置</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
