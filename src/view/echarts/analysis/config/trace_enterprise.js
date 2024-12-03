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
        containLabel: true // 包含标签，确保图表不会被轴标签遮挡
    },
    xAxis: {
        type: 'value',
        name: '条'
    },
    yAxis: {
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        }
    },
    series: [
        {
            name: '数据量',
            type: 'bar',
            data: []
        },
        {
            name: '同比增长',
            type: 'bar',
            data: []
        },
        {
            name: '环比增长',
            type: 'bar',
            data: []
        },
    ]
}
