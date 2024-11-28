<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import router from "@/router/index.js";
import {onActivated, ref} from "vue";
import bread from '@/json/subject_bread_crumb.json'
import {Search} from "@element-plus/icons-vue";
import {getSupplierPaged} from "@/api/subject/supplier.js";
import Supplier_advanced_search from "@/view/subject/bulk/drawer/SupplierAdvancedSearch.vue";

const supplierBread = ref(bread.supplier)
const data = ref()
const loading = ref()
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  code: '',
  generate: 0,
  isTrace: 0
})
const search = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestSupplier()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestSupplier()
}

const openAdvancedSearchDrawer = (condition) => {
  search.value.openDrawer(condition)
}

const advancedSearchHandler = (condition) => {
  query.value = condition
  requestSupplier()
}

const requestSupplier = () => {
  loading.value = true
  getSupplierPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

onActivated(() => {
  requestSupplier()
})
</script>

<template>
  <page_container title="">

    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #breadcrumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="tab in supplierBread"
                :key="tab.index"
                :to="{ path:tab.path }">
              {{ tab.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <span class="text-large font-600 mr-3">{{ supplierBread[2].name }}</span>
        </template>
      </el-page-header>
    </el-row>

    <!-- 搜索及功能栏 -->
    <el-form
        inline
        @submit.native.prevent
        @keyup="requestSupplier">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="供应商名称">
              <template #append>
                <el-button :icon="Search" @click="requestSupplier"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" :icon="Search" @click="openAdvancedSearchDrawer(query)">高级搜索</el-button>
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
      <el-table-column label="供应商编号" prop="code"></el-table-column>
      <el-table-column label="供应商名称" prop="enterprise.name"></el-table-column>
      <el-table-column label="供应商负责人" prop="enterprise.legalPerson"></el-table-column>
      <el-table-column label="供应商电话" prop="enterprise.tel"></el-table-column>
      <el-table-column label="数据生成规则">
        <template v-slot="{ row: { generate } }">
          <el-tag type="success" v-if="generate===0">正常</el-tag>
          <el-tag type="danger" v-if="generate===1">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否追溯体系">
        <template v-slot="{ row: { isTrace } }">
          <el-tag type="danger" v-if="isTrace===0">否</el-tag>
          <el-tag type="success" v-if="isTrace===1">是</el-tag>
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

    <supplier_advanced_search ref="search" @update:data="advancedSearchHandler"></supplier_advanced_search>

  </page_container>
</template>

<style scoped lang="scss">

</style>
