/**
 * 功能：RBAC
 * 作者：tongwoo
 * 日期：2022-06-14
 */
import http from "@/common/utils/http.js";

function fetchRules() {
    return http.get(
        '/permission/rules'
    ).then((response) => {
        return response.data.data.items;
    });
}

export {
    fetchRules
}
