<script setup>
import {ref} from "vue";
import Captcha from "@/view/system/account/dialog/captcha.vue";

const isDecode = ref(false)
const drawerVisible = ref(false);
const data = ref({})
const captcha = ref()
const password = ref('')

const openDrawer = (queryData) => {
  data.value = queryData
  password.value = queryData.account.password
  drawerVisible.value = true
}

const closeDrawer = () => {
  drawerVisible.value = false
  isDecode.value = false
}

const openCaptchaDialog = (aid) => {
  if (isDecode.value === false) {
    captcha.value.openDialog(password.value, aid)
  }
}

const handlePasswordEncode = (decode) => {
  isDecode.value = true
  password.value = decode
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="用户详细信息" v-model="drawerVisible" size="42%" @close="closeDrawer">
    <el-descriptions :column="2" border direction="horizontal">
      <el-descriptions-item label="姓名" label-align="center">
        <el-text class="show-text">{{ data.name }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="性别" label-align="center">
        <el-text class="show-text">{{ data.gander }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="用户名" label-align="center">
        <el-text class="show-text">{{ data.account.username }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="密码" label-align="center">
        <el-tooltip content="点击查看密码" effect="light" placement="top">
          <el-text class="show-text" @click="openCaptchaDialog(data.account.aid)" style="cursor: pointer">
            {{ password }}
          </el-text>
        </el-tooltip>
      </el-descriptions-item>
      <el-descriptions-item label="账户状态" label-align="center">
        <el-tag type="success" v-if="data.account.ban===0" size="large">启用</el-tag>
        <el-tag type="danger" v-if="data.account.ban===1" size="large">禁用</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="平台角色" label-align="center">
        <el-tag type="primary" size="large">{{ data.role.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="电话" label-align="center">
        <el-text class="show-text">{{ data.tel }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱" label-align="center">
        <el-text class="show-text">{{ data.email }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="住址" label-align="center">
        <el-text class="show-text">{{ data.address }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="邮编" label-align="center">
        <el-text class="show-text">{{ data.zipCode }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="所属单位" label-align="center">
        <el-text class="show-text">{{ data.enterprise.name }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="法人" label-align="center">
        <el-text class="show-text">{{ data.enterprise.legalPerson }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="法人电话" label-align="center">
        <el-text class="show-text">{{ data.enterprise.tel }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="单位地址" label-align="center">
        <el-text class="show-text">{{ data.enterprise.address }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="单位邮编" label-align="center">
        <el-text class="show-text">{{ data.enterprise.zipCode }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="社会信用代码" label-align="center">
        <el-text class="show-text">{{ data.enterprise.socialCode }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="备注" label-align="center">
        <el-text class="show-text">{{ data.account.memo }}</el-text>
      </el-descriptions-item>
    </el-descriptions>

    <captcha ref="captcha" @update:data="handlePasswordEncode"></captcha>

  </el-drawer>
</template>

<style scoped lang="scss">
.show-text {
  margin-left: 2px;
}
</style>
