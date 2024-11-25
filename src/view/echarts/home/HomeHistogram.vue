<script setup>
import {ref, onDeactivated, onActivated, getCurrentInstance, nextTick} from "vue";
import {config} from './config/hoem_histogram_config.js'
import {homeHistogram} from "@/api/common/common.js";

const histogram = ref({})
const graph = ref(null);
const option = config
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
let myChart = null

const requestHistogramData = async () => {
  try {
    const resp = await homeHistogram()
    if (resp.code === 200) {
      histogram.value.time = resp.data.data.time;
      histogram.value.data = resp.data.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch histogram data:', error);
  }
}

const initEcharts = () => {
  if (graph.value) {
    myChart = echarts.init(graph.value)
    let data = {
      ...config,
      series: [{...option.series[0], data: histogram.value.data}],
      xAxis: {...option.xAxis, data: histogram.value.time}
    }
    myChart.setOption(data)
    window.addEventListener('resize', handleResize);
  }
}

const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

onActivated(async () => {
  await requestHistogramData()
  initEcharts()
})

onDeactivated(() => {
  if (myChart) {
    myChart.dispose()
  }
  window.removeEventListener('resize', handleResize);
})
</script>

<template>
  <div ref="graph" class="echarts"></div>
</template>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 500px;
}
</style>
