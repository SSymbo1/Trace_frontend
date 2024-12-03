<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import bread from '@/json/analysis_bread_crumb.json'
import {ref} from "vue";
import router from "@/router/index.js";
import {Download, Search} from "@element-plus/icons-vue";
import {html_pdf} from "@/utils/html_pdf.js";
import Product_class_total from "@/view/echarts/analysis/industry/ProductClassTotal.vue";
import Enterprise_rank from "@/view/echarts/analysis/industry/EnterpriseRank.vue";
import {getProcessData} from "@/api/analysis/process.js";

const tabBread = ref(bread.process)
const time = ref([])
const query = ref({
  before: '',
  now: '',
  type: 'ProcessDay',
})
const data = ref({
  entranceFresh: 0,
  entranceProduct: 0,
  entranceDrink: 0,
  entranceFood: 0,
  entranceClassList: [],
  rankList: []
})
const timePickerChanger = () => {
  if (time.value === null || time.value.length === 0) {
    query.value.before = null
    query.value.now = null
  } else {
    query.value.before = time.value[0]
    query.value.now = time.value[1]
  }
}

const searchData = async () => {
  getProcessData(query.value).then(resp => {
    if (resp.code === 200) {
      data.value = resp.data.process
    }
  }).catch(err => {
  })
}

const downloadPDF = () => {
  let fileDOM = document.getElementsByClassName("analysis")
  html_pdf(
      query.value.before + "至" + query.value.now + "加工数据分析",
      document.querySelector(".analysis"),
      fileDOM
  )
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
        <el-col :span="18">
          <el-form-item label="统计日期" v-if="query.type === 'ProcessDay'">
            <el-date-picker
                @change="timePickerChanger"
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="开始月份" v-if="query.type === 'ProcessMonth'">
            <el-date-picker type="month" v-model="query.before" value-format="YYYY-MM-1"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束月份" v-if="query.type === 'ProcessMonth'">
            <el-date-picker type="month" v-model="query.now" value-format="YYYY-MM-30"></el-date-picker>
          </el-form-item>
          <el-form-item label="查询类别">
            <el-select style="width: 150px" v-model="query.type">
              <el-option label="月" value="ProcessMonth"></el-option>
              <el-option label="日" value="ProcessDay"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="searchData">搜索</el-button>
          <el-button type="primary" :icon="Download" @click="downloadPDF">下载</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <div class="analysis">
      <div class="classifier" align="center">
        <div class="text_show_container" align="center">
          <el-text style="color: white">产品品类总产能</el-text>
        </div>
        <div style="width: 700px;height: 50px;border: 1px solid;line-height: 50px;margin-top: 15px" align="center">
          <el-text>产品类别出场统计</el-text>
          <el-text style="margin-left: 10px">生鲜食品</el-text>
          <el-text type="primary">{{ data.entranceFresh }}</el-text>
          <el-text>条数据</el-text>
          <el-text style="margin-left: 10px">加工食品</el-text>
          <el-text type="primary">{{ data.entranceProduct }}</el-text>
          <el-text>条数据</el-text>
          <el-text style="margin-left: 10px">饮料与酒水</el-text>
          <el-text type="primary">{{ data.entranceDrink }}</el-text>
          <el-text>条数据</el-text>
          <el-text style="margin-left: 10px">食品杂货</el-text>
          <el-text type="primary">{{ data.entranceFood }}</el-text>
          <el-text>条数据</el-text>
        </div>
        <el-table
            :data="data.entranceClassList"
            style="min-width: 100%; margin-top: 10px"
            :row-style="{ height: '50px' }"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            table-layout="fixed">
          <el-table-column label="序号" type="index" width="60px"></el-table-column>
          <el-table-column label="日期" prop="date"></el-table-column>
          <el-table-column label="生鲜食品" prop="fresh"></el-table-column>
          <el-table-column label="加工食品" prop="product"></el-table-column>
          <el-table-column label="饮料与酒水" prop="drink"></el-table-column>
          <el-table-column label="食品杂货" prop="food"></el-table-column>
          <template #empty>
            <el-empty description="空空如也"/>
          </template>
        </el-table>
        <product_class_total :data="data.entranceClassList"></product_class_total>
      </div>

      <el-divider/>

      <div class="sell" align="center">
        <div class="text_show_container" align="center">
          <el-text style="color: white">销售数据分析</el-text>
        </div>
        <div style="width: 700px;height: 50px;border: 1px solid;line-height: 50px;margin-top: 15px" align="center">
          <el-text>供销数据量企业排名</el-text>
        </div>
        <div style="margin-top: 20px" class="data_collect">
          <div style="display: grid;grid-template-columns: 1fr 1fr;">
            <enterprise_rank :data="data.rankList"></enterprise_rank>
            <el-table
                :data="data.rankList"
                style="min-width: 100%; margin-top: 10px"
                :row-style="{ height: '50px' }"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
                table-layout="fixed">
              <el-table-column label="排名" type="index" width="60px"></el-table-column>
              <el-table-column label="企业名称" prop="name"></el-table-column>
              <el-table-column label="数据量" prop="total"></el-table-column>
              <template #empty>
                <el-empty description="空空如也"/>
              </template>
            </el-table>
          </div>
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
