<script setup>
import Page_container from "@/view/component/page_container.vue";
import bread from '@/json/analysis_bread_crumb.json'
import {ref} from "vue";
import router from "@/router/index.js";
import {Download, Search} from "@element-plus/icons-vue";

const tabBread =ref(bread.process)
const query = ref({
  date: '',
  type: '',
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
    <el-form
        inline
        @submit.native.prevent
        @keyup="">
      <el-row>
        <el-col :span="14">
          <el-form-item label="统计日期">
            <el-date-picker
                v-model="query.date"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
          </el-form-item>
          <el-form-item label="查询类别">
            <el-select style="width: 150px">
              <el-option label="月" value="month"></el-option>
              <el-option label="日" value="day"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="">搜索</el-button>
          <el-button type="primary" :icon="Download" @click="">下载</el-button>
        </el-col>
      </el-row>
      <el-divider/>
    </el-form>

  </page_container>
</template>

<style scoped lang="scss">

</style>
