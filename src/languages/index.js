/**
 * 功能：多语言入口
 * 日期：2022-05-30
 */
import {createI18n} from 'vue-i18n/dist/vue-i18n.cjs.js';
import zhCN from './zh-CN/index.js';
import enUS from './en-US/index.js';

export default createI18n({
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages: {
        'en-US': enUS.message,
        'zh-CN': zhCN.message
    }
});
