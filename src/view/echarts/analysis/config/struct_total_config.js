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
            name: '普通企业',
            data: [],
            type: 'bar'
        },
        {
            name: '关注企业',
            data: [],
            type: 'bar'
        }
    ]
}
