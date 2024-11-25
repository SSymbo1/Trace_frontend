<script setup>
import {
  ref,
  getCurrentInstance,
  nextTick,
  defineProps,
  watch,
  onMounted,
  onUnmounted
} from "vue";
import {config} from './config/entrance_from_total_config.js'

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
  if (graph.value && props.data) {
    myChart = echarts.init(graph.value)
    fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
        .then(data => data.json())
        .then(resp => {
          echarts.registerMap('China', resp)
          const values = props.data.map(item => item.value)
          const max = Math.max(...values)
          const min = Math.min(...values)
          let data = {
            tooltip: {},
            visualMap: {
              max: max,
              min: min,
              ...option.visualMap,
            },
            series: [{...option.series[0], data: props.data}]
          }
          myChart.setOption(data)
          window.addEventListener('resize', handleResize);
        })
  }
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    const values = newValue.map(item => item.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    let data = {
      tooltip: {},
      visualMap: {
        ...option.visualMap,
        max: max,
        min: min
      },
      series: [{...option.series[0], data: props.data}]
    }
    myChart.setOption(data, true)
  }
})

const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

onMounted(() => {
  nextTick(() => {
    if (props.data) {
      initEcharts()
    }
  })
})

onUnmounted(() => {
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
