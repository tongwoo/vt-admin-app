<!--
功能：数字跳动
日期：2022-08-03
-->
<template>
    <span ref="el"></span>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {CountUp} from 'countup.js';

let countUp = null;
const el = ref(null);
//属性
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    option: {
        type: Object,
        default() {
            return {};
        }
    }
});

//默认配置
const defaultOption = {
    startVal: 0, // number to start at (0)
    decimalPlaces: 0, // number of decimal places (0)
    duration: 3, // animation duration in seconds (2)
    useGrouping: false, // example: 1,000 vs 1000 (true)
    useEasing: true, // ease animation (true)
    smartEasingThreshold: 999, // smooth easing for large numbers above this if useEasing (999)
    smartEasingAmount: 333, // amount to be eased for numbers above threshold (333)
    separator: ',', // grouping separator (',')
    decimal: '.', // decimal ('.')
    // easingFn: easing function for animation (easeOutExpo)
    //easingFn: (t: number, b: number, c: number, d: number) => number,
    //formattingFn: (n: number) => string, // this function formats result
    prefix: '', // text prepended to result
    suffix: '', // text appended to result
    numerals: [], // numeral glyph substitution
    enableScrollSpy: false, // start animation when target is in view
    scrollSpyDelay: 0, // delay (ms) after target comes into view
    scrollSpyOnce: true // run only once
};

watch(
    () => props.modelValue,
    () => {
        countUp.update(props.modelValue);
    }
);

onMounted(() => {
    const option = Object.assign(defaultOption, props.option);
    countUp = new CountUp(el.value, props.modelValue, option);
    countUp.start();
});
</script>
