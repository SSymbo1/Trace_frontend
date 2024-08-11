<script setup>
import {ref, onDeactivated, onActivated, getCurrentInstance, defineProps, watch, nextTick} from "vue";
import {config} from './config/hoem_histogram_config.js'

const graph = ref(null);
const option = config
const internalInstance = getCurrentInstance()
const echarts = internalInstance.appContext.config.globalProperties.$echarts
let myChart = null

const props = defineProps({
  data: {
    type: Object
  }
})

const initEcharts = () => {
  if (graph.value && props.data) {
    myChart = echarts.init(graph.value)
    let data = {
      ...config,
      series: [{...option.series[0], data: props.data.yData}],
      xAxis: {...option.xAxis, data: props.data.xData}
    }
    myChart.setOption(data)
    window.addEventListener('resize', handleResize);
  }
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let data = {
      ...config,
      series: [{...option.series[0], data: props.data.yData}],
      xAxis: {...option.xAxis, data: props.data.xData}
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
    if (props.data) {
      initEcharts()
    }
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
