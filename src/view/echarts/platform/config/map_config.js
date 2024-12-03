export const config = {
    visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
            color: ['#0862db', '#ffe700', '#ff0000'] //['#ff0000', '#ffe700', '#006edd']
        }
    },
    tooltip: {
        show: true,
        triggerOn: "mousemove",   //mousemove、click
        padding: [4, 8],
        borderWidth: 1,
        borderColor: '#409eff',
        backgroundColor: 'rgba(255,255,255,0.7)',
        textStyle: {
            color: '#000000',
            fontSize: 13
        },
        formatter: function (e) {
            return `${e.name}: ${e.value}`;
        }
    },
    geo: [
        // 第二层
        {
            map: "China",
            z: 2,
            zoom: 1.2,
            aspectScale: 0.85,
            roam: false,
            silent: true,
            top: '10%',
            layoutSize: "100%", //保持地图宽高比
            regions: [
                { // 隐藏南海诸岛,因为顶层已经添加过了
                    name: '南海诸岛',
                    itemStyle: {
                        opacity: 0 // 为 0 时不绘制该图形
                    },
                    label: {
                        show: false
                    }
                }
            ],
            itemStyle: {
                borderColor: '#d8feff',
                borderWidth: 3,
                shadowBlur: 10,
                shadowColor: '#22a1ff',
                areaColor: '#0862db',
                shadowOffsetX: 0,
                shadowOffsetY: 8
            },
        },
        // 第三层
        {
            map: "China",
            z: 1,
            zoom: 1.2,
            aspectScale: 0.85,
            top: '11.5%',
            silent: true,
            layoutSize: "100%", //保持地图宽高比
            itemStyle: {
                borderColor: '#c8feff',
                borderWidth: 1,
                shadowBlur: 0,
                shadowColor: '#99c4ff',
                areaColor: '#4ebaff',
            },
            regions: [
                { // 隐藏南海诸岛,因为顶层已经添加过了
                    name: '南海诸岛',
                    itemStyle: {
                        opacity: 0 // 为 0 时不绘制该图形
                    },
                    label: {
                        show: false
                    }
                }
            ],
        },
        // 第四层
        {
            map: "China",
            z: 0,
            zoom: 1.2,
            aspectScale: 0.85,
            top: '12%',
            silent: true,
            layoutSize: "100%", //保持地图宽高比
            itemStyle: {
                borderColor: '#66edff',
                borderWidth: 2,
                shadowBlur: 20,
                shadowColor: '#4d99ff',
                areaColor: '#1752ad',
                shadowOffsetX: 0,
                shadowOffsetY: 8
            },
            regions: [
                { // 隐藏南海诸岛,因为顶层已经添加过了
                    name: '南海诸岛',
                    itemStyle: {
                        opacity: 0 // 为 0 时不绘制该图形
                    },
                    label: {
                        show: false
                    }
                }
            ],
        },
    ],
    series: [
        {
            map: 'China',
            type: 'map',
            z: 3,
            zoom: 1.2,
            aspectScale: 0.85,
            roam: false,
            top: '10%',
            layoutSize: "100%",
            data: [
                {name: "北京市", value: 0},
                {name: "天津市", value: 0},
                {name: "河北省", value: 0},
                {name: "山西省", value: 0},
                {name: "内蒙古自治区", value: 0},
                {name: "辽宁省", value: 0},
                {name: "吉林省", value: 0},
                {name: "黑龙江省", value: 0},
                {name: "上海市", value: 0},
                {name: "江苏省", value: 0},
                {name: "浙江省", value: 0},
                {name: "安徽省", value: 0},
                {name: "福建省", value: 0},
                {name: "江西省", value: 0},
                {name: "山东省", value: 0},
                {name: "河南省", value: 0},
                {name: "湖北省", value: 0},
                {name: "湖南省", value: 0},
                {name: "广东省", value: 0},
                {name: "广西壮族自治区", value: 0},
                {name: "海南省", value: 0},
                {name: "重庆市", value: 0},
                {name: "四川省", value: 0},
                {name: "贵州省", value: 0},
                {name: "云南省", value: 0},
                {name: "西藏自治区", value: 0},
                {name: "陕西省", value: 0},
                {name: "甘肃省", value: 0},
                {name: "青海省", value: 0},
                {name: "宁夏回族自治区", value: 0},
                {name: "新疆维吾尔自治区", value: 0},
                {name: "香港特别行政区", value: 0},
                {name: "澳门特别行政区", value: 0},
                {name: "台湾省", value: 0}
            ],
            regions: [
                { // 隐藏南海诸岛,因为顶层已经添加过了
                    name: '南海诸岛',
                    itemStyle: {
                        borderWidth: 0.5,
                        shadowBlur: 0,
                        borderColor: '#61aacb',
                        areaColor: '#104584'
                    }
                }
            ],
            itemStyle: {
                borderColor: '#c8feff',
                borderWidth: 0.5,
                shadowBlur: 3,
                shadowColor: '#66edff',
                areaColor: '#0862db'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    borderWidth: 1,
                    areaColor: '#2da9ff',
                },
                label: {
                    show: false,
                    color: '#ffffff',
                }
            },
            select: {
                itemStyle: {
                    shadowBlur: 10,
                    borderWidth: 1,
                    areaColor: '#2da9ff',
                },
                label: {
                    color: '#ffffff',
                }
            }
        }
    ]
}