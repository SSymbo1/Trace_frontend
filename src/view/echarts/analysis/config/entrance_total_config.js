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
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        }
    },
    yAxis: [
        {
            type: 'value',
            name: '数据量',
            position: 'left',
        },
        {
            type: 'value',
            name: '增长率',
            position: 'right',
        }
    ],
    series: [
        {
            name: '数据量',
            type: 'bar',
            yAxisIndex: 0,
            data: []
        },
        {
            name: '同比增长',
            type: 'line',
            yAxisIndex: 1,
            data: []
        },
        {
            name: '环比增长',
            type: 'line',
            yAxisIndex: 1,
            data: []
        }
    ]
}
