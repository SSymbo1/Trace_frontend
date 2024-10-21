<script setup>
import Page_container from "@/view/component/page_container.vue";
import {ref} from "vue";
import bread from '@/json/analysis_bread_crumb.json'
import router from "@/router/index.js";
import {Search} from "@element-plus/icons-vue";

const tabBread =ref(bread.quarter)
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  range: ""
})
const loading = ref(false)
const data = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
}

// 分页器：页面切换
const onCurrentChange = (value) => {
}
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

    <el-form
        inline
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="8">
          <el-form-item label="统计日期">
            <el-date-picker
                v-model="query.date"
                type="years"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="">搜索</el-button>
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
      <el-table-column label="报告期数" prop="name"></el-table-column>
      <el-table-column label="开始日期" prop="value"></el-table-column>
      <el-table-column label="结束日期" prop="value"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button type="success" :icon="Search" round @click="showInfo(scope.row)">
            查看分析报告
          </el-button>
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

  </page_container>
</template>

<style scoped lang="scss">

</style>
