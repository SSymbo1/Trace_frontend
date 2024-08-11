export const config = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '数据量',
            data: [],
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#2ec7c8',
                    barBorderRadius: [50, 50, 0, 0]
                }
            }
        }
    ]
}
