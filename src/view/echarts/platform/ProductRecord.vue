<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from './config/product_record_config.js'

const graph = ref(null);
const option = config
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
let myChart = null

const props = defineProps({
  data: {
    type: Object,
  }
})

const initEcharts = () => {
  myChart = echarts.init(graph.value)
  let data = {
    ...config,
    series: [
      {...option.series[0], data: []},
      {...option.series[1], data: []}],
    xAxis: {...option.xAxis, data: []}
  }
  myChart.setOption(data)
  window.addEventListener('resize', handleResize);
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let data = {
      ...config,
      series: [
        {...option.series[0], data: newValue.insert},
        {...option.series[1], data: newValue.process}],
      xAxis: {...option.xAxis, data: newValue.time}
    }
    myChart.setOption(data, true)
  }
})

const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

onActivated(() => {
  nextTick(() => {
    initEcharts()
  })
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
  width: 500px;
  height: 280px;
}
</style>
