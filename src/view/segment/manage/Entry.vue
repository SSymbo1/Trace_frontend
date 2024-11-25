<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import {onActivated, ref} from "vue";
import bread from '@/json/segment_bread_crumb.json'
import router from "@/router/index.js";
import {DocumentAdd, Edit, Picture, Search, Setting} from "@element-plus/icons-vue";
import {getEntryPaged} from "@/api/segment/segment.js";
import Add_entry_excel from "@/view/segment/manage/dialog/AddEntryExcel.vue";
import Entry_advanced_search from "@/view/segment/manage/drawer/EntryAdvancedSearch.vue";
import Qr_code from "@/view/segment/manage/dialog/QrCode.vue";

const tabBread = ref(bread.entry)
const data = ref()
const loading = ref()
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  batch: '',
  trace: '',
  buyerType: 1
})
const excel = ref()
const info = ref()
const code = ref()


// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestData()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestData()
}

const openUploadExcelDialog = () => {
  excel.value.openDialog()
}

const openSearchDrawer = () => {
  info.value.openDrawer(query.value)
}

const openQrCodeDialog = (row) => {
  code.value.openDialog(row)
}

const uploadExcelSuccessHandler = () => {
  query.value.currentPage = 1
  requestData()
}

const searchHandler = (search) => {
  query.value = search
  requestData()
}

const requestData = async () => {
  loading.value = true
  getEntryPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

onActivated(() => {
  requestData()
})
</script>

<template>
  <page_container title="">

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
        @keyup="requestData">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="经营商户名称">
              <template #append>
                <el-button :icon="Search" @click="requestData"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" :icon="Search" @click="openSearchDrawer">高级搜索</el-button>
          <el-button type="primary" :icon="DocumentAdd" @click="openUploadExcelDialog">按表格导入</el-button>
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
      <el-table-column label="经营商户代码" prop="enterpriseCode"></el-table-column>
      <el-table-column label="经营商户名称" prop="enterpriseName"></el-table-column>
      <el-table-column label="业务生成日期" prop="businessTime"></el-table-column>
      <el-table-column label="商品代码" prop="code"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="批次号" prop="batch"></el-table-column>
      <el-table-column label="数量" prop="num"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="追溯码" prop="trace"></el-table-column>
      <el-table-column label="商品分类" prop="className"></el-table-column>
      <el-table-column label="买方类型">
        <template v-slot="{ row: { buyerType } }">
          <el-tag type="primary" v-if="buyerType===0">个人</el-tag>
          <el-tag type="primary" v-if="buyerType===1">组织</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="二维码" effect="light">
            <el-button type="primary" circle @click="openQrCodeDialog(scope.row.trace)">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" class="icon">
                <path fill="#ffffff" d="M2 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m1 2v6h6V3z"/>
                <path fill="#ffffff" fill-rule="evenodd" d="M5 5h2v2H5z"/><path fill="#ffffff" d="M14 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m1 2v6h6V3z"/>
                <path fill="#ffffff" fill-rule="evenodd" d="M17 5h2v2h-2z"/><path fill="#ffffff" d="M2 13h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1m1 2v6h6v-6z"/>
                <path fill="#ffffff" fill-rule="evenodd" d="M5 17h2v2H5z"/><path fill="#ffffff" d="M23 19h-4v4h-5a1 1 0 0 1-1-1v-8v5h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h1a1 1 0 0 1 1 1zm0 2v1a1 1 0 0 1-1 1h-1v-2z"/>
              </svg>
            </el-button>
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

    <qr_code ref="code"></qr_code>

    <entry_advanced_search ref="info" @update:data="searchHandler"></entry_advanced_search>

    <add_entry_excel ref="excel" @success="uploadExcelSuccessHandler"></add_entry_excel>

  </page_container>
</template>

<style scoped lang="scss">
.icon{
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
