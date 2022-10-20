/**
 * 功能：持久化组件
 * 日期：2022-03-25
 */
export default {
    namespaced: true,
    state() {
        return {
            //要缓存的组件名称列表
            componentNames: []
        }
    },
    mutations: {
        /**
         * 添加要缓存的组件
         * @param state
         * @param {string} name 组件名
         */
        add(state, name) {
            if (state.componentNames.indexOf(name) !== -1) {
                return
            }
            state.componentNames.push(name)
        },
        /**
         * 移除缓存组件
         * @param state
         * @param {string} name 组件名
         */
        remove(state, name) {
            const index = state.componentNames.indexOf(name)
            if (index !== -1) {
                state.componentNames.splice(index, 1)
            }
        }
    }
}
