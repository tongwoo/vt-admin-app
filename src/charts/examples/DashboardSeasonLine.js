/**
 * 功能：图表功能名称
 * 作者：
 * 日期：2022-07-04
 */
export default {
    background: "transparent",
    title: {
        show: false,
        text: "标题",
        left: "auto",
        top: "auto",
        textStyle: {
            color: "#333",
            fontSize: 18
        }
    },
    tooltip: {
        show: true,
        appendToBody: true,
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        },
        position: null
    },
    toolbox: {
        show: false,
        itemSize: 15,
        itemGap: 8,
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto",
        feature: {
            dataZoom: {
                yAxisIndex: "none"
            },
            dataView: {
                readOnly: false
            },
            magicType: {
                type: [
                    "line",
                    "bar"
                ]
            },
            restore: [],
            saveAsImage: []
        }
    },
    legend: {
        show: false,
        left: "center",
        top: "auto",
        itemWidth: 25,
        itemHeight: 14,
        icon: null,
        textStyle: {
            color: "#000000"
        }
    },
    textStyle: {
        color: null,
        fontFamily: "微软雅黑",
        fontSize: 12
    },
    grid: {
        show: false,
        top: 10,
        right: 30,
        bottom: 10,
        left: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        containLabel: true
    },
    xAxis: {
        show: true,
        name: null,
        type: "category",
        data: [
            "第一季度",
            "第二季度",
            "第三季度",
            "第四季度"
        ],
        nameLocation: "end",
        nameTextStyle: {
            color: null,
            fontSize: 12
        },
        nameRotate: null,
        boundaryGap: false,
        axisLine: {
            show: false,
            symbol: "none",
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid",
                opacity: 1
            }
        },
        axisTick: {
            show: false,
            length: 5,
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid",
                opacity: 1
            }
        },
        axisLabel: {
            show: true,
            rotate: 0,
            showMinLabel: true,
            showMaxLabel: true,
            color: "#90969A",
            fontSize: 12
        },
        splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
                color: "#EEEEEE",
                width: 1,
                type: "solid",
                opacity: 1
            }
        }
    },
    yAxis: {
        show: true,
        name: null,
        type: "value",
        data: [],
        nameLocation: "end",
        nameTextStyle: {
            color: null,
            fontSize: 12
        },
        nameRotate: null,
        axisLine: {
            show: false,
            symbol: "none",
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid",
                opacity: 1
            }
        },
        axisTick: {
            show: false,
            length: 5,
            lineStyle: {
                color: "#D2D2D2",
                width: 0,
                type: "solid",
                opacity: 1
            }
        },
        axisLabel: {
            show: true,
            rotate: 0,
            showMinLabel: false,
            showMaxLabel: false,
            color: "#8E8E8E",
            fontSize: 12
        },
        splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
                color: "#EEEEEE",
                width: 1,
                type: "solid",
                opacity: 1
            }
        }
    },
    series: [
        {
            name: "交易量",
            data: [
                437,
                438,
                593,
                328
            ],
            type: "line",
            smooth: false,
            symbol: "emptyCircle",
            symbolSize: 4,
            showSymbol: false,
            itemStyle: {
                color: null,
                borderColor: null,
                borderWidth: null,
                borderType: null,
                borderDashOffset: null,
                borderCap: null,
                borderJoin: null
            },
            lineStyle: {
                color: "#FF5667",
                width: 2,
                type: "solid",
                dashOffset: null,
                cap: null,
                join: null
            },
            areaStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    "x2": 0,
                    "y2": 1,
                    colorStops: [
                        {
                            offset: 0.44,
                            color: "#FF5667FF"
                        },
                        {
                            offset: 0.85,
                            color: "#FF566700"
                        }
                    ]
                },
                opacity: 0.11
            }
        }
    ]
}
