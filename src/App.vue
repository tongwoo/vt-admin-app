<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>
<script setup>
import {useStore} from "vuex"
import {computed, onMounted} from "vue"
import zhCN from "element-plus/es/locale/lang/zh-cn"
import enUS from "element-plus/es/locale/lang/en"

const store = useStore()

//使用哪种语言，默认导入了中文和英文
const locale = computed(() => {
    const language = store.state.setting.language
    if (language === 'en-US') {
        return enUS
    }
    return zhCN
})

onMounted(() => {
    document.body.removeChild(document.querySelector('.loading-mask'))
})
</script>
