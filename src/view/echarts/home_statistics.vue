<script setup>
import {onActivated, ref, getCurrentInstance, onDeactivated} from "vue";
import statisticsConfig from '@/json/home_statistics_config.json'

const chart = ref()
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
const config = ref({})
const data = ref({xData: [], yData: []})
let myChart = null

const initEchart = () => {
  myChart = echarts.init(chart.value)
  myChart.setOption(config.value)
  window.addEventListener('resize', myChart.resize);
}

const getEchartsData = () => {
  config.value = statisticsConfig
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
  config.value.xAxis.data = data.value.xData
  config.value.series[0].data = data.value.yData
}

onActivated(() => {
  getEchartsData()
  initEchart()
})

onDeactivated(() => {
  data.value = {xData: [], yData: []}
  if (myChart) {
    window.removeEventListener('resize', myChart.resize);
    myChart.dispose()
  }
});
</script>

<template>
  <div ref="chart" class="graph"></div>
</template>

<style scoped lang="scss">
.graph {
  height: 390px;
  width: 100%;
}
</style>
