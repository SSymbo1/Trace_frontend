<script setup>
import Page_container from "@/view/component/page_container.vue";
import {onActivated, ref} from "vue";
import bread from '@/json/monitor_bread_crumb.json'
import router from "@/router/index.js";
import {Edit, Expand, Histogram,Search} from "@element-plus/icons-vue";
import {getHistogramData, getSummaryData} from "@/api/monitor/summary.js";
import Summary_histogram from "@/view/echarts/monitor/summary_histogram.vue";

const tabBread = ref(bread.summary)
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
const histogram = ref()
const total = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestTable()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestTable()

}

const handlerSwitcher = (tab, event) => {
  switcher.value = tab.index
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

const requestData = () => {
  timePickerChanger()
  requestHistogram()
  requestTable()
}

const requestHistogram = () => {
  getHistogramData(query.value).then(resp => {
    if (resp.code === 200) {
      histogram.value = resp.data.data
    }
  })
}

const requestTable = () => {
  loading.value = true
  getSummaryData(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.data
      total.value = resp.data.iPage.totalData
      loading.value = false
    }
  })
}

const showInfo = (scope) => {
  router.push({
    path: '/monitor/manage/data',
    query: {
      time: scope
    }
  })
}

onActivated(() => {
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
          <span>图表</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div v-if="switcher==='1'" style="width: 100%;height: 500px">
      <summary_histogram :data="histogram"></summary_histogram>
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
        <el-table-column label="日期" prop="time"></el-table-column>
        <el-table-column label="数据采集数量" prop="dataNum"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" round @click="showInfo(scope.row.time)">
              查看明细
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
    </div>

  </page_container>
</template>

<style scoped lang="scss">

</style>
