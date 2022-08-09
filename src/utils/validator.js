/**
 * 是否是复杂密码
 * @param {string} password 密码字符串
 * @return {boolean}
 */
function isComplexPassword(password) {
    //不能包含空格
    if (password.indexOf(' ') !== -1) {
        return false
    }
    //必须8-30个字符
    if (!(password.length >= 8 && password.length <= 30)) {
        return false
    }
    //匹配次数
    let matched = 0
    //检测是否包含了特殊字符
    if (specialCharExists(password)) {
        matched += 1
    }
    //检测是否包含了大写字母
    if (upperCharExists(password)) {
        matched += 1
    }
    //检测是否包含了小写字母
    if (lowerCharExists(password)) {
        matched += 1
    }
    //检测是否包含了数字
    if (numberExists(password)) {
        matched += 1
    }
    //密码规则为：密码长度为8-30个字符；必须包含大写字母、小写字母、数字及特殊符号4种字符；不能包含空格
    return matched === 4
}

/**
 * 是否存在键盘上出现的特殊字符
 * @param {string} content 验证的字符串
 * @return {boolean}
 */
function specialCharExists(content) {
    const chars = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', ':', '"', ';', '\'', '<', '>', ',', '.', '?', '/', '\\', '|']
    for (let str of content) {
        if (chars.indexOf(str) !== -1) {
            return true
        }
    }
    return false
}

/**
 * 是否存在大写英文字母
 * @param {string} content 验证的字符串
 * @return {boolean}
 */
function upperCharExists(content) {
    return /[A-Z]/.test(content)
}

/**
 * 是否存在小写英文字母
 * @param {string} content 验证的字符串
 * @return {boolean}
 */
function lowerCharExists(content) {
    return /[a-z]/.test(content)
}

/**
 * 是否存在数值
 * @param {string} content 验证的字符串
 * @return {boolean}
 */
function numberExists(content) {
    return /[\d]/.test(content)
}


export {
    isComplexPassword,
    specialCharExists,
    upperCharExists,
    lowerCharExists,
    numberExists
}
