/**
 * 功能：确认
 * 作者：tongwoo
 * 日期：2022-06-13
 */

/**
 * 是
 * @type {string|int}
 */
const CONFIRM_YES = 1;

/**
 * 否
 * @type {string|int}
 */
const CONFIRM_NO = 0;

/**
 * 确认数据项列表
 * @return {Array<{name:string,value:string|int}>}
 */
function getConfirms() {
    return [
        {
            name: '是',
            value: CONFIRM_YES
        },
        {
            name: '否',
            value: CONFIRM_NO
        },
    ];
}

/**
 * 获取确认名称
 * @param {string|int} value 要获得名称的值
 * @return {string|null}
 */
function getConfirmNameByValue(value) {
    const item = getConfirms().find(item => item.value === value);
    return item ? item.name : null;
}

/**
 * 获取确认使用的样式
 * @param {string|int} value 值
 * @return {string|null}
 */
function getConfirmClassByValue(value) {
    if (value === CONFIRM_YES) {
        return 'confirm-yes';
    } else if (value === CONFIRM_NO) {
        return 'confirm-no';
    } else {
        return null;
    }
}

export {
    CONFIRM_YES,
    CONFIRM_NO,
    getConfirms,
    getConfirmNameByValue,
    getConfirmClassByValue,
}
