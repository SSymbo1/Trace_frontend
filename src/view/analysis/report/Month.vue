<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import {ref} from "vue";
import bread from '@/json/analysis_bread_crumb.json'
import router from "@/router/index.js";
import {Search} from "@element-plus/icons-vue";
import {getTraceDataList} from "@/api/analysis/trace.js";

const tabBread = ref(bread.month)
const query = ref({
  pageSize: 5,
  total: 0,
  date: "",
  currentPage: 1,
  type: "TraceMonth"
})
const loading = ref(false)
const data = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  getTraceData()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  getTraceData()
}

const getTraceData = async () => {
  loading.value = true
  getTraceDataList(query.value).then(resp => {
    data.value = resp.data.trace.data
    query.value.total = resp.data.trace.total
    query.value.pageSize = resp.data.trace.size
    query.value.currentPage = resp.data.trace.current
    loading.value = false
  })
}

const reviewTraceReport = (scope) => {
  router.push({
    path: '/analysis/report/trace',
    query: {
      date: scope.date,
      name: scope.name,
      type: "MonthTrace"
    }
  })
}

onActivated(() => {
  getTraceData()
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

    <el-form
        inline
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="8">
          <el-form-item label="统计日期">
            <el-date-picker
                placeholder="请选择月份"
                v-model="query.date"
                type="month"
                format="YYYY-MM"
                value-format="YYYY-MM"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="getTraceData">搜索</el-button>
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
      <el-table-column label="报告期数" prop="date"></el-table-column>
      <el-table-column label="报告名称" prop="name"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button type="success" :icon="Search" round @click="reviewTraceReport(scope.row)">
            查看报告
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
