<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import bread from '@/json/system_bread_crumb.json'
import router from "@/router/index.js";
import {Edit, Plus, Search, Setting, SwitchButton} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {getRoleInfoPaged} from "@/api/system/role.js";
import Role_add from "@/view/system/account/dialog/RoleAdd.vue";
import Role_advanced_search from "@/view/system/account/drawer/RoleAdvancedSearch.vue";
import Role_set from "@/view/system/account/drawer/RoleSet.vue";
import Role_edit from "@/view/system/account/drawer/RoleEdit.vue";
import Enable_all_role from "@/view/system/account/dialog/EnableAllRole.vue";
import Disable_all_role from "@/view/system/account/dialog/DisableAllRole.vue";
import {ElMessageBox} from "element-plus";

const tabBread = ref(bread.role)
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  del: 0,
  ban: 0
})
const loading = ref(true)
const data = ref()
const add = ref()
const search = ref()
const set = ref()
const edit = ref()
const enable = ref()
const disable = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestRoleInfo()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestRoleInfo()
}

const requestRoleInfo = async () => {
  loading.value = true
  getRoleInfoPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

const openAddRoleDialog = () => {
  add.value.openDialog()
}

const openRoleAdvancedSearchDrawer = (condition) => {
  search.value.openDrawer(condition)
}

const openRoleSetDrawer = (data) => {
  set.value.openDrawer(data)
}

const openRoleEditDrawer = (data) => {
  edit.value.openDrawer(data)
}

const openEnableAllRoleDialog = async () => {
  await ElMessageBox.confirm('您确定要启用所有角色吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  enable.value.openDialog()
}

const openDisableAllRoleDialog = async () => {
  await ElMessageBox.confirm('您确定要启用所有角色吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  disable.value.openDialog()
}

const addRoleSuccessHandler = () => {
  query.value.currentPage = 1
  requestRoleInfo()
}

const setRoleSuccessHandler = () => {
  query.value.currentPage = 1
  requestRoleInfo()
}

const editRoleSuccessHandler = () => {
  query.value.currentPage = 1
  requestRoleInfo()
}

const advanceSearchHandler = (condition) => {
  query.value = condition
  requestRoleInfo()
}

const enableAllRoleSuccessHandler = () => {
  query.value.currentPage = 1
  requestRoleInfo()
}

const disableAllRoleSuccessHandler = () => {
  query.value.currentPage = 1
  requestRoleInfo()
}

onActivated(() => {
  requestRoleInfo()
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
        @keyup="requestRoleInfo">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="角色名称">
              <template #append>
                <el-button :icon="Search" @click="requestRoleInfo"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="success" :icon="Search" @click="openRoleAdvancedSearchDrawer(query)">高级搜索</el-button>
          <el-button type="primary" :icon="Plus" @click="openAddRoleDialog">添加角色</el-button>
          <el-button type="success" :icon="SwitchButton" @click="openEnableAllRoleDialog">启用所有角色</el-button>
          <el-button type="danger" :icon="SwitchButton" @click="openDisableAllRoleDialog">禁用所有角色</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <el-table
        v-loading="loading"
        :data="data"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="权限">
        <template v-slot="{ row: { menueList } }">
          <el-tag type="primary"
                  v-for="menue in menueList"
                  :key="menue.index">
            {{ menue }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="memo"></el-table-column>
      <el-table-column label="角色状态">
        <template v-slot="{ row: { ban } }">
          <el-tag type="success" v-if="ban===0">启用</el-tag>
          <el-tag type="danger" v-if="ban===1">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="编辑" effect="light">
            <el-button type="primary" :icon="Edit" circle @click="openRoleEditDrawer(scope.row)"/>
          </el-tooltip>
          <el-tooltip content="设置" effect="light">
            <el-button type="success" :icon="Setting" circle @click="openRoleSetDrawer(scope.row)"/>
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

    <role_advanced_search ref="search" @update:data="advanceSearchHandler"></role_advanced_search>

    <role_add ref="add" @success="addRoleSuccessHandler"></role_add>

    <role_set ref="set" @success="setRoleSuccessHandler"></role_set>

    <role_edit ref="edit" @success="editRoleSuccessHandler"></role_edit>

    <enable_all_role ref="enable" @success="enableAllRoleSuccessHandler"></enable_all_role>

    <disable_all_role ref="disable" @success="disableAllRoleSuccessHandler"></disable_all_role>

  </page_container>
</template>

<style scoped lang="scss">

</style>
