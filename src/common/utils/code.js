//正常
const CODE_OK = 200;

//服务端错误
const CODE_ERROR = 500;

//未授权
const CODE_UNAUTHORIZED = 401;

//无权限
const CODE_FORBIDDEN = 403;

/**
 * 检测Code是否正常无错误
 * @param code 代码值
 * @return {boolean}
 */
function isOk(code) {
    return code === CODE_OK || code === String(CODE_OK);
}

/**
 * 检测Code是否未授权
 * @param code 代码值
 * @return {boolean}
 */
function isUnauthorized(code) {
    return code === CODE_UNAUTHORIZED;
}

export {
    CODE_OK,
    CODE_ERROR,
    CODE_UNAUTHORIZED,
    CODE_FORBIDDEN,
    isOk,
    isUnauthorized,
}
