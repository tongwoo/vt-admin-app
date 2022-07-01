/**
 * 功能：有点小复杂的饼图
 * 作者：tongwoo
 * 日期：2022-03-09
 */
export default {
    tooltip: {
        trigger: 'item',
        formatter: '<strong>{b}</strong>: {c} 占比: {d}%',
    },
    title: {
        left: 'center',
        text: '有点小复杂的饼图',
        top: 10,
        textStyle: {
            fontSize: 14
        }
    },
    series: [
        {
            name: '生产值',
            type: 'pie',
            data: [
                {
                    name: '第1季度',
                    value: 365,
                },
                {
                    name: '第2季度',
                    value: 295,
                },
                {
                    name: '第3季度',
                    value: 483,
                },
                {
                    name: '第4季度',
                    value: 586,
                },
            ],
            radius: [
                '40%',
                '60%',
            ],
            center: [
                '50%',
                '50%',
            ],
            roseType: 'area',
            label: {
                show: true,
                position: 'outside',
            },
            labelLine: {
                show: true,
                length: 6,
                length2: 13,
            },
            itemStyle: {
                borderRadius: 5,
            },
        },
    ],
}
