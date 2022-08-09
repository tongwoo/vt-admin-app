import moment from "moment";
import "moment/locale/zh-cn";

/**
 * 一分钟的秒数
 * @type {number}
 */
const ONE_MINUTE = 60;

/**
 * 一小时的秒数
 * @type {number}
 */
const ONE_HOUR = 3600;

/**
 * 一天的秒数
 * @type {number}
 */
const ONE_DAY = 86400;

/**
 * 一个星期的秒数
 * @type {number}
 */
const ONE_WEEK = 604800;

/**
 * 一个月的秒数
 * @type {number}
 */
const ONE_MONTH = 2592000;

/**
 * 当前格式化好的日期时间
 * @return {string}
 */
function currentDateText() {
    return moment().format('YYYY年MM月DD日 HH点mm分ss秒 dddd');
}

/**
 * 当前格式化好的日期时间
 * @return {string}
 */
function currentTimeText() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获得给定日期所在月的天数
 * @param {Date|string} date 日期,可为Date实例、日期字符串,不传则使用当前时间
 * @return {number}
 */
function dateDays(date) {
    if (date === undefined) {
        date = new Date();
    } else {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let days = 0;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 2:
            days = 28;
            //判断是否闰年
            if (year % 4 === 0) {
                days = 29;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
    }
    return days;
}

/**
 * 获得日期天数集合
 * @param {Date|string} date 日期,可为Date实例、日期字符串,不传则使用当前时间
 * @param {boolean} zero 是否补充前缀0
 * @return {Array}
 */
function dateDayItems(date = new Date(), zero = true) {
    const days = this.days(date);
    const items = [];
    for (let i = 1; i <= days; i++) {
        items.push(i < 10 ? '0' + i : String(i));
    }
    return items;
}

/**
 * 根据间隔分钟数来生成0点-24点的分钟段
 * @param {int} interval 间隔秒数,默认为1小时
 * @return {Array}
 */
function hourItems(interval = 3600) {
    const day = 86400;
    const items = [];
    let current = 0;
    while (current < day) {
        let hours = Math.floor(current / 3600);
        let minutes = Math.floor((current - hours * 3600) / 60);
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        items.push(hours + ':' + minutes);
        current += interval;
    }
    return items;
}

/**
 * 月数集合
 * @param {boolean} zero 是否填充0
 * @param {string} suffix 后缀，比如 “月”
 * @return {Array}
 */
function monthItems(zero = true, suffix = '') {
    const records = [];
    for (let i = 1; i <= 12; i++) {
        let record = i;
        if (zero && i < 10) {
            record = '0' + i;
        }
        if (suffix) {
            record = `${record}${suffix}`;
        }
        records.push(record);
    }
    return records;
}

/**
 * 生成以前指定的年份到现在的年份集合
 * @param {number} begin 起始年份
 * @param {number|undefined} end 结束年份，默认为当前年
 * @param {boolean} pair 是否键值对
 * @return {[number]}
 */
function yearRangeItems(begin = 2016, end = undefined, pair = true) {
    const current = end === undefined ? (new Date()).getFullYear() : end;
    const items = [];
    for (let year = begin; year <= current; year++) {
        if (pair) {
            items.push({
                label: year,
                value: year.toString(),
            });
        } else {
            items.push(year.toString());
        }
    }
    return items;
}

export {
    ONE_MINUTE,
    ONE_HOUR,
    ONE_DAY,
    ONE_WEEK,
    ONE_MONTH,
    currentDateText,
    currentTimeText,
    dateDays,
    dateDayItems,
    hourItems,
    monthItems,
    yearRangeItems,
}
