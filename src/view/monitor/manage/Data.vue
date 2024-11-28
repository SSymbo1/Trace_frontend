<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import {onActivated, ref} from "vue";
import bread from '@/json/monitor_bread_crumb.json'
import router from "@/router/index.js";
import {Edit, Expand, Histogram, Search} from "@element-plus/icons-vue";
import Data_histogram from "@/view/echarts/monitor/DataHistogram.vue";
import {getDataMonitorHistogramData, getDataMonitorPieData, getDataMonitorTableData} from "@/api/monitor/summary.js";
import Data_pie from "@/view/echarts/monitor/DataPie.vue";
import {useRoute} from "vue-router";

const tabBread = ref(bread.data)
const time = ref([])
const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  before: null,
  now: null
})
const loading = ref()
const switcher = ref("0")
const data = ref()
const total = ref()
const pie = ref()
const histogram = ref()
const route = useRoute()

const handlerSwitcher = (tab, event) => {
  switcher.value = tab.index
}

const requestData = () => {
  timePickerChanger()
  requestTable()
  requestHistogram()
  requestPie()
}

const timePickerChanger = () => {
  if (time.value === null || time.value.length === 0) {
    query.value.before = null
    query.value.now = null
  } else {
    query.value.before = time.value[0]
    query.value.now = time.value[1]
  }
}

const requestPie = () => {
  getDataMonitorPieData(query.value).then(resp => {
    if (resp.code === 200) {
      pie.value = resp.data
    }
  })
}

const requestHistogram = () => {
  getDataMonitorHistogramData(query.value).then(resp => {
    if (resp.code === 200) {
      histogram.value = resp.data.histogram
    }
  })
}

const requestTable = () => {
  getDataMonitorTableData(query.value).then(resp => {
    if (resp.code === 200) {
      total.value = resp.data.data.total
      data.value = resp.data.data.data
    }
  })
}

const showInfo = (row) => {
  router.push({
    path: '/monitor/manage/info',
    query: {
      before: query.value.before,
      now: query.value.now,
      className: row.name
    }
  })
}

onActivated(() => {
  time.value[0] = route.query.time
  time.value[1] = route.query.time
  switcher.value = "0"
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
        @submit.native.prevent>
      <el-row>
        <el-col :span="20">
          <el-form-item>
            <el-date-picker
                @change="timePickerChanger"
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
            <el-button type="primary" :icon="Search" style="margin-left: 25px" @click="requestData">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-tabs type="card" class="demo-tabs" v-model="switcher" @tab-click="handlerSwitcher">
      <el-tab-pane name="0">
        <template #label>
          <el-icon>
            <Expand/>
          </el-icon>
          <span>表格</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="1">
        <template #label>
          <el-icon>
            <Histogram/>
          </el-icon>
          <span>柱状图</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="2">
        <template #label>
          <el-icon>
            <Histogram/>
          </el-icon>
          <span>饼图</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div v-if="switcher==='1'">
      <data_histogram :data="histogram"></data_histogram>
    </div>

    <div v-if="switcher==='2'">
      <data_pie :data="pie"></data_pie>
    </div>

    <div v-if="switcher==='0'">
      <el-text>数据总条数：{{ total }}</el-text>
      <el-table
          v-loading="loading"
          :data="data"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="环节" prop="name"></el-table-column>
        <el-table-column label="数据采集量" prop="value"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" round @click="showInfo(scope.row)">
              查看明细
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>


  </page_container>
</template>

<style scoped lang="scss">

</style>
