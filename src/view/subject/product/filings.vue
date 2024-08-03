<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {onActivated, ref} from "vue";
import bread from '@/json/subject_bread_crumb.json'
import {Document, Picture, DocumentAdd, Edit, Plus, Search} from "@element-plus/icons-vue";
import Add_product_excel from "@/view/subject/product/dialog/add_product_excel.vue";
import Record_advanced_search from "@/view/subject/product/drawer/record_advanced_search.vue";
import {getProductPaged} from "@/api/subject/product.js";
import Edit_product_photo from "@/view/subject/product/dialog/edit_product_photo.vue";
import Product_info from "@/view/subject/product/drawer/product_info.vue";
import Edit_product from "@/view/subject/product/drawer/edit_product.vue";

const filingsBread = ref(bread.filings)
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  enterprise: '',
  classification: '',
  isMajor: 0,
  importType: 0,
  statue: 0
})
const data = ref()
const loading = ref()
const excel = ref()
const search = ref()
const photo = ref()
const info = ref()
const edit = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestData()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestData()
}

const openDataInfoDrawer = (data) => {
  info.value.openDrawer(data)
}

const openUploadSuccessDialog = () => {
  excel.value.openDialog()
}

const openEditPhotoDialog = (id) => {
  photo.value.openDialog(id)
}

const openSearchDrawer = () => {
  search.value.openDrawer(query.value)
}

const openEditProductDrawer = (data) => {
  edit.value.openDrawer(data)
}

const editProductSuccessHandler = () => {
  query.value.currentPage = 1
  requestData()
}

const editPhotoSuccessHandler = () => {
  query.value.currentPage = 1
  requestData()
}

const uploadExcelHandler = () => {
  query.value.currentPage = 1
  requestData()
}

const searchHandler = (value) => {
  query.value = value
  requestData()
}

const requestData = async () => {
  loading.value = true
  getProductPaged(query.value).then(resp => {
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
                v-for="tab in filingsBread"
                :key="tab.index"
                :to="{ path:tab.path }">
              {{ tab.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <span class="text-large font-600 mr-3">{{ filingsBread[2].name }}</span>
        </template>
      </el-page-header>
    </el-row>

    <!-- 搜索及功能栏 -->
    <el-form
        inline
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="商品名称">
              <template #append>
                <el-button :icon="Search"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-button type="success" :icon="Search" @click="openSearchDrawer">高级搜索</el-button>
          <el-button type="primary" :icon="Plus" @click="router.push('/subject/product/add')">添加产品</el-button>
          <el-button type="primary" :icon="DocumentAdd" @click="openUploadSuccessDialog">按表格导入</el-button>
          <el-button type="success" :icon="Document" @click="router.push('/subject/product/process')">批量纳入产品目录
          </el-button>
        </el-col>
      </el-row>
    </el-form>

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
    <el-divider/>

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
      <el-table-column label="图片">
        <template v-slot="{ row: { photo } }">
          <el-image :src="photo"/>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"/>
      <el-table-column label="商品编码" prop="code"/>
      <el-table-column label="重要产品">
        <template v-slot="{ row: { isMajor } }">
          <el-tag type="danger" v-if="isMajor===0">否</el-tag>
          <el-tag type="success" v-if="isMajor===1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品类别">
        <template v-slot="{ row: { className } }">
          <el-tag type="primary">{{ className }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备案企业" prop="enterpriseName"/>
      <el-table-column label="审批状态">
        <template v-slot="{ row: { productRecord} }">
          <el-tag type="warning" v-if="productRecord.statue===0">等待审批</el-tag>
          <el-tag type="success" v-if="productRecord.statue===1">通过</el-tag>
          <el-tag type="danger" v-if="productRecord.statue===2">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="录入日期" prop="productRecord.insertTime"/>
      <el-table-column label="审批日期" prop="productRecord.processTime"/>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="编辑" effect="light">
            <el-button type="primary" :icon="Edit" circle @click="openEditProductDrawer(scope.row.pid)"/>
          </el-tooltip>
          <el-tooltip content="修改产品图片" effect="light">
            <el-button type="success" :icon="Picture" circle @click="openEditPhotoDialog(scope.row.pid)"/>
          </el-tooltip>
          <el-tooltip content="详细信息" effect="light">
            <el-button type="warning" :icon="Document" circle @click="openDataInfoDrawer(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>

    <product_info ref="info"></product_info>

    <edit_product ref="edit" @success="editProductSuccessHandler"></edit_product>

    <edit_product_photo ref="photo" @success="editPhotoSuccessHandler"></edit_product_photo>

    <add_product_excel ref="excel" @success="uploadExcelHandler"></add_product_excel>

    <record_advanced_search ref="search" @update:data="searchHandler"></record_advanced_search>

  </page_container>
</template>

<style scoped lang="scss">

</style>
