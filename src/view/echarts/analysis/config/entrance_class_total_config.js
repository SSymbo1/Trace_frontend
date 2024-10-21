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
        }
    ],
    series: [
        {
            name: '生鲜食品',
            type: 'bar',
            data: []
        },
        {
            name: '加工食品',
            type: 'bar',
            data: []
        },
        {
            name: '饮料与酒水',
            type: 'bar',
            data: []
        },
        {
            name: '食品杂货',
            type: 'bar',
            data: []
        },
    ]
}
