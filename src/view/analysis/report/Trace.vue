<script setup>
import {ref} from "vue";
import bread from "@/json/analysis_bread_crumb.json";
import {useRoute} from "vue-router";
import PageContainer from "@/view/component/PageContainer.vue";
import router from "@/router/index.js";
import {Download} from "@element-plus/icons-vue";
import {html_pdf} from "@/utils/html_pdf.js";
import {getTraceReportData} from "@/api/analysis/trace.js";
import TraceMap from "@/view/echarts/analysis/trace/TraceMap.vue";
import Line from "@/view/echarts/analysis/trace/Line.vue";
import Pie from "@/view/echarts/analysis/trace/Pie.vue";
import Enterprise from "@/view/echarts/analysis/trace/Enterprise.vue";

const tabBread = ref(bread.traceReport)
const route = useRoute()
const name = ref("")
const date = ref("")
const type = ref("")
const data = ref({
  "area": [],
  "enterprise": [],
  "entrance": [],
  "approach": []
})
const getTracReport = async () => {
  let query = {
    date: date.value,
    report: "TraceReport",
    type: type.value
  }
  getTraceReportData(query).then(resp => {
    if (resp.code === 200) {
      data.value.area = resp.data.trace.area
      data.value.enterprise = resp.data.trace.enterprise
      data.value.entrance = resp.data.trace.entrance
      data.value.approach = resp.data.trace.approach
    }
  })
}

const downloadPDF = () => {
  let fileDOM = document.getElementsByClassName("trace")
  html_pdf(
      name.value + "溯源报告",
      document.querySelector(".trace"),
      fileDOM
  )
}

onActivated(() => {
  name.value = route.query.name
  date.value = route.query.date
  type.value = route.query.type
  getTracReport()
})
</script>

<template>
  <page-container title="">
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

    <div>
      <el-row>
        <el-col :span="5">
          <el-button type="primary" :icon="Download" @click="downloadPDF">报告下载</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </div>

    <div class="trace">

      <h3 align="center">{{ name }}</h3>

      <div class="approach" style="margin-top: 10px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">进场数据分析</el-text>
        </div>
        <el-table
            :data="data.approach"
            style="min-width: 100%; margin-top: 10px"
            :row-style="{ height: '50px' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            table-layout="fixed">
          <el-table-column label="序号" type="index" width="60px"></el-table-column>
          <el-table-column label="企业类型" prop="name"></el-table-column>
          <el-table-column label="数据量" prop="total"></el-table-column>
          <el-table-column label="环比增长" prop="qoq"></el-table-column>
          <el-table-column label="同比增长" prop="yoy"></el-table-column>
          <el-table-column label="热门企业" prop="popular"></el-table-column>
          <template #empty>
            <el-empty description="空空如也"/>
          </template>
        </el-table>
        <div style="display: grid;grid-template-columns: 1fr 1fr;margin-top: 30px">
          <Line :data="data.approach"></Line>
          <Pie :data="data.approach"></Pie>
        </div>
      </div>

      <div class="entrance" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">出场数据分析</el-text>
        </div>
        <el-table
            :data="data.entrance"
            style="min-width: 100%; margin-top: 10px"
            :row-style="{ height: '50px' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            table-layout="fixed">
          <el-table-column label="序号" type="index" width="60px"></el-table-column>
          <el-table-column label="企业类型" prop="name"></el-table-column>
          <el-table-column label="数据量" prop="total"></el-table-column>
          <el-table-column label="环比增长" prop="qoq"></el-table-column>
          <el-table-column label="同比增长" prop="yoy"></el-table-column>
          <el-table-column label="热门企业" prop="popular"></el-table-column>
          <template #empty>
            <el-empty description="空空如也"/>
          </template>
        </el-table>
        <div style="display: grid;grid-template-columns: 1fr 1fr;margin-top: 30px">
          <Line :data="data.entrance"></Line>
          <Pie :data="data.entrance"></Pie>
        </div>
      </div>

      <div class="area" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">产地分析</el-text>
        </div>
        <el-table
            :data="data.area"
            style="min-width: 100%; margin-top: 10px"
            :row-style="{ height: '50px' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            table-layout="fixed">
          <el-table-column label="序号" type="index" width="60px"></el-table-column>
          <el-table-column label="地区" prop="name"></el-table-column>
          <el-table-column label="数据量" prop="total"></el-table-column>
          <template #empty>
            <el-empty description="空空如也"/>
          </template>
        </el-table>
        <TraceMap :data="data.area"></TraceMap>
      </div>

      <div class="enterprise" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">重点企业数据分析</el-text>
        </div>
        <el-table
            :data="data.enterprise"
            style="min-width: 100%; margin-top: 10px"
            :row-style="{ height: '50px' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            table-layout="fixed">
          <el-table-column label="序号" type="index" width="60px"></el-table-column>
          <el-table-column label="企业名称" prop="name"></el-table-column>
          <el-table-column label="类别编码" prop="type"></el-table-column>
          <el-table-column label="数据量" prop="total"></el-table-column>
          <el-table-column label="同比增长" prop="yoy"></el-table-column>
          <el-table-column label="环比增长" prop="qoq"></el-table-column>
          <template #empty>
            <el-empty description="空空如也"/>
          </template>
        </el-table>
        <div style="margin-top: 30px">
          <Enterprise :data="data.enterprise"></Enterprise>
        </div>
      </div>
    </div>

  </page-container>
</template>

<style scoped lang="scss">
.text_show_container {
  font-weight: bold;
  margin: 0 auto;
  background-color: #409EFF;
  width: 180px;
  height: 30px;
  line-height: 27px;
}
</style>
