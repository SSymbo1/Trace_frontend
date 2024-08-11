export const config = {
    tooltip: {
        trigger: 'item'
    },
    legend: {},
    series: [
        {
            name: '数据采集',
            data: [],
            type: 'pie',
            radius: '50%',
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
