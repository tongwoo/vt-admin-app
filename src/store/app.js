/**
 * 功能：设置相关
 * 日期：2022-02-22
 */
import i18n from "@/languages/index.js";
import {updateObject} from "@/common/utils/object.js";

export default {
    namespaced: true,
    state() {
        return {
            //语言
            language: null,
            //导航器
            navigator: {
                //是否折叠
                collapse: false,
                //页面小于多少宽度折叠菜单
                size: 1366,
                width: {
                    current: null,
                    max: 350,
                    min: 236,
                }
            }
        }
    },
    mutations: {
        /**
         * 切换导航菜单
         * @param {Object} state 状态
         * @param {boolean|null} collapse 是否折叠
         */
        TOGGLE_NAVIGATOR(state, collapse = null) {
            if (collapse === null) {
                state.navigator.collapse = !state.navigator.collapse;
            } else {
                state.navigator.collapse = collapse;
            }
        },
        /**
         * 更新宽度
         * @param state
         * @param {number} width 宽度
         */
        UPDATE_WIDTH(state, width) {
            state.navigator.width.current = width;
        },
        /**
         * 更新语言
         * @param state
         * @param lang
         * @constructor
         */
        UPDATE_LANGUAGE(state, lang) {
            i18n.global.locale = state.language = lang;
        }
    },
}
