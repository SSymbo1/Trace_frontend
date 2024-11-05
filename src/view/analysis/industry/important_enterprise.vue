<script setup>
import Page_container from "@/view/component/page_container.vue";
import {ref} from "vue";
import bread from "@/json/analysis_bread_crumb.json";
import router from "@/router/index.js";
import {Delete, Edit, Search} from "@element-plus/icons-vue";
import {
  deleteImportantEnterprise,
  deleteImportantEnterpriseAll, deleteImportantEnterpriseBatched,
  getImportantEnterpriseData
} from "@/api/analysis/struct.js";
import Add_enterprise from "@/view/analysis/industry/dialog/add_enterprise.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const tabBread = ref(bread.enterprise)
const data = ref({
  plant: [],
  process: [],
  batch: [],
  butch: [],
  animal: [],
  farm: [],
  market: []
})
const selection = ref([])
const add = ref()

const getImportantEnterpriseList = async () => {
  getImportantEnterpriseData().then(resp => {
    if (resp.code === 200) {
      data.value = resp.data.important
      console.log(data.value)
    }
  })
}

const deleteSingleEnterpriseInfo = async (scope) => {
  await ElMessageBox.confirm('是否移除指定重要企业?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  let enterprise = {
    eid: scope
  }
  deleteImportantEnterprise(enterprise).then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      getImportantEnterpriseList()
    }
  })
}

const deleteAllEnterpriseInfo = async () => {
  await ElMessageBox.confirm('是否移除所有重要企业?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  deleteImportantEnterpriseAll().then(resp => {
    if (resp.code === 200) {
      ElMessage.success(resp.message)
      getImportantEnterpriseList()
    }
  })
}

const deleteEnterpriseInfoBatched = async () => {
  if (selection.value.length === 0) {
    ElMessage.error("请选择要删除的企业")
  } else {
    await ElMessageBox.confirm('是否移除所选择的重要企业?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    deleteImportantEnterpriseBatched(selection.value).then(resp => {
      if (resp.code === 200) {
        ElMessage.success(resp.message)
        getImportantEnterpriseList()
      }
    })
  }
}

const handleSelectionChange = (select) => {
  selection.value = select.map((item) => item.eid)
}

const onAddImportantEnterpriseSuccess = () => {
  getImportantEnterpriseList()
}

const openAddEnterpriseDialog = () => {
  add.value.openDialog()
}

onActivated(() => {
  getImportantEnterpriseList()
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

    <div>
      <el-row>
        <el-col :span="11">
          <el-button type="primary" :icon="Edit" @click="openAddEnterpriseDialog">添加重点行业</el-button>
          <el-button type="danger" :icon="Delete" @click="deleteAllEnterpriseInfo">移除所有重点行业</el-button>
          <el-button type="danger" :icon="Delete" @click="deleteEnterpriseInfoBatched">批量移除重点行业</el-button>
        </el-col>
      </el-row>

    </div>

    <div class="market">
      <div>类型代码：1</div>
      <div>环节名称：种植企业</div>
      <el-table
          :data="data.plant"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="操作者" prop="total"></el-table-column>
        <el-table-column label="添加时间" prop="rate"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="plant">
      <div>类型代码：2</div>
      <div>环节名称：养殖企业</div>
      <el-table
          :data="data.animal"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="操作者" prop="total"></el-table-column>
        <el-table-column label="添加时间" prop="rate"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="farm">
      <div>类型代码：3</div>
      <div>环节名称：生产加工</div>
      <el-table
          :data="data.process"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="enterprise"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="添加时间" prop="date"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="animal">
      <div>类型代码：4</div>
      <div>环节名称：屠宰企业</div>
      <el-table
          :data="data.butch"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="enterprise"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="添加时间" prop="date"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="batch">
      <div>类型代码：5</div>
      <div>环节名称：批发市场</div>
      <el-table
          :data="data.batch"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="enterprise"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="添加时间" prop="date"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="butch">
      <div>类型代码：6</div>
      <div>环节名称：农贸市场</div>
      <el-table
          :data="data.farm"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="enterprise"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="添加时间" prop="date"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <div class="product">
      <div>类型代码：7</div>
      <div>环节名称：连锁超市</div>
      <el-table
          :data="data.market"
          @selection-change="handleSelectionChange"
          style="min-width: 100%; margin-top: 10px"
          :row-style="{ height: '50px' }"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          table-layout="fixed">
        <el-table-column type="selection" width="55px" fixed="left"/>
        <el-table-column label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="企业名称" prop="enterprise"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="添加时间" prop="date"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="scope">
            <el-tooltip content="移除" effect="light">
              <el-button type="primary" :icon="Delete" circle @click="deleteSingleEnterpriseInfo(scope.row.eid)"/>
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="空空如也"/>
        </template>
      </el-table>
    </div>

    <add_enterprise ref="add" @success="onAddImportantEnterpriseSuccess"></add_enterprise>

  </page_container>
</template>

<style scoped>
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
