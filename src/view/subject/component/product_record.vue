<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {Check, Close, Document, DocumentAdd, Edit, Picture, Plus, Search, Setting} from "@element-plus/icons-vue";
import {onActivated, ref} from "vue";
import {getProductRecordPaged, processApprove, processReject} from "@/api/subject/product.js";
import Product_info from "@/view/subject/product/drawer/product_info.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import Process_advanced_search from "@/view/subject/product/drawer/process_advanced_search.vue";
import Product_process from "@/view/subject/product/dialog/product_process.vue";

const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  enterprise: '',
  classification: '',
  isMajor: 0,
  importType: 0,
})
const data = ref()
const selection = ref([])
const loading = ref()
const info = ref()
const search = ref()
const process = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestData()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestData()
}

const openDataInfoDrawer = (data) => {
  info.value.openDrawer(data)
}

const openSearchDrawer = () => {
  search.value.openDrawer(query.value)
}

const openProcessBatchedDialog = () => {
  if (selection.value.length === 0) {
    ElMessage.warning('请选择需要审批的数据')
  }else {
    process.value.openDialog(selection.value)
  }
}

const handleSelectionChange = (select) => {
  selection.value = select.map((item) => item)
}

const processSuccessHandler = () => {
  query.value.currentPage = 1
  requestData()
}

const searchHandler = (value) => {
  query.value = value
  requestData()
}

const processApproved = async (pid) => {
  await ElMessageBox.confirm('您确定要将该商品纳入产品目录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  let process = {pid: pid}
  processApprove(process).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      requestData()
    } else {
      ElMessage.error(resp.message)
    }
  })
}

const processRejected = async (pid) => {
  await ElMessageBox.confirm('您确定要拒绝将该商品纳入产品目录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  let process = {pid: pid}
  processReject(process).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      requestData()
    } else {
      ElMessage.error(resp.message)
    }
  })
}

const requestData = async () => {
  loading.value = true
  getProductRecordPaged(query.value).then(resp => {
    if (resp.code === 200) {
      query.value.total = resp.data.iPage.total
      query.value.pageSize = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

onActivated(() => {
  requestData()
})
</script>

<template>
  <page_container title="">

    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #content>
          <span class="text-large font-600 mr-3">批量纳入产品目录</span>
        </template>
      </el-page-header>
    </el-row>

    <!-- 搜索及功能栏 -->
    <el-form
        inline
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="query.name" clearable placeholder="商品名称">
              <template #append>
                <el-button :icon="Search"/>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-button type="success" :icon="Search" @click="openSearchDrawer">高级搜索</el-button>
          <el-button type="success" :icon="Document" @click="openProcessBatchedDialog">批量审核</el-button>
        </el-col>
      </el-row>
    </el-form>

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
    <el-divider/>

    <!--  数据展示  -->
    <el-table
        v-loading="loading"
        :data="data"
        @selection-change="handleSelectionChange"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column type="selection" width="55px" fixed="left"/>
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="图片">
        <template v-slot="{ row: { photo } }">
          <el-image :src="photo"/>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"/>
      <el-table-column label="商品编码" prop="code"/>
      <el-table-column label="重要产品">
        <template v-slot="{ row: { isMajor } }">
          <el-tag type="danger" v-if="isMajor===0">否</el-tag>
          <el-tag type="success" v-if="isMajor===1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品类别">
        <template v-slot="{ row: { className } }">
          <el-tag type="primary">{{ className }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备案企业" prop="enterpriseName"/>
      <el-table-column label="审批状态">
        <template v-slot="{ row: { productRecord} }">
          <el-tag type="warning" v-if="productRecord.statue===0">等待审批</el-tag>
          <el-tag type="success" v-if="productRecord.statue===1">通过</el-tag>
          <el-tag type="danger" v-if="productRecord.statue===2">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="录入日期" prop="productRecord.insertTime"/>
      <el-table-column label="审批日期" prop="productRecord.processTime"/>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="通过" effect="light">
            <el-button type="success" :icon="Check" circle @click="processApproved(scope.row.pid)"/>
          </el-tooltip>
          <el-tooltip content="不通过" effect="light">
            <el-button type="danger" :icon="Close" circle @click="processRejected(scope.row.pid)"/>
          </el-tooltip>
          <el-tooltip content="详细信息" effect="light">
            <el-button type="warning" :icon="Document" circle @click="openDataInfoDrawer(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>

    <product_info ref="info"></product_info>

    <product_process ref="process" @success="processSuccessHandler"></product_process>

    <process_advanced_search ref="search" @update:data="searchHandler"></process_advanced_search>

  </page_container>
</template>

<style scoped lang="scss">

</style>
