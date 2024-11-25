<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import {ref} from "vue";
import bread from "@/json/analysis_bread_crumb.json";
import router from "@/router/index.js";
import {Delete, Download, Edit} from "@element-plus/icons-vue";
import {html_pdf} from "@/utils/html_pdf.js";
import {useRoute} from "vue-router";
import {getStructReportData} from "@/api/analysis/struct.js";
import Struct_total from "@/view/echarts/analysis/StructTotal.vue";
import Struct_focus from "@/view/echarts/analysis/StructFocus.vue";
import Struct_rate from "@/view/echarts/analysis/StructRate.vue";
import Struct_ratio from "@/view/echarts/analysis/StructRatio.vue";

const tabBread = ref(bread.structReport)
const route = useRoute()
const date = ref("")
const type = ref("")
const data = ref({})

const requestReportData = async () => {
  let query = {
    date: date.value,
    report: "StructReport",
    type: type.value
  }
  getStructReportData(query).then(resp => {
    if (resp.code === 200) {
      data.value = resp.data.report
    }
  })
}

const downloadPDF = () => {
  let fileDOM = document.getElementsByClassName("struct")
  html_pdf(
      date.value + "行业结构报告",
      document.querySelector(".struct"),
      fileDOM
  )
}

onActivated(() => {
  date.value = route.query.date
  type.value = route.query.type
  requestReportData()
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

    <div>
      <el-row>
        <el-col :span="5">
          <el-button type="primary" :icon="Download" @click="downloadPDF">报告下载</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </div>

    <div class="struct">

      <h3 align="center">{{ date }} 行业结构报告</h3>

      <div class="industry" style="margin-top: 10px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">行业结构分析</el-text>
        </div>
        <div style="display: grid;grid-template-columns: 1fr 1fr;">
          <el-table
              :data="data.countData"
              style="min-width: 100%; margin-top: 20px"
              :row-style="{ height: '50px' }"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              table-layout="fixed">
            <el-table-column label="序号" type="index" width="60px"></el-table-column>
            <el-table-column label="企业名称" prop="name"></el-table-column>
            <el-table-column label="普通企业数量" prop="normal"></el-table-column>
            <el-table-column label="重点关注企业数量" prop="focus"></el-table-column>
            <template #empty>
              <el-empty description="空空如也"/>
            </template>
          </el-table>
          <struct_total :data="data.countData" style="height: 410px"></struct_total>
        </div>
      </div>


      <div class="focus" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">重点关注企业数据</el-text>
        </div>
        <div style="display: grid;grid-template-columns: 1fr 1fr;">
          <struct_focus :data="data.focusData" style="height: 410px"></struct_focus>
          <el-table
              :data="data.focusData"
              style="min-width: 100%; margin-top: 20px"
              :row-style="{ height: '50px' }"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              table-layout="fixed">
            <el-table-column label="序号" type="index" width="60px"></el-table-column>
            <el-table-column label="企业名称" prop="name"></el-table-column>
            <el-table-column label="本轮数据" prop="total"></el-table-column>
            <el-table-column label="同比" prop="yoy"></el-table-column>
            <el-table-column label="环比" prop="qoq"></el-table-column>
            <template #empty>
              <el-empty description="空空如也"/>
            </template>
          </el-table>
        </div>
      </div>

      <div class="rate" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">重点企业同行业占有率</el-text>
        </div>
        <div style="display: grid;grid-template-columns: 1fr 1fr;">
          <el-table
              :data="data.focusRate"
              style="min-width: 100%; margin-top: 20px"
              :row-style="{ height: '50px' }"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              table-layout="fixed">
            <el-table-column label="序号" type="index" width="60px"></el-table-column>
            <el-table-column label="企业名称" prop="name"></el-table-column>
            <el-table-column label="类型编号" prop="type"></el-table-column>
            <el-table-column label="占有率" prop="total"></el-table-column>
            <template #empty>
              <el-empty description="空空如也"/>
            </template>
          </el-table>
          <struct_rate :data="data.focusRate" style="height: 410px"></struct_rate>
        </div>
      </div>

      <div class="ratio" style="margin-top: 20px">
        <div class="text_show_container" align="center">
          <el-text style="color: white">重点企业占有率</el-text>
        </div>
        <div style="display: grid;grid-template-columns: 1fr 1fr;">
          <struct_ratio :data="data.focusRatio" style="height: 410px"></struct_ratio>
          <el-table
              :data="data.focusRatio"
              style="min-width: 100%; margin-top: 20px"
              :row-style="{ height: '50px' }"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              table-layout="fixed">
            <el-table-column label="序号" type="index" width="60px"></el-table-column>
            <el-table-column label="企业名称" prop="name"></el-table-column>
            <el-table-column label="类型编号" prop="type"></el-table-column>
            <el-table-column label="占有率" prop="total"></el-table-column>
            <template #empty>
              <el-empty description="空空如也"/>
            </template>
          </el-table>
        </div>
      </div>

    </div>

  </page_container>
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
