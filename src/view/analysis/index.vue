<script setup>
import welcomeLabel from "@/json/welcome.json";
import homeLabel from "@/json/home.json";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {useToken} from "@/store/index.js";
import {onActivated, ref} from "vue";
import {getAnalysisMenue} from "@/api/menue/menue.js";
import {useAccountStore} from "@/store/base/account.js";
import Current_info from "@/view/component/current_info.vue";
import Re_password from "@/view/component/re_password.vue";

const useTokenStore = useToken()
const useAccount = useAccountStore()
const router = useRouter()
const menue = ref();
const account = ref({})
const info = ref()
const rePass = ref()

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
      openRePassword()
      break
    }
    case 'logout': {
      logout()
      break
    }
  }
}

const openCurrentInfoDrawer = () => {
  info.value.openDrawer(useAccount.account)
}

const openRePassword = () => {
  rePass.value.openDialog()
}

// 请求子功能菜单
const requestMenue = () => {
  getAnalysisMenue().then(resp => {
    if (resp.code === 200) {
      menue.value = resp.data.menue
    }
  })
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

onActivated(() => {
  whoIam()
  requestMenue()
})
</script>

<template>
  <el-container class="container">

    <el-aside width="200px" class="menue">
      <!--   侧边菜单   -->
      <el-menu
          active-text-color="#409EFF"
          background-color="#545c64"
          :default-active="$route.path"
          text-color="#ffffff"
          style="height: 100vh">
        <template v-for="item in menue" :key="item.path">
          <el-sub-menu :index="item.path" v-if="item.children">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :index="child.path" @click="router.push(child.path)">
              {{ child.name }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else @click="router.push(item.path)">{{ item.name }}</el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>

      <!--  顶部导航栏  -->
      <el-header>
        <el-menu
            mode="horizontal"
            :ellipsis="false">
          <el-menu-item index="0" @click="router.push('/')">
            <img
                style="width: 50px"
                src="/vite.svg"
                alt="Element logo"
                :title="welcomeLabel.site_title[0]"
            />
            <span class="site-title">{{ welcomeLabel.site_title[0] }}</span>
            <span style="margin-left: 15px;font-weight: bold;color: #A8ABB2">追溯数据分析</span>
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

      <!--主体内容（中心）-->
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in" appear>
            <Suspense>
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </Suspense>
          </transition>
        </router-view>
      </el-main>

    </el-container>

    <current_info ref="info"></current_info>

    <re_password ref="rePass"></re_password>

  </el-container>
</template>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.main_container {
  height: 85vh
}

.menue {
  height: 100%;
}

.footer {
  text-align: center;
  font-family: 'PingFang SC', serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.site-title {
  margin-left: 15px;
  font-size: large;
  font-weight: bold;
}
.container{
  height: 100vh;
}
</style>
