export const config = {
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            color: '#fff'
        }
    },
    yAxis: {
        name: "条",
        type: 'value',
        axisLabel: {
            color: '#fff'
        }
    },
    series: [
        {
            name: "数据采集",
            data: [],
            type: 'line',
            areaStyle: {}
        }
    ]
}