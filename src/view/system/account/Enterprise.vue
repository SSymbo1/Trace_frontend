<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import bread from '@/json/system_bread_crumb.json'
import router from "@/router/index.js";
import {Edit, Plus, Search} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {getEnterpriseInfoPaged} from "@/api/system/enterprise.js";
import Enterprise_add from "@/view/system/account/dialog/EnterpriseAdd.vue";
import Enterprise_edit from "@/view/system/account/drawer/EnterpriseEdit.vue";
import Enterprise_advanced_search from "@/view/system/account/drawer/EnterpriseAdvancedSearch.vue";

const tabBread = ref(bread.enterprise)
const query = ref({
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
})
const loading = ref(true)
const data = ref()
const add = ref()
const edit = ref()
const search = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestEnterpriseInfo()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestEnterpriseInfo()
}

const openAddDrawer = () => {
  add.value.openDialog()
}

const openEditDrawer = (row) => {
  edit.value.openDrawer(row)
}

// 打开高级搜索drawer
const openEnterpriseAdvancedSearchDrawer = (condition) => {
  search.value.openDrawer(condition)
}

const addSuccessHandler = () => {
  query.value.currentPage = 1
  requestEnterpriseInfo()
}

const editSuccessHandler = () => {
  query.value.currentPage = 1
  requestEnterpriseInfo()
}

// 高级搜素条件回调
const advanceSearchHandler = (condition) => {
  query.value = condition
  requestEnterpriseInfo()
}

const requestEnterpriseInfo = async () => {
  loading.value = true
  getEnterpriseInfoPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

onActivated(() => {
  requestEnterpriseInfo()
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
        @keyup="requestEnterpriseInfo">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="公司名称">
              <template #append>
                <el-button :icon="Search" @click="requestEnterpriseInfo"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" :icon="Search" @click="openEnterpriseAdvancedSearchDrawer(query)">高级搜索
          </el-button>
          <el-button type="primary" :icon="Plus" @click="openAddDrawer">添加企业</el-button>
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
      <el-table-column label="公司名称" prop="name"></el-table-column>
      <el-table-column label="法人" prop="legalPerson"></el-table-column>
      <el-table-column label="联系电话" prop="tel"></el-table-column>
      <el-table-column label="社会代码" prop="socialCode"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="邮编" prop="zipCode"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="编辑" effect="light">
            <el-button type="primary" :icon="Edit" circle @click="openEditDrawer(scope.row)"/>
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

    <enterprise_advanced_search ref="search" @update:data="advanceSearchHandler"></enterprise_advanced_search>

    <enterprise_add ref="add" @success="addSuccessHandler"></enterprise_add>

    <enterprise_edit ref="edit" @success="editSuccessHandler"></enterprise_edit>

  </page_container>
</template>

<style scoped lang="scss">

</style>
