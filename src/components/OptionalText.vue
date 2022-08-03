<!--
功能：在值为 null,undefined 的时候显示默认文本
日期：2022-03-09
-->
<template>
    {{ content }}
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    modelValue: [String, Number],
    //值不符合规则显示的替换文本，默认为 "-"
    text: {
        type: [String, Number],
        default: '-'
    }
});

const content = computed(() => {
    if (props.modelValue === null || props.modelValue === undefined) {
        return props.text;
    }
    return props.modelValue;
});

</script>
