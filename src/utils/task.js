/**
 * 防抖
 * @param {function} handler 要执行的函数引用
 * @param {int} delay 多长时后间才执行，单位：毫秒
 * @return {function} 返回一个函数引用，调用后如果超过指定时间则执行，频繁调用则不会执行
 */
export function debounce(handler, delay = 1000) {
    let taskId = null
    return function () {
        if (taskId) {
            window.clearTimeout(taskId)
        }
        taskId = window.setTimeout(handler, delay, ...arguments)
    }
}

/**
 * 节流
 * @param {function} handler 要执行的函数引用
 * @param {int} delay 间隔多长时后间才能继续执行，单位：毫秒
 * @return {function} 返回一个函数引用，频繁调用后如果超过指定时间才能继续执行
 */
export function throttle(handler, delay = 500) {
    let beginTime = new Date().getTime()
    return function () {
        let currentTime = new Date().getTime()
        if (currentTime - beginTime >= delay) {
            handler(...arguments)
            beginTime = currentTime
        }
    }
}

/**
 * 轮询
 * @param {function} handler 要执行的返回值为Promise的函数
 * @param {int} interval 执行时间间隔，单位：毫秒
 * @param {boolean} now 是否立即执行
 * @return {function} 返回一个关闭这个轮询任务的函数
 */
export function loop(handler, interval = 1000, now = false) {
    let id

    async function run() {
        await handler()
        if (id !== null) {
            id = window.setTimeout(run, interval)
        }
    }

    if (now) {
        run()
    } else {
        id = window.setTimeout(run, interval)
    }
    return function () {
        window.clearTimeout(id)
        id = null
    }
}

/**
 * 睡眠
 * @param {number} timeout 时长，单位：毫秒
 * @returns {Promise}
 */
export function sleep(timeout = 1000) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, timeout)
    })
}
