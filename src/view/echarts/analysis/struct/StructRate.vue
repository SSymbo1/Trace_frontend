<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, watch} from "vue";
import {config} from "@/view/echarts/analysis/config/struct_rate_config.js";

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
  let total = []
  let data = {
    ...config,
    series: [{...option.series[0], data: total}],
  }
  myChart.setOption(data)
  window.addEventListener('resize', handleResize);
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let total = []
    newValue.forEach(item => {
      let obj = {
        value: parseFloat(item.total) / 100,
        name: item.name
      }
      total.push(obj)
    })
    let data = {
      ...config,
      series: [{...option.series[0], data: total}],
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
