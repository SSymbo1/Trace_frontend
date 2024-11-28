<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import bread from '@/json/analysis_bread_crumb.json'
import {ref} from "vue";
import router from "@/router/index.js";
import {DocumentAdd, Edit, Search} from "@element-plus/icons-vue";
import {generateStructReport, getStructData} from "@/api/analysis/struct.js";
import {ElNotification} from "element-plus";

const tabBread = ref(bread.struct)
const data = ref({
  report: [],
  industry: {
    total: 0,
    product: [],
    plant: [],
    animal: [],
    market: [],
    batch: [],
    butch: [],
    farm: []
  }
})
const query = ref({
  date: '',
  type: 'StructDay',
})

const searchData = async () => {
  getStructData(query.value).then(resp => {
    if (resp.code === 200) {
      data.value = resp.data.struct
    }
  })
}

const viewStructReport = (scope) => {
  let type = ""
  if (scope.range.includes("日")) {
    type = "DayStruct"
  } else if (scope.range.includes("月")) {
    type = "MonthStruct"
  } else if (scope.range.includes("年")) {
    type = "YearStruct"
  }
  router.push({
    path: '/analysis/report/struct',
    query: {
      date: scope.date,
      type: type
    }
  })
}

const createStructReport = async () => {
  if (query.value.date === "") {
    ElNotification.error({
      title: '错误',
      message: "请选择生成报告得日期",
      offset: 48
    })
  } else {
    let type = ""
    if (query.value.type.includes("StructDay")) {
      type = "DayStruct"
    } else if (query.value.type.includes("StructMonth")) {
      type = "MonthStruct"
    } else if (query.value.type.includes("StructYear")) {
      type = "YearStruct"
    }
    let search = {
      date: query.value.date,
      report: "StructReport",
      type: type
    }
    generateStructReport(search).then(resp => {
      if (resp.code === 200) {
        ElNotification.success({
          title: '成功',
          message: resp.message,
          offset: 48
        })
      }
      searchData()
    })
  }
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
        <el-col :span="11">
          <el-form-item label="日期" v-if="query.type === 'StructDay'">
            <el-date-picker type="date" v-model="query.date" value-format="YYYY-MM-DD"></el-date-picker>
          </el-form-item>
          <el-form-item label="月份" v-if="query.type === 'StructMonth'">
            <el-date-picker type="month" v-model="query.date" value-format="YYYY-MM"></el-date-picker>
          </el-form-item>
          <el-form-item label="年份" v-if="query.type === 'StructYear'">
            <el-date-picker type="year" v-model="query.date" value-format="YYYY"></el-date-picker>
          </el-form-item>
          <el-form-item label="查询类别">
            <el-select style="width: 150px" v-model="query.type" @change="query.date = ''">
              <el-option label="年" value="StructYear"></el-option>
              <el-option label="月" value="StructMonth"></el-option>
              <el-option label="日" value="StructDay"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" :icon="Search" @click="searchData">搜索</el-button>
          <el-button type="primary" :icon="Edit" @click="router.push('/analysis/industry/important')">配置重点行业
          </el-button>
          <el-button type="primary" :icon="DocumentAdd" @click="createStructReport">生成分析报告</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <div class="market">
      <div>类型代码：1</div>
      <div>环节名称：种植企业</div>
      <el-table
          :data="data.industry.plant"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="plant">
      <div>类型代码：2</div>
      <div>环节名称：养殖企业</div>
      <el-table
          :data="data.industry.animal"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="farm">
      <div>类型代码：3</div>
      <div>环节名称：生产加工</div>
      <el-table
          :data="data.industry.product"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="animal">
      <div>类型代码：4</div>
      <div>环节名称：屠宰企业</div>
      <el-table
          :data="data.industry.butch"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="batch">
      <div>类型代码：5</div>
      <div>环节名称：批发市场</div>
      <el-table
          :data="data.industry.batch"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="butch">
      <div>类型代码：6</div>
      <div>环节名称：农贸市场</div>
      <el-table
          :data="data.industry.farm"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="product">
      <div>类型代码：7</div>
      <div>环节名称：连锁超市</div>
      <el-table
          :data="data.industry.market"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="数据量" prop="total"></el-table-column>
        <el-table-column label="占比" prop="rate"></el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div style="margin-top: 20px">
      <el-table
          :data="data.report"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="创建时间" prop="date"></el-table-column>
        <el-table-column label="统计周期" prop="range"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="查看" effect="light">
              <el-button type="primary" :icon="Search" circle @click="viewStructReport(scope.row)"/>
            </el-tooltip>
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
.market,
.farm,
.plant,
.animal,
.batch,
.butch,
.product {
  margin-top: 20px
}
</style>
