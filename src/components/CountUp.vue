<!--
功能：数字跳动
日期：2022-08-03
-->
<template>
    <span ref="el"></span>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {CountUp} from 'countup.js'

let countUp = null
const el = ref(null)
//属性
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    option: {
        type: Object,
        default() {
            return {}
        }
    }
})

//默认配置
const defaultOption = {
    startVal: 0, // 起始值
    decimalPlaces: 0, // 几位小数
    duration: 2, // 动画时长，秒
    useGrouping: false, // 是否进行分组，比如千进制逗号分隔
    useEasing: true, // 是否平滑动画
    smartEasingThreshold: 999, // smooth easing for large numbers above this if useEasing (999)
    smartEasingAmount: 333, // amount to be eased for numbers above threshold (333)
    separator: ',', // 分组分隔符
    decimal: '.', // 小数分隔符
    // easingFn: easing function for animation (easeOutExpo)
    //easingFn: (t: number, b: number, c: number, d: number) => number,
    //formattingFn: (n: number) => string, // this function formats result
    prefix: '', // 前缀
    suffix: '', // 后缀
    numerals: [], // numeral glyph substitution
    enableScrollSpy: false, // start animation when target is in view
    scrollSpyDelay: 0, // 滚动条滚动到的时候延迟多少毫秒开始动画
    scrollSpyOnce: true // 是否运行一次（滚动条）
}

watch(
    () => props.modelValue,
    () => {
        countUp.update(props.modelValue)
    }
)

onMounted(() => {
    countUp = new CountUp(el.value, props.modelValue, {
        ...defaultOption,
        ...props.option
    })
    countUp.start()
})
</script>
