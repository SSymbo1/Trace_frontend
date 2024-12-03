<script setup>
import {ref} from "vue";
import CELLS from 'vanta/dist/vanta.cells.min.js';
import * as THREE from "three"
import welcomeLabel from "@/json/welcome.json";
import homeLabel from "@/json/home.json";
import CollectMap from "@/view/echarts/platform/CollectMap.vue";
import {useNow, useTransition} from '@vueuse/core';
import router from "@/router/index.js";
import VanillaTilt from "vanilla-tilt";
import {
  getPlatformDataCollectRingData,
  getPlatformEnterpriseCollectData, getPlatformMapData, getPlatformProductCollectData, getPlatformTraceCollectData,
  homeCardData,
  homeHistogram
} from "@/api/common/common.js";
import DataCollectBar from "@/view/echarts/platform/DataCollectBar.vue";
import DataCollectArea from "@/view/echarts/platform/DataCollectArea.vue";
import DataCollectRing from "@/view/echarts/platform/DataCollectRing.vue";
import ProductRecord from "@/view/echarts/platform/ProductRecord.vue";
import ProductClassRing from "@/view/echarts/platform/ProductClassRing.vue";
import EnterpriseDataLine from "@/view/echarts/platform/EnterpriseDataLine.vue";
import EnterpriseClassRing from "@/view/echarts/platform/EnterpriseClassRing.vue";
import DataCollectFromRing from "@/view/echarts/platform/DataCollectFromRing.vue";
import TraceDataEntranceBar from "@/view/echarts/platform/TraceDataEntranceBar.vue";
import TraceDataApproachBar from "@/view/echarts/platform/TraceDataApproachBar.vue";
import TraceDataRing from "@/view/echarts/platform/TraceDataRing.vue";

const area = ref(null)
const data = ref({
  dataCollect: {},
  traceData: {},
  approachData: {},
  entranceData: {},
  productType: {},
  productData: {},
  enterpriseData: {},
  enterpriseType: {},
  collectDataFrom: {},
  collectDataClass: {},
  platformData: [],
  area: []
})
let vantaEffect = null
const localTime = ref("")
let localTimeIntervalId = null
let dataCollectIntervalId = null

const vantaInit = () => {
  vantaEffect = CELLS({
    el: area.value,
    THREE: THREE,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    color1: 0xffff,
    color2: 0x356ff2,
    size: 2.00,
    speed: 1.00
  })
}

const dateCompute = computed(() => {
  const date = new Date(useNow().value)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const weekday = weekdays[date.getDay()]
  return `${year}年${month}月${day}日 星期${weekday} ${hours}:${minutes}:${seconds}`
})

const dataCollect = async () => {
  homeHistogram().then(resp => {
    data.value.dataCollect = resp.data.data
  })
  homeCardData().then(resp => {
    data.value.platformData = []
    data.value.platformData.push({data: resp.data.data.loginUser, name: "在线人数"})
    data.value.platformData.push({data: resp.data.data.trace, name: "溯源数据"})
    data.value.platformData.push({data: resp.data.data.major, name: "重要产品"})
    data.value.platformData.push({data: resp.data.data.enterprise, name: "企业数量"})
    data.value.platformData.push({data: resp.data.data.account, name: "账户统计"})
    data.value.platformData.forEach((refData) => {
      let echo = ref(0)
      refData.echoData = useTransition(echo, {
        duration: 2000
      })
      echo.value = refData.data
    })
  })
  getPlatformDataCollectRingData().then(resp => {
    data.value.collectDataFrom = resp.data.platform.from
    data.value.collectDataClass = resp.data.platform.class
  })
  getPlatformEnterpriseCollectData().then(resp => {
    data.value.enterpriseData = resp.data.platform.enterprise
    data.value.enterpriseType = resp.data.platform.enterpriseType
  })
  getPlatformProductCollectData().then(resp => {
    data.value.productData = resp.data.platform.product
    data.value.productType = resp.data.platform.class
  })
  getPlatformTraceCollectData().then(resp => {
    data.value.traceData = resp.data.platform.traceData
    data.value.entranceData = resp.data.platform.entranceClassData
    data.value.approachData = resp.data.platform.approachClassData
  })
  getPlatformMapData().then(resp => {
    data.value.area = resp.data.platform.area
  })
}

onActivated(() => {
  vantaInit()
  VanillaTilt.init(document.querySelectorAll('.window-layer,.platform-info'), {
    max: 11,
    glare: true,
    "max-glare": 0.1
  })
  localTimeIntervalId = setInterval(() => {
    localTime.value = dateCompute.value
  }, 1000)
  dataCollectIntervalId = setInterval(() => {
    dataCollect()
  }, 10000)
  dataCollect()
})

onDeactivated(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
  clearInterval(localTimeIntervalId)
  clearInterval(dataCollectIntervalId)
})
</script>

<template>
  <div class="vanta-area" ref="area">
    <el-container>
      <el-header class="header-center">
        <div class="title" @click="router.push('/')">
          <img
              style="width: 50px"
              src="/vite.svg"
              alt="Element logo"
              :title="welcomeLabel.site_title[0]"
          />
          <span class="slogan">{{ homeLabel.visualized_platform }}</span>
        </div>
        <div class="local-date">{{ localTime }}</div>
      </el-header>
      <el-container style="display: flex;flex-direction: column;height: 100vh">
        <div class="graph-container">
          <div class="graph-left">
            <div class="window-layer">
              <div class="window-logo">数据采集</div>
              <div class="window-main">
                <el-carousel height="300px" motion-blur :interval="5000">
                  <el-carousel-item>
                    <DataCollectBar :data="data.dataCollect"></DataCollectBar>
                  </el-carousel-item>
                  <el-carousel-item>
                    <DataCollectArea :data="data.dataCollect"></DataCollectArea>
                  </el-carousel-item>
                  <el-carousel-item>
                    <DataCollectRing :data="data.collectDataFrom"></DataCollectRing>
                  </el-carousel-item>
                  <el-carousel-item>
                    <DataCollectFromRing :data="data.collectDataClass"></DataCollectFromRing>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="window-layer" style="margin-top: 40px">
              <div class="window-logo">企业数据</div>
              <div class="window-main">
                <el-carousel height="300px" motion-blur :interval="5000">
                  <el-carousel-item>
                    <EnterpriseDataLine :data="data.enterpriseData"></EnterpriseDataLine>
                  </el-carousel-item>
                  <el-carousel-item>
                    <EnterpriseClassRing :data="data.enterpriseType"></EnterpriseClassRing>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <div style="display: flex;flex-direction: column;gap: 20px">
            <div style="width: 500px;height: 500px">
              <CollectMap :data="data.area" class="center-map"></CollectMap>
            </div>
            <div class="platform-info">
              <div class="platform-info-data" v-for="info in data.platformData" :key="info.index">
                <el-statistic :title="info.name" :value="info.echoData"/>
              </div>
            </div>
          </div>
          <div class="graph-right">
            <div class="window-layer">
              <div class="window-logo">产品备案</div>
              <div class="window-main">
                <el-carousel height="300px" motion-blur :interval="5000">
                  <el-carousel-item>
                    <ProductRecord :data="data.productData"></ProductRecord>
                  </el-carousel-item>
                  <el-carousel-item>
                    <ProductClassRing :data="data.productType"></ProductClassRing>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="window-layer" style="margin-top: 40px">
              <div class="window-logo">溯源环节</div>
              <div class="window-main">
                <el-carousel height="300px" motion-blur :interval="5000">
                  <el-carousel-item>
                    <TraceDataEntranceBar :data="data.traceData"></TraceDataEntranceBar>
                  </el-carousel-item>
                  <el-carousel-item>
                    <TraceDataRing :data="data.entranceData"></TraceDataRing>
                  </el-carousel-item>
                  <el-carousel-item>
                    <TraceDataApproachBar :data="data.traceData"></TraceDataApproachBar>
                  </el-carousel-item>
                  <el-carousel-item>
                    <TraceDataRing :data="data.approachData"></TraceDataRing>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
        <el-footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/font/platform.css";

:deep .el-statistic__head {
  color: white;
  font-family: Platform, system-ui;
  font-weight: bold;
  font-size: 15px;
}

:deep .el-statistic__content {
  color: white;
  font-weight: bold;
  font-size: 15px;
}

.platform-info-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.platform-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 500px;
  height: 115px;
  background-color: rgba(0, 0, 0, 0.37);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

.window-logo {
  width: 200px;
  height: 30px;
  background-color: rgba(10, 148, 230, 0.76);
  clip-path: polygon(0 0, 150px 0, 250px 150px, 0 200px);
  font-family: Platform, system-ui;
  color: #e4e7ec;
  padding-left: 7px;
  line-height: 27px;
  font-weight: bold;
  font-size: 18px;
}

.window-main {
  width: 500px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.37);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

.window-layer {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 500px;
}

.graph-container {
  cursor: pointer;
  align-items: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
}

.local-date {
  margin-left: auto;
  font-family: Platform, system-ui;
  color: #e4e7ec;
  font-size: 25px;
  font-weight: bold;
}

.vanta-area {
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.slogan {
  font-size: 30px;
  font-weight: bold;
  color: #e4e7ec;
  font-family: Platform, system-ui
}

.title {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  height: 50px
}

.header-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-map {
  margin-top: 25px;
}
</style>
