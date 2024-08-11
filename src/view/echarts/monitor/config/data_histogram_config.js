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
                    color: '#56c6ff',
                    barBorderRadius: [50, 50, 0, 0]
                }
            }
        }
    ]
}
