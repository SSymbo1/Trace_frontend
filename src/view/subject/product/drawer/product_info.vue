<script setup>
import {ref} from "vue";
import {getApproverInfo} from "@/api/common/common.js";

const drawerVisible = ref(false);
const data = ref({})

const openDrawer = (queryData) => {
  data.value = queryData
  requestApproverInfo(data.value.productRecord.approver)
  drawerVisible.value = true
}

const closeDrawer = () => {
  drawerVisible.value = false
}

const requestApproverInfo = (aid) => {
  getApproverInfo(aid).then(resp => {
    data.value.productRecord.approverName = resp.data.data.name
  })
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer title="产品详细信息" v-model="drawerVisible" size="42%" @close="closeDrawer">
    <el-descriptions :column="2" border direction="horizontal">
      <el-descriptions-item label="产品名称" label-align="center">
        <el-text class="show-text">{{ data.name }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="产品编码" label-align="center">
        <el-text class="show-text">{{ data.code }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="审批状态" label-align="center">
        <el-tag type="warning" v-if="data.productRecord.statue===0" size="large">等待审批</el-tag>
        <el-tag type="success" v-if="data.productRecord.statue===1" size="large">通过</el-tag>
        <el-tag type="danger" v-if="data.productRecord.statue===2" size="large">未通过</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="是否重要产品" label-align="center">
        <el-tag type="danger" v-if="data.isMajor===0" size="large">否</el-tag>
        <el-tag type="success" v-if="data.isMajor===1" size="large">是</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="审批人员" label-align="center">
        <el-text class="show-text">{{ data.productRecord.approverName }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="产品分类" label-align="center">
        <el-text class="show-text">{{ data.className }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="所属公司" label-align="center">
        <el-text class="show-text">{{ data.enterpriseName }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="数量" label-align="center">
        <el-text class="show-text">{{ data.productRecord.num }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="单位" label-align="center">
        <el-text class="show-text">{{ data.unit }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="审批时间" label-align="center">
        <el-text class="show-text">{{ data.productRecord.processTime }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="创建方式" label-align="center">
        <el-tag type="primary" v-if="data.productRecord.importType===0" size="large">批量表格导入</el-tag>
        <el-tag type="primary" v-if="data.productRecord.importType===1" size="large">逐条导入</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建人员" label-align="center">
        <el-text class="show-text">{{ data.productRecord.accountName }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间pro" label-align="center">
        <el-text class="show-text">{{ data.productRecord.insertTime }}</el-text>
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>
