/**
 * 防抖
 * @param {function} executor 要执行的函数引用
 * @param {int} delay 多长时后间才执行，单位：毫秒
 * @return {function} 返回一个函数引用，调用后如果超过指定时间则执行，频繁调用则不会执行
 */
function debounce(executor, delay = 1000) {
    let taskId = null
    return function () {
        if (taskId) {
            window.clearTimeout(taskId)
        }
        taskId = window.setTimeout(executor, delay, ...arguments)
    }
}

/**
 * 节流
 * @param {function} executor 要执行的函数引用
 * @param {int} delay 间隔多长时后间才能继续执行，单位：毫秒
 * @return {function} 返回一个函数引用，频繁调用后如果超过指定时间才能继续执行
 */
function throttle(executor, delay = 500) {
    let beginTime = new Date().getTime()
    return function () {
        let currentTime = new Date().getTime()
        if (currentTime - beginTime >= delay) {
            executor(...arguments)
            beginTime = currentTime
        }
    }
}

/**
 * 轮询
 * @param {function} executor 要执行的返回值为Promise的函数
 * @param {int} interval 执行时间间隔，单位：毫秒
 * @return {function} 返回一个关闭这个轮询任务的函数
 */
function loop(executor, interval = 1000) {
    let id

    async function run() {
        await executor().catch((error) => {
            console.error(error)
        })
        if (id !== null) {
            id = window.setTimeout(run, interval)
        }
    }

    run()
    return function () {
        window.clearTimeout(id)
        id = null
    }
}

export {
    debounce,
    throttle,
    loop
}
