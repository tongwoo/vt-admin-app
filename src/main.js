import {createApp} from 'vue';
import router from './routes/index.js';
import vuex from './store/index.js';
import i18n from "@/languages/index.js";
import App from './App.vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import vHas from "@/directives/v-has.js";
import 'nprogress/nprogress.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/element.scss';
import './assets/styles/element-patch.scss';
import './assets/styles/app.scss';

const app = createApp(App);

//路由
app.use(router);
//状态存储
app.use(vuex);
//国际化
app.use(i18n);
//饿了么UI
app.use(ElementPlus, {
    locale: zhCn,
});
//权限检测指令
app.directive('has', vHas);

app.mount('#app');
