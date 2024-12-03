<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <Suspense>
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </Suspense>
      </transition>
    </router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
