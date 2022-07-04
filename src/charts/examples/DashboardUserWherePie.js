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
        trigger: "item",
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
        top: 60,
        right: 10,
        bottom: 10,
        left: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        containLabel: true
    },
    xAxis: {
        show: false,
        name: null,
        type: "category",
        data: [
            "江苏",
            "浙江",
            "上海",
            "北京",
            "安徽",
            "山东",
            "河南"
        ],
        nameLocation: "end",
        nameTextStyle: {
            color: null,
            fontSize: 12
        },
        nameRotate: null,
        boundaryGap: true,
        axisLine: {
            show: true,
            symbol: "none",
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid",
                opacity: 1
            }
        },
        axisTick: {
            show: true,
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
            color: null,
            fontSize: 12
        },
        splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
                color: "#ccc",
                width: 1,
                type: "solid",
                opacity: 1
            }
        }
    },
    yAxis: {
        show: false,
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
            show: true,
            symbol: "none",
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid",
                opacity: 1
            }
        },
        axisTick: {
            show: true,
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
            showMinLabel: false,
            showMaxLabel: false,
            color: null,
            fontSize: 12
        },
        splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
                color: "#ccc",
                width: 1,
                type: "solid",
                opacity: 1
            }
        }
    },
    series: [
        {
            name: "分布",
            data: [
                {
                    name: "江苏",
                    value: 736
                },
                {
                    name: "浙江",
                    value: 627
                },
                {
                    name: "上海",
                    value: 109
                },
                {
                    name: "北京",
                    value: 444
                },
                {
                    name: "安徽",
                    value: 644
                },
                {
                    name: "山东",
                    value: 550
                },
                {
                    name: "河南",
                    value: 564
                }
            ],
            type: "pie",
            roseType: "radius",
            center: [
                "50%",
                "50%"
            ],
            radius: [
                "39%",
                "74%"
            ],
            label: {
                show: true,
                position: "outside",
                formatter: "{b}：{d}%",
                color: null,
                fontSize: 12
            },
            labelLine: {
                show: true,
                length: 10,
                "length2": 10,
                smooth: false
            },
            itemStyle: {
                color: null,
                borderColor: null,
                borderRadius: 1,
                borderWidth: null,
                borderType: null,
                borderDashOffset: null,
                borderCap: null,
                borderJoin: null
            }
        }
    ]
}
