/**
 * 功能：状态存储
 */
import {createStore} from "vuex";
import user from "./UserInfo.js";
import setting from "./AppSetting.js";
import keepalive from "./KeepAlive.js";
import {readAuthorization} from "@/common/utils/authorize.js";
import i18n from "@/languages/Index.js";
import {updateObject} from "@/common/utils/object.js";

const store = createStore({
    state() {
        return {
            //本地数据是否已经同步
            synced: false,
            //消息
            message: {
                //未读数
                unread: 3,
                //总数
                total: 0
            }
        };
    },
    getters: {
        /**
         * 是否登录了
         * @param state
         * @returns {boolean}
         */
        isLogin(state) {
            return state.user.authorization !== null;
        }
    },
    mutations: {
        /**
         * 更新消息未读数
         * @param state
         * @param {int} number 未读数量
         */
        MESSAGE_UPDATE_UNREAD(state, number) {
            state.message.unread = number;
        },
        /**
         * 读取本地存储的信息同步到Store
         * @param state
         */
        LOCAL_SYNC(state) {
            //设置为已同步，路由守卫不会再次进行同步处理
            state.synced = true;
            //本地信息
            const localData = localStorage.getItem('localStore');
            if (localData === null) {
                return;
            }
            const localState = JSON.parse(localData);
            if (localState instanceof Object) {
                updateObject(state, localState)
            }
            //恢复语言设置
            if (store.state.setting.language !== null) {
                i18n.global.locale = store.state.setting.language;
            }
            //恢复授权信息
            store.state.user.authorization = readAuthorization();
        },
        /**
         * 清空
         * @param {Object} state
         */
        CLEANUP(state) {
            localStorage.removeItem('localStore');
            //用户
            state.user.authorization = null;
            state.user.nickname = null;
            state.user.avatar = null;
            state.user.permissions = [];
            //组件缓存
            state.keepalive.componentNames = [];
        }
    },
    modules: {
        user,
        setting,
        keepalive,
    }
});

/**
 * 在每次提交Mutation后保存到localStorage
 */
store.subscribe((mutation, state) => {
    //忽略的Mutation列表，有些Mutation是不需要处理的
    const ignoreMutations = [
        'LOCAL_SYNC',
        'CLEANUP',
    ];
    if (ignoreMutations.indexOf(mutation.type) !== -1) {
        return;
    }
    localStorage.setItem('localStore', JSON.stringify(state));
});

export default store;
