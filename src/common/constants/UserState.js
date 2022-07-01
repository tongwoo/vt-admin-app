/**
 * 功能：状态
 * 作者：tongwoo
 * 日期：2022-06-14
 */

/**
 * 启用
 * @type {string|int}
 */
const USER_STATE_ENABLED = 1;
/**
 * 禁用
 * @type {string|int}
 */
const USER_STATE_DISABLED = 0;

/**
 * 状态数据项列表
 * @return {Array<{name:string,value:string|int}>}
 */
function getUserStates() {
    return [
        {
            name: '启用',
            value: USER_STATE_ENABLED,
        },
        {
            name: '禁用',
            value: USER_STATE_DISABLED,
        },
    ];
}

/**
 * 获取状态名称
 * @param {string|int} value 要获得名称的值
 * @return {string|null}
 */
function getUserStateNameByValue(value) {
    const item = getUserStates().find(item => item.value === value)?.name;
    return item ? item.name : null;
}

/**
 * 获取状态使用的样式Class
 * @param {string|int} value 值
 * @return {string|null}
 */
function getUserStateClassByValue(value) {
    if (value === USER_STATE_ENABLED) {
        return 'state-enabled';
    } else if (value === USER_STATE_DISABLED) {
        return 'state-disabled';
    } else {
        return null;
    }
}

export {
    USER_STATE_ENABLED,
    USER_STATE_DISABLED,
    getUserStates,
    getUserStateNameByValue,
    getUserStateClassByValue,
}
