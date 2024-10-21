<script setup>
import Page_container from "@/view/component/page_container.vue";
import {ref} from "vue";
import bread from '@/json/analysis_bread_crumb.json'
import router from "@/router/index.js";
import {Plus, Search} from "@element-plus/icons-vue";
import {getOperationsData} from "@/api/analysis/market.js";

const tabBread = ref(bread.operations)
const query = ref({
  type: 'year',
  tag: '',
  startYear: '',
  endYear: '',
  year: ''
})
const loading = ref(false)
const tableData = ref({
  originData: [],
  qoqData: [],
  yoyData: [],
})

const searchMarket = async () => {
  console.log(query.value)
  loading.value = true
  getOperationsData(query.value).then(resp => {
    if (resp.code === 200) {
      tableData.value.originData = resp.data.operations.originData
      tableData.value.qoqData = resp.data.operations.qoqdata
      tableData.value.yoyData = resp.data.operations.yoydata
      console.log(tableData.value)
      loading.value = false
    }
  })
}

onActivated(() => {
  loading.value = false
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
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="4">
          <el-form-item label="查询类型">
            <el-select clearable v-model="query.type" style="width: 100px;">
              <el-option label="年" value="year"></el-option>
              <el-option label="月" value="month"></el-option>
              <el-option label="季" value="quarter"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="开始年份" v-if="query.type === 'year'">
            <el-date-picker type="year" v-model="query.startYear" value-format="YYYY-1-1"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束年份" v-if="query.type === 'year'">
            <el-date-picker type="year" v-model="query.endYear" value-format="YYYY-12-31"></el-date-picker>
          </el-form-item>
          <el-form-item label="对应年份" v-if='query.type !=="year"'>
            <el-date-picker type="year" v-model="query.year" value-format="YYYY"></el-date-picker>
          </el-form-item>
          <el-form-item label="标志" v-if="query.type !=='year'">
            <el-select clearable v-model="query.tag" style="width: 100px;">
              <el-option label="进场" value="enter"></el-option>
              <el-option label="出场" value="outer"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="searchMarket">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <el-table
        :data="tableData.originData"
        v-loading="loading"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="日期" prop="time"></el-table-column>
      <el-table-column label="种植企业" prop="plant"></el-table-column>
      <el-table-column label="养殖企业" prop="animal"></el-table-column>
      <el-table-column label="生产加工" prop="product"></el-table-column>
      <el-table-column label="屠宰企业" prop="butch"></el-table-column>
      <el-table-column label="批发市场" prop="batch"></el-table-column>
      <el-table-column label="农贸市场" prop="farm"></el-table-column>
      <el-table-column label="连锁超市" prop="shop"></el-table-column>
      <el-table-column label="团体单位" prop="unit"></el-table-column>
      <el-table-column label="" prop="name"></el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>
    <div align="center" style="margin-top: 10px">
      <el-tag type="primary" size="large">同比</el-tag>
    </div>
    <el-table
        :data="tableData.yoyData"
        v-loading="loading"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="日期" prop="time"></el-table-column>
      <el-table-column label="种植企业" prop="plant"></el-table-column>
      <el-table-column label="养殖企业" prop="animal"></el-table-column>
      <el-table-column label="生产加工" prop="product"></el-table-column>
      <el-table-column label="屠宰企业" prop="butch"></el-table-column>
      <el-table-column label="批发市场" prop="batch"></el-table-column>
      <el-table-column label="农贸市场" prop="farm"></el-table-column>
      <el-table-column label="连锁超市" prop="shop"></el-table-column>
      <el-table-column label="团体单位" prop="unit"></el-table-column>
      <el-table-column label="" prop="name"></el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>
    <div align="center" style="margin-top: 10px">
      <el-tag type="primary" size="large">环比</el-tag>
    </div>
    <el-table
        :data="tableData.qoqData"
        v-loading="loading"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="日期" prop="time"></el-table-column>
      <el-table-column label="种植企业" prop="plant"></el-table-column>
      <el-table-column label="养殖企业" prop="animal"></el-table-column>
      <el-table-column label="生产加工" prop="product"></el-table-column>
      <el-table-column label="屠宰企业" prop="butch"></el-table-column>
      <el-table-column label="批发市场" prop="batch"></el-table-column>
      <el-table-column label="农贸市场" prop="farm"></el-table-column>
      <el-table-column label="连锁超市" prop="shop"></el-table-column>
      <el-table-column label="团体单位" prop="unit"></el-table-column>
      <el-table-column label="" prop="name"></el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>

  </page_container>
</template>

<style scoped lang="scss">

</style>
