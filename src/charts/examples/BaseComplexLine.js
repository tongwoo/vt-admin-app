/**
 * 功能：有点复杂的折线图
 * 作者：tongwoo
 * 日期：2022-03-09
 */
export default {
    tooltip: {
        trigger: 'axis'
    },
    title: {
        left: 'center',
        text: '有点复杂的折线图',
        top: 10,
        textStyle: {
            fontSize: 14
        }
    },
    grid: {
        top: 50,
        right: 30,
        bottom: 30,
        left: 70
    },
    xAxis:     {
        type: 'category',
        data: [
            '第1季度',
            '第2季度',
            '第3季度',
            '第4季度',
        ],
    },
    yAxis:     {
        type: 'value',
    },
    series: [
        {
            name: '序列1',
            data: [
                422,
                188,
                523,
                155,
            ],
            type: 'line',
            showSymbol: false,
            smooth: true,
            lineStyle:             {
                width: 1,
                type: 'solid',
            },
            itemStyle:             {
                borderRadius: 0,
                color: 'rgba(0, 132, 255, 1)',
            },
            areaStyle:             {
                color:                 {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0.1,
                            color: 'rgba(0, 132, 255, 0.17)',
                        },
                        {
                            offset: 0.9,
                            color: 'rgba(0, 132, 255, 1)',
                        },
                    ],
                },
            },
        },
    ],
}
