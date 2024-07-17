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
import Home_statistics from "@/view/echarts/home_statistics.vue";

const useTokenStore = useToken()
const router = useRouter()
const userinfo = ref({})
const dataCollect = ref([])
const menue = ref([])

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

const dropdownMenuProcess = (command) => {
  switch (command) {
    case 'home': {
      router.push("/")
      break
    }
    case 'profile': {
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

const logout = async () => {
  await ElMessageBox.confirm('您确定要退出吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  ElMessage.success("再见!")
  useTokenStore.removeToken()
  router.push("/login")
}

const requestMenue = () => {
  getHomeMenue().then(resp => {
    if (resp.code === 200) {
      menue.value = resp.data.homeMenu
      menue.value.forEach((item) => {
        item.icon = '/src/assets/menue_svg/' + item.icon
      })
    } else {
      ElMessage.error({
        grouping: true,
        message: '操作异常!'
      })
    }
  })
}

onActivated(() => {
  dataProcess()
  requestMenue()
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
                <el-avatar :src="userinfo.avatar"></el-avatar>
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

      <div class="info-statistics">
        <page_container title="数据统计柱状图">
          <home_statistics></home_statistics>
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
