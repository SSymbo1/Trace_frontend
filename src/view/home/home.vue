<script setup>
import {onActivated, onDeactivated, ref} from "vue";
import {useTransition} from '@vueuse/core'
import welcomeLabel from '@/json/welcome.json';
import homeLabel from '@/json/home.json';
import Page_container from "@/view/component/page_container.vue";
import {useToken} from "@/store/index.js";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {getHomeMenue} from "@/api/menue/menue.js";
import {useAccountStore} from "@/store/base/account.js";
import Current_info from "@/view/component/current_info.vue";
import Home_histogram from "@/view/echarts/home/home_histogram.vue";

const useTokenStore = useToken()
const useAccount = useAccountStore()
const router = useRouter()
const dataCollect = ref([])
const menue = ref([])
const account = ref({})
const info = ref()
const data = ref({xData: [], yData: []})

// todo 数据卡片数据请求
// 数据卡片数据请求和处理
const dataProcess = () => {
  dataCollect.value = homeLabel.info_collect_card
  dataCollect.value.forEach((data) => {
    let echo = ref(0)
    data.echoData = useTransition(echo, {
      duration: 2000
    })
    echo.value = data.data
  })
}

const openCurrentInfoDrawer = () => {
  info.value.openDrawer(useAccount.account)
}

// 顶部头像下拉菜单选项
const dropdownMenuProcess = (command) => {
  switch (command) {
    case 'home': {
      router.push("/")
      break
    }
    case 'profile': {
      openCurrentInfoDrawer()
      break
    }
    case 'change': {
      break
    }
    case 'logout': {
      logout()
      break
    }
  }
}

// 退出登录
const logout = async () => {
  await ElMessageBox.confirm('您确定要退出吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  ElMessage.success("再见!")
  useTokenStore.removeToken()
  useAccountStore().removeAccount()
  router.push("/login")
}

// 获取当前用户信息
const whoIam = () => {
  account.value = useAccountStore().account
}

// 获取首页菜单项
const requestMenue = async () => {
  getHomeMenue().then(resp => {
    if (resp.code === 200) {
      menue.value = resp.data.homeMenu
      menue.value.forEach((item) => {
        item.icon = '/src/assets/home_menue_icon/' + item.icon
      })
    }
  })
}

const requestHistogramData = () => {
  data.value = {xData: [], yData: []}
  console.log("执行")
  let today = new Date();
  for (let i = -15; i <= 0; i++) {
    let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let formattedDate = `${year}-${month}-${day}`;
    data.value.yData.push(Math.floor(Math.random() * (1000 - 100 + 1)) + 100)
    data.value.xData.push(formattedDate);
  }
}

onActivated(() => {
  whoIam()
  dataProcess()
  requestMenue()
  requestHistogramData()
})
</script>

<template>

  <el-container>

    <!--  顶部导航栏  -->
    <el-header>
      <el-menu
          mode="horizontal"
          :ellipsis="false">
        <el-menu-item index="0">
          <img
              style="width: 50px"
              src="/vite.svg"
              alt="Element logo"
              :title="welcomeLabel.site_title[0]"
          />
          <span class="site-title">{{ welcomeLabel.site_title[0] }}</span>
          <span style=""></span>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="1">
          <el-dropdown @command="dropdownMenuProcess">
              <span>
                <el-avatar :src="account.avatar"></el-avatar>
                <el-icon><CaretBottom/></el-icon>
              </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                    v-for="label in homeLabel.header_menu"
                    :key="label.index"
                    :command="label.command"
                    :icon="label.icon">
                  {{ label.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>

    <!--  主体内容  -->
    <el-main class="main-container">

      <!--  菜单项  -->
      <div class="role-menu">
        <page_container title="菜单选项栏" class="header-menu">
          <div class="menu-container">
            <div class="select-card"
                 @click="router.push(tab.path)"
                 v-for="tab in menue"
                 :key="tab.index">
              <div class="menu-image" :style="{ backgroundColor:tab.color }">
                <img :src="tab.icon" width="48" :alt="tab.name">
              </div>
              <div>{{ tab.name }}</div>
            </div>
          </div>
        </page_container>
      </div>

      <!--  数据展示卡片   -->
      <div class="info-card-container">
        <div class="info-card"
             v-for="card in dataCollect"
             :key="card.index">
          <page_container title="数据卡片">
            <img :src="card.icon"/>
            <el-statistic :title="card.name" :value="card.echoData" class="info-show"/>
          </page_container>
        </div>
      </div>

      <!--   echarts数据统计柱状图   -->
      <div class="info-statistics">
        <page_container title="数据统计柱状图">
          <home_histogram :data="data"></home_histogram>
        </page_container>
      </div>

    </el-main>

    <!--  页脚  -->
    <el-footer class="footer">
      <div class="platform" @click="router.push('/platform')">
        <img
            style="width: 30px"
            src="/vite.svg"
            alt="Element logo"
            :title="welcomeLabel.site_title[0]"
        />
        <span class="platform-label">{{ homeLabel.visualized_platform }}</span>
      </div>
    </el-footer>

    <current_info ref="info"></current_info>

  </el-container>
</template>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}

.footer {
  border-top: 2px solid #e4e7ec;
  text-align: center;
  font-family: 'PingFang SC', serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  height: 85vh
}

.site-title {
  margin-left: 15px;
  font-size: large;
  font-weight: bold;
}

.platform {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.platform-label {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-weight: 400;
  font-size: smaller;
  margin-left: 8px;
}

.role-menu {
  height: 150px;
}

.info-card-container {
  margin-top: 30px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.info-card {
  width: 350px;
  height: 108px;
}

.info-show {
  float: right;
}

.info-statistics {
  margin-top: 30px;
  width: 100%;
  height: 500px;
}

.select-card {
  width: 110px;
  float: left;
  cursor: pointer;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: medium;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

.menu-image {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.5s ease;
}

.menu-image:hover {
  transform: translateY(-12px);
}

.menu-container {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: flex-start;
}

.header-menu {
  height: 150px;
}
</style>
