<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {onActivated,ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import caution from "@/json/account_set_caution.json";
import {classificationMenueTree} from "@/api/menue/tree_menue.js";

const formData = ref({})
const rules = ref({
  name: [],
  code: [],
  isMajor: [],
  cid: [],
  unit: [],
  num: []
})
const classMenue = ref()

const getTreeMenue = () => {
  classificationMenueTree().then(resp => {
    if (resp.code === 200) {
      classMenue.value = resp.data.tree
    }
  })
}

onActivated(() => {
  getTreeMenue()
})
</script>

<template>
  <page_container title="">

    <el-row style="margin-bottom: 30px">
      <el-page-header @back="()=>{router.go(-1)}">
        <template #content>
          <span class="text-large font-600 mr-3">添加产品</span>
        </template>
      </el-page-header>
    </el-row>

    <div style="display: flex; justify-content: center">
      <el-form
          @submit.native.prevent
          :model="formData"
          :rules="rules"
          ref="form"
          label-position="right"
          label-width="auto"
          style=";max-width: 350px;vertical-align: center;margin-top: 15px">
        <el-form-item label="商品名称" prop="name">
          <el-input placeholder="请输入产品名称" v-model="formData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品代码" prop="code">
          <el-input placeholder="请输入产品代码" v-model="formData.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否重要产品" prop="isMajor">
          <el-select v-model="formData.isMajor" clearable>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品分类" prop="cid">
          <el-tree-select
              :data="classMenue"
              v-model="formData.cid"
              multiple
              show-checkbox>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="规格" prop="unit">
          <el-select v-model="formData.unit" clearable>
            <el-option label="个" value="个"></el-option>
            <el-option label="斤" value="斤"></el-option>
            <el-option label="公斤" value="公斤"></el-option>
            <el-option label="瓶" value="瓶"></el-option>
            <el-option label="件" value="件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input placeholder="请输入产品数量" v-model="formData.code" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-input
          v-model="caution.caution"
          type="textarea"
          disabled
          style="margin-top: 15px;margin-left: 15px;width: 800px"
          resize="none"
          rows="13"></el-input>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <el-button type="success" :icon="Edit">提交</el-button>
      <el-button type="primary" :icon="Delete">重置</el-button>
    </div>

  </page_container>
</template>

<style scoped lang="scss">

</style>
