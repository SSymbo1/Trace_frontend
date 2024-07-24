<script setup>
import bread from '@/json/system_bread_crumb.json'
import router from "@/router/index.js";
import Page_container from "@/view/component/page_container.vue";
import {Document, Edit, Plus, Search, Setting} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {getAccountInfoPaged} from "@/api/system/account.js";
import User_info from "@/view/system/account/drawer/account_info.vue";

const tabBread = ref(bread.user)
const data = ref()
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  address: '',
  ban: false,
  del: false,
  email: '',
  gander: '',
  role: '',
  tel: '',
  zipCode: ''
})
const info = ref()

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
  getAccountInfoPaged(query.value).then(resp => {
    query.value.total = resp.data.iPage.total
    query.value.pageSize = resp.data.iPage.size
    data.value = resp.data.iPage.records
  })
}

const openAccountInfoDrawer = (data) => {
  info.value.openDrawer(data)
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
    <el-form inline>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="用户姓名">
              <template #append>
                <el-button :icon="Search"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" :icon="Search">高级搜索</el-button>
          <el-button type="primary" :icon="Plus">添加账户</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <!--  数据展示  -->
    <el-table
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
            <el-button type="primary" :icon="Edit" circle/>
          </el-tooltip>
          <el-tooltip content="设置" effect="light">
            <el-button type="success" :icon="Setting" circle/>
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

    <user_info ref="info"></user_info>

  </page_container>
</template>

<style scoped lang="less">

</style>
