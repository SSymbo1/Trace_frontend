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
        type: 'value'
    },
    series: [
        {
            name: '数据量',
            data: [],
            type: 'bar'
        },
        {
            name: '同比增长',
            data: [],
            type: 'bar'
        },
        {
            name: '环比增长',
            data: [],
            type: 'bar'
        }
    ]
}
