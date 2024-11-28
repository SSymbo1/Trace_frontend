<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from '../config/struct_focus_config.js'

const graph = ref(null);
const option = config
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
let myChart = null

const props = defineProps({
  data: {
    type: Array,
  }
})

const initEcharts = () => {
  myChart = echarts.init(graph.value)
  let type = []
  let total = []
  let yoy = []
  let qoq = []
  let data = {
    ...config,
    series: [
      {...option.series[0], data: total},
      {...option.series[1], data: yoy},
      {...option.series[2], data: qoq}],
    xAxis: {...option.xAxis, data: type}
  }
  myChart.setOption(data)
  window.addEventListener('resize', handleResize);
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let type = []
    let total = []
    let yoy = []
    let qoq = []
    newValue.forEach((item) => {
      type.push(item.name)
      total.push(item.total)
      yoy.push(item.yoy)
      qoq.push(item.qoq)
    })
    let data = {
      ...config,
      series: [
        {...option.series[0], data: total},
        {...option.series[1], data: yoy},
        {...option.series[2], data: qoq}],
      xAxis: {...option.xAxis, data: type}
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
  width: 100%;
  height: 500px;
}
</style>
