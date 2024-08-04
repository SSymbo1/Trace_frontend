<script setup>
import Page_container from "@/view/component/page_container.vue";
import router from "@/router/index.js";
import {onActivated, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import caution from "@/json/account_set_caution.json";
import {classificationMenueTree} from "@/api/menue/tree_menue.js";
import {enterpriseSubMenue} from "@/api/menue/sub_menue.js";
import {addProduct} from "@/api/subject/product.js";
import {ElMessage} from "element-plus";

const formData = ref({})
const enterpriseMenue = ref([])
const enterpriseKeyWord = ref('')
const rules = ref({
  name: [
    {required: true, message: '请输入商品名称', trigger: 'blur'},
    {max: 25, message: '商品名称长度应该在25个字符内', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入商品编号', trigger: 'blur'},
    {max: 25, message: '商品编号长度应该在25个字符内', trigger: 'blur'}
  ],
  isMajor: [
    {required: true, message: '请选择是否是重要产品', trigger: 'blur'},
  ],
  cid: [
    {required: true, message: '请选择商品分类', trigger: 'blur'},
  ],
  enterprise: [
    {required: true, message: '请选择所属企业', trigger: 'blur'},
  ],
  unit: [
    {required: true, message: '请选择商品单位', trigger: 'blur'},
  ],
  num: [
    {required: true, message: '请输入商品数量', trigger: 'blur'},
    {type: 'number', message: '商品数量必须为数字值', trigger: 'blur'},
  ]
})
const classMenue = ref()
const form = ref()

const getTreeMenue = () => {
  classificationMenueTree().then(resp => {
    if (resp.code === 200) {
      classMenue.value = resp.data.tree
    }
  })
}

// 根据关键字获取企业列表
const getEnterpriseMenue = async () => {
  enterpriseSubMenue(enterpriseKeyWord.value).then(resp => {
    enterpriseMenue.value = resp.data.menue
  })
}

const init = () => {
  formData.value = {}
  form.value.clearValidate()
}

const submitForm = async () => {
  await form.value.validate()
  addProduct(formData.value).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      init()
    } else {
      ElMessage.error(resp.message)
    }
  })
}

onActivated(() => {
  init()
  getTreeMenue()
  getEnterpriseMenue()
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
              show-checkbox>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="所属企业" label-width="100px" prop="enterprise">
          <el-select clearable v-model="formData.enterprise">
            <template #header>
              <el-input
                  v-model="enterpriseKeyWord"
                  clearable
                  @keyup="getEnterpriseMenue"
                  placeholder="请输入公司名或社会代码"></el-input>
            </template>
            <el-option
                v-for="enterprise in enterpriseMenue"
                :key="enterprise.index"
                :label="enterprise.name"
                :value="enterprise.eid"></el-option>
          </el-select>
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
          <el-input placeholder="请输入产品数量" v-model.number="formData.num" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-input
          v-model="caution.caution"
          type="textarea"
          disabled
          style="margin-top: 15px;margin-left: 15px;width: 800px"
          resize="none"
          rows="15"></el-input>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <el-button type="success" :icon="Edit" @click="submitForm">提交</el-button>
      <el-button type="primary" :icon="Delete" @click="init">重置</el-button>
    </div>

  </page_container>
</template>

<style scoped lang="scss">

</style>
