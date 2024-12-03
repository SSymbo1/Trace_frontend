<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from '../config/trace_enterprise.js'

const graph = ref(null);
const option = config
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
let myChart = null

const props = defineProps({
  data: {
    type: Array
  }
})

const initEcharts = () => {
  myChart = echarts.init(graph.value)
  let name = []
  let value = []
  let yoy = []
  let qoq = []
  props.data.forEach(item => {
    name.push(item.name)
    value.push(item.total)
    yoy.push(item.yoy)
    qoq.push(item.qoq)
  })
  let data = {
    ...config,
    series: [
      {...option.series[0], data: value},
      {...option.series[1], data: yoy},
      {...option.series[2], data: qoq}],
    yAxis: {...option.yAxis, data: name}
  }
  myChart.setOption(data)
  window.addEventListener('resize', handleResize);
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let name = []
    let value = []
    let yoy = []
    let qoq = []
    newValue.forEach(item => {
      name.push(item.name)
      value.push(item.total)
      yoy.push(item.yoy)
      qoq.push(item.qoq)
    })
    let data = {
      ...config,
      series: [
        {...option.series[0], data: value},
        {...option.series[1], data: yoy},
        {...option.series[2], data: qoq}],
      yAxis: {...option.yAxis, data: name}
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
  height: 400px;
}
</style>
