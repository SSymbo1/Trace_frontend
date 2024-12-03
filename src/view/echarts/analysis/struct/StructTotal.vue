<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from '../config/struct_total_config.js'

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
  let normal = []
  let focus = []
  let data = {
    ...config,
    series: [
      {...option.series[0], data: normal},
      {...option.series[1], data: focus}],
    xAxis: {...option.xAxis, data: type}
  }
  myChart.setOption(data)
  window.addEventListener('resize', handleResize);
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let type = []
    let normal = []
    let focus = []
    newValue.forEach((item) => {
      type.push(item.name)
      normal.push(item.normal)
      focus.push(item.focus)
    })
    let data = {
      ...config,
      series: [
        {...option.series[0], data: normal},
        {...option.series[1], data: focus}],
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
