export const config = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        }
    },
    yAxis: {
        name: "数据量",
        type: 'value'
    },
    series: [
        {
            name: '本轮数据',
            data: [],
            type: 'bar'
        },
        {
            name: '同比',
            data: [],
            type: 'bar'
        },
        {
            name: '环比',
            data: [],
            type: 'bar'
        },
    ]
}
