<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from "@/view/echarts/platform/config/map_config.js";

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
  fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
      .then(data => data.json())
      .then(resp => {
        echarts.registerMap('China', {geoJSON: resp})
        myChart.setOption(option)
        window.addEventListener('resize', handleResize);
      })
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
        .then(data => data.json())
        .then(resp => {
          const values = props.data.map(item => item.value)
          const max = Math.max(...values)
          const min = Math.min(...values)
          let data = {
            visualMap: {...option.visualMap, max: max, min: min},
            tooltip: option.tooltip,
            geo: option.geo,
            series: [{...option.series[0], data: newValue}]
          }
          echarts.registerMap('China', {geoJSON: resp})
          myChart.setOption(data, true)
        })
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