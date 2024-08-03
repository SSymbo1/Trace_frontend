<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {Document, DocumentAdd, Edit, Plus, Search, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";

const query = ref({
  pageSize: 5,
  total: 0,
  currentPage: 1,
  name: '',
  code: '',
  generate: 0,
  isTrace: 0
})

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
}

// 分页器：页面切换
const onCurrentChange = (value) => {
}

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
          <el-button type="success" :icon="Search">高级搜索</el-button>
          <el-button type="success" :icon="Document">批量审核</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

    <!--  数据展示  -->
    <el-table
        v-loading="loading"
        :data="data"
        style="min-width: 100%; margin-top: 10px"
        :row-style="{ height: '50px' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        table-layout="fixed">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="图片">
        <template v-slot="{ row: { photo } }">
          <el-image :src="photo"/>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"/>
      <el-table-column label="商品编码" prop="code"/>
      <el-table-column label="重要产品">
        <template v-slot="{ row: { major } }">
          <el-tag type="danger" v-if="major===0">否</el-tag>
          <el-tag type="success" v-if="major===1">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品类别">
        <template v-slot="{ row: { classification } }">
          <el-tag type="primary">{{ classification }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备案企业" prop="enterprise"/>
      <el-table-column label="审批状态">
        <template v-slot="{ row: { statue } }">
          <el-tag type="warning" v-if="statue===0">等待审批</el-tag>
          <el-tag type="success" v-if="statue===1">通过</el-tag>
          <el-tag type="danger" v-if="statue===2">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="录入日期" prop="enter"/>
      <el-table-column label="审批日期" prop="process"/>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-tooltip content="编辑" effect="light">
            <el-button type="primary" :icon="Edit" circle/>
          </el-tooltip>
          <el-tooltip content="设置" effect="light">
            <el-button type="success" :icon="Setting" circle/>
          </el-tooltip>
          <el-tooltip content="详细信息" effect="light">
            <el-button type="warning" :icon="Document" circle/>
          </el-tooltip>
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
