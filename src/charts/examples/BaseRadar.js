/**
 * 功能：基础雷达图
 * 作者：tongwoo
 * 日期：2022-03-09
 */
export default {
    title: {
        text: '基础雷达图',
        top: 10,
        left: 10,
        textStyle: {
            fontSize: 14
        }
    },
    radar: {
        indicator: [
            {name: '攻击', max: 100},
            {name: '魔法', max: 100},
            {name: '道术', max: 100},
            {name: '防御', max: 100},
            {name: '魔防', max: 100},
            {name: '道防', max: 100}
        ]
    },
    series: [
        {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
                {
                    value: [69, 56, 88, 46, 89, 45],
                    name: 'Allocated Budget'
                },
            ]
        }
    ]
}
