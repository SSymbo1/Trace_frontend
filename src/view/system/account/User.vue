<script setup>
import bread from '@/json/system_bread_crumb.json'
import router from "@/router/index.js";
import Page_container from "@/view/component/PageContainer.vue";
import {Document, Edit, Open, Plus, Remove, Search, Setting, SwitchButton} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {getAccountInfoPaged} from "@/api/system/account.js";
import Account_info from "@/view/system/account/drawer/AccountInfo.vue";
import Account_add from "@/view/system/account/dialog/AccountAdd.vue";
import Account_advanced_search from "@/view/system/account/drawer/AccountAdvancedSearch.vue";
import Account_set from "@/view/system/account/drawer/AccountSet.vue";
import Account_edit from "@/view/system/account/drawer/AccountEdit.vue";
import Enable_all from "@/view/system/account/dialog/EnableAllAccount.vue";
import Disable_all from "@/view/system/account/dialog/DisableAllAccount.vue";
import {ElMessageBox} from "element-plus";

const tabBread = ref(bread.user)
const data = ref()
const query = ref({
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
})
const info = ref()
const add = ref()
const search = ref()
const set = ref()
const edit = ref()
const loading = ref()
const enable = ref()
const disable = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestAccountInfo()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestAccountInfo()
}

// 搜索用户信息
const requestAccountInfo = async () => {
  loading.value = true
  getAccountInfoPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

// 打开用户信息drawer
const openAccountInfoDrawer = (data) => {
  info.value.openDrawer(data)
}

// 打开添加账户dialog
const openAccountAddDialog = () => {
  add.value.openDialog()
}

// 打开高级搜索drawer
const openAccountAdvancedSearchDrawer = (condition) => {
  search.value.openDrawer(condition)
}

// 打开账户状态设置drawer
const openAccountSetDrawer = (data) => {
  set.value.openDrawer(data)
}

// 打开账户编辑drawer
const openAccountEditDrawer = (data) => {
  edit.value.openDrawer(data)
}

const enableAllAccount = async () => {
  await ElMessageBox.confirm('您确定要启用所有账户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  enable.value.openDialog()
}

const disableAllAccount = async () => {
  await ElMessageBox.confirm('您确定要禁用所有账户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  disable.value.openDialog()

}

// 添加账户成功回调
const addAccountSuccessHandler = () => {
  query.value.currentPage = 1
  requestAccountInfo()
}

// 高级搜索成功回调
const editAccountSuccessHandler = () => {
  query.value.currentPage = 1
  requestAccountInfo()
}

// 账户状态设置成功回调
const setAccountStatueSuccessHandler = () => {
  query.value.currentPage = 1
  requestAccountInfo()
}

// 高级搜素条件回调
const advanceSearchHandler = (condition) => {
  query.value = condition
  requestAccountInfo()
}

const enableAllSuccess = () => {
  query.value.currentPage = 1
  requestAccountInfo()
}

const disableAllSuccess = () => {
  query.value.currentPage = 1
  requestAccountInfo()
}

onActivated(() => {
  requestAccountInfo()
})
</script>

<template>
  <page_container title="">

    <!--  面包屑导航  -->
    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #breadcrumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="tab in tabBread"
                :key="tab.index"
                :to="{ path:tab.path }">
              {{ tab.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <span class="text-large font-600 mr-3">{{ tabBread[2].name }}</span>
        </template>
      </el-page-header>
    </el-row>

    <!-- 搜索及功能栏 -->
    <el-form
        inline
        @submit.native.prevent
        @keyup="requestAccountInfo">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="用户姓名或用户名">
              <template #append>
                <el-button :icon="Search" @click="requestAccountInfo"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="success" :icon="Search" @click="openAccountAdvancedSearchDrawer(query)">高级搜索</el-button>
          <el-button type="primary" :icon="Plus" @click="openAccountAddDialog">添加账户</el-button>
          <el-button type="success" :icon="SwitchButton" @click="enableAllAccount">启用所有账户</el-button>
          <el-button type="danger" :icon="SwitchButton" @click="disableAllAccount">禁用所有账户</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <!--  数据展示  -->
    <el-table
        v-loading="loading"
        :data="data"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="{ row: { avatar } }">
          <el-avatar :src="avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="用户名" prop="account.username"></el-table-column>
      <el-table-column label="所属单位" prop="enterprise.name"></el-table-column>
      <el-table-column label="电话号" prop="tel"></el-table-column>
      <el-table-column label="角色">
        <template v-slot="{ row: { role } }">
          <el-tag type="primary">{{ role.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="帐号状态">
        <template v-slot="{ row: { account } }">
          <el-tag type="success" v-if="account.ban===0">启用</el-tag>
          <el-tag type="danger" v-if="account.ban===1">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="编辑" effect="light">
            <el-button type="primary" :icon="Edit" circle @click="openAccountEditDrawer(scope.row)"/>
          </el-tooltip>
          <el-tooltip content="设置" effect="light">
            <el-button type="success" :icon="Setting" circle @click="openAccountSetDrawer(scope.row)"/>
          </el-tooltip>
          <el-tooltip content="详细信息" effect="light">
            <el-button type="warning" :icon="Document" circle @click="openAccountInfoDrawer(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>

    <!--分页-->
    <el-pagination
        v-model:current-page="query.currentPage"
        v-model:page-size="query.pageSize"
        :page-sizes="[5,10,20,50]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
    />

    <!--  账户信息编辑  -->
    <account_edit ref="edit" @success="editAccountSuccessHandler"></account_edit>

    <!--  账户状态设置  -->
    <account_set ref="set" @success="setAccountStatueSuccessHandler"></account_set>

    <!--  高级搜素  -->
    <account_advanced_search ref="search" @update:data="advanceSearchHandler"></account_advanced_search>

    <!--  添加账户  -->
    <Account_add ref="add" @success="addAccountSuccessHandler"></Account_add>

    <!--  详细信息  -->
    <Account_info ref="info"></Account_info>

    <!--  启用所有账户  -->
    <enable_all ref="enable" @success="enableAllSuccess"></enable_all>

    <!--  禁用所有账户  -->
    <disable_all ref="disable" @success="disableAllSuccess"></disable_all>

  </page_container>
</template>

<style scoped lang="less">

</style>
