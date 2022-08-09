/**
 * 是否存在指定权限指令
 */
import {checkAccess} from "@/utils/authorize.js";

export default {
    /**
     * @param {Element} el
     * @param {{instance,value}} binding
     */
    mounted(el, binding) {
        //如果没有权限则移除此元素
        if (!checkAccess(binding.value)) {
            el.parentElement.removeChild(el);
        }
    }
}
