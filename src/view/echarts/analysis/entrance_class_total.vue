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
import {config} from './config/entrance_class_total_config.js'

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
    let date = []
    let fresh = []
    let product = []
    let drink = []
    let food = []
    props.data.forEach((item) => {
      date.push(item.date)
      fresh.push(item.fresh)
      product.push(item.product)
      drink.push(item.drink)
      food.push(item.food)
    })
    let data = {
      ...config,
      series: [
        {...option.series[0], data: fresh},
        {...option.series[1], data: product},
        {...option.series[2], data: drink},
        {...option.series[3], data: food}],
      xAxis: {...option.xAxis, data: date}
    }
    myChart.setOption(data)
    window.addEventListener('resize', handleResize);
  }
}

watch(() => props.data, (newValue) => {
  if (newValue && myChart) {
    let date = []
    let fresh = []
    let product = []
    let drink = []
    let food = []
    newValue.forEach((item) => {
      date.push(item.date)
      fresh.push(item.fresh)
      product.push(item.product)
      drink.push(item.drink)
      food.push(item.food)
    })
    let data = {
      ...config,
      series: [
        {...option.series[0], data: fresh},
        {...option.series[1], data: product},
        {...option.series[2], data: drink},
        {...option.series[3], data: food}],
      xAxis: {...option.xAxis, data: date}
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
