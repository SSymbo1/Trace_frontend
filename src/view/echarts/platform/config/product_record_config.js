import * as echarts from "echarts";

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
        data: [],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            textStyle: {
                color: '#fff' // 修改x轴的字体颜色为蓝色
            }
        }
    },
    yAxis: {
        name: "条",
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#fff' // 修改x轴的字体颜色为蓝色
            }
        }
    },
    series: [
        {
            name: '产品备案',
            data: [],
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                    ])
                }
            },
        },
        {
            name: '审批通过',
            data: [],
            type: 'line',
        }
    ]
}