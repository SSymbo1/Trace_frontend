<script setup>
import Page_container from "@/view/component/PageContainer.vue";
import {onActivated, ref} from "vue";
import bread from "@/json/system_bread_crumb.json";
import router from "@/router/index.js";
import {Search} from "@element-plus/icons-vue";
import {getSensitiveAccountPaged} from "@/api/system/sensitive.js";

const tabBread = ref(bread.sensitive_account)
const keyword = ref('')
const pageSize = ref(5)
const total = ref(0)
const currentPage = ref(1)
const data = ref()
const loading = ref()

// 分页器：页面内容大小切换
const onSizeChange = (value) => {
  requestSensitiveData()
}

// 分页器：页面切换
const onCurrentChange = (value) => {
  requestSensitiveData()
}

// 搜索敏感记录
const requestSensitiveData = async () => {
  loading.value = true
  getSensitiveAccountPaged(keyword.value, currentPage.value, pageSize.value).then(resp => {
    if (resp.code === 200) {
      total.value = resp.data.iPage.total
      pageSize.value = resp.data.iPage.size
      data.value = resp.data.iPage.records
      loading.value = false
    }
  })
}

onActivated(() => {
  requestSensitiveData()
})
</script>

<template>
  <page_container title="">

    <!--  面包屑导航  -->
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
        @keyup="requestSensitiveData">
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-input v-model="keyword" clearable placeholder="用户姓名或用户名">
              <template #append>
                <el-button :icon="Search" @click="requestSensitiveData"/>
              </template>
            </el-input>
          </el-form-item>
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
      <el-table-column label="操作者头像">
        <template v-slot="{ row: { operator } }">
          <el-avatar :src="operator.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作者" prop="operator.name"></el-table-column>
      <el-table-column label="受影响账号头像">
        <template v-slot="{ row: { account } }">
          <el-avatar :src="account.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="受影响者" prop="account.name"></el-table-column>
      <el-table-column label="操作内容" prop="operate"></el-table-column>
      <el-table-column label="操作时间" prop="operateTime"></el-table-column>
      <template #empty>
        <el-empty description="空空如也"/>
      </template>
    </el-table>

    <!--分页-->
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5,10,20,50]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
    />

  </page_container>
</template>

<style scoped lang="scss">

</style>
