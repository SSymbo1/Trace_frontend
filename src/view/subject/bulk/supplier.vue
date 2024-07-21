<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {ref} from "vue";
import bread from '@/json/subject_bread_crumb.json'

const supplierBread = ref(bread.supplier)
</script>

<template>
  <page_container title="">

    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #breadcrumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="tab in supplierBread"
                :key="tab.index"
                :to="{ path:tab.path }">
              {{ tab.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <span class="text-large font-600 mr-3">{{ supplierBread[2].name }}</span>
        </template>
      </el-page-header>
    </el-row>

  </page_container>
</template>

<style scoped lang="scss">

</style>
