<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import router from "@/router/index.js";
import {Expand, Histogram} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {useRoute} from "vue-router";
import Info_pie from "@/view/echarts/monitor/InfoPie.vue";
import {getInfo, getInfoPieData} from "@/api/monitor/summary.js";

const loading = ref()
const switcher = ref("0")
const data = ref()
const total = ref()
const pie = ref()
const route = useRoute()
const query = ref({
  before: '',
  now: '',
  className: ''
})

const handlerSwitcher = (tab, event) => {
  switcher.value = tab.index
}

const requestData = () => {
  requestPie()
  requestTable()
}

const requestPie = () => {
  getInfoPieData(query.value).then(resp => {
    if (resp.code === 200) {
      pie.value = resp.data.data
    }
  })
}

const requestTable = () => {
  getInfo(query.value).then(resp => {
    if (resp.code === 200) {
      data.value = resp.data.data.data
      total.value = resp.data.data.total
      console.log(data.value)
    }
  })
}

onActivated(() => {
  query.value.before = route.query.before
  query.value.now = route.query.now
  query.value.className = route.query.className
  requestData()
})
</script>

<template>
  <page_container title="">

    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #content>
          <span class="text-large font-600 mr-3">环节类型数据明细</span>
        </template>
      </el-page-header>
    </el-row>

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
          <span>饼图</span>
        </template>
      </el-tab-pane>
    </el-tabs>

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
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div v-if="switcher==='1'">
      <info_pie :data="pie"></info_pie>
    </div>

  </page_container>
</template>

<style scoped lang="scss">

</style>
