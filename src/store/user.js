/**
 * 功能：用户信息
 * 日期：2021-12-14
 */
import {updateObject} from "@/utils/object.js";

export default {
    namespaced: true,
    state() {
        return {
            //授权数据
            authorization: null,
            //昵称
            nickname: null,
            //头像(可直接访问的图片地址)
            avatar: null,
            //此用户拥有的权限列表
            permissions: [],
        }
    },
    mutations: {
        /**
         * 更新用户信息
         * @param {Object} state
         * @param {Object} payload 用户信息，state中出现的相关字段
         */
        UPDATE(state, payload) {
            updateObject(state, payload);
        },
    }
}
