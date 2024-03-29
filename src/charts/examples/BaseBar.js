/**
 * 功能：基础柱形图
 * 作者：tongwoo
 * 日期：2022-03-09
 */
export default {
    tooltip: {
        trigger: 'axis'
    },
    title: {
        left: 'center',
        text: '基础柱形图',
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
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar'
        },
        {
            data: [420, 532, 501, 534, 790, 830, 720],
            type: 'bar'
        }
    ]
}
