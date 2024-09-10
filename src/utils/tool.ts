
import { ElMessage } from 'element-plus'

const message = {
    success: (msg: string) => {
        ElMessage({
            message: msg,
            type: 'success',
        })
    },
    error: (msg: string) => {
        ElMessage({
            message: msg,
            type: 'error',
        })
    }
}
/**
 * 解析URL参数
 * @returns 
 */
const parseParams = () => {
    const queryString = window.location.search;
    if (queryString) {
        const queryStringArray = queryString.split("?")[1].split("&");
        let params: any = {}
        queryStringArray.forEach((item) => {
            const [key, value] = item.split("=");
            params[key] = value;
        });
        return params;
    }
    return {};
}

/**
 * 生成随机字符串
 * @param len 
 * @returns 
 */
const randomString = (len?: number) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * 判断字符串是否是JSON字符串
 * @param str
 * @returns 返回JSON对象或者false
 */
const isJSON = (str: string) => {
    if (typeof str === 'string') {
        try {
            let obj = JSON.parse(str);
            return obj;
        } catch (e) {
            return false;
        }
    }
}

/**
 * 判断对象是否是数组
 * @param obj
 * @returns
 */
const isArray = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 判断是否为空
 */
const isEmpty = (obj: object | string): boolean => {
    return (typeof obj === 'undefined' || obj === null || obj === '' || obj === '{}');
}

/**
 * 解析JSON数据
 * @param str
 * @returns
 */
const parseJSONData = (str: string) => {
    const jsonObj = isJSON(str);
    if (jsonObj) {
        return jsonObj;
    }
    return {
        style: {},
        data: {}
    };
}

/**
 * 读取文件
 * @param raw
 */
const readFile = (raw: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // onload 事件处理程序，在 FileReader 对象读取文件内容后触发
        reader.onload = (event: any) => {
            const result = event.target.result;
            const data = decodeURIComponent(escape(result));
            resolve(data);
        };
        // 读取文件内容
        reader.readAsBinaryString(raw)
    })

}

const exportFile = (fileName: string, content: string) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

const ColorToHex = (color: any) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

/**
 * rgb转hex
 * @param rgba
 * @returns
 */
const rgbtoHex = (rgba: String) => {
    const color = rgba.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    const red = color ? parseInt(color[1]) : 0;
    const green = color ? parseInt(color[2]) : 0;
    const blue = color ? parseInt(color[3]) : 0;
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

const dateFormat = (timestamp: string | number) => {
    if (!timestamp) return "";
    if (timestamp.toString().length === 10) {
        timestamp = Number(timestamp) * 1000;
    } else if (timestamp.toString().length === 13) {
        timestamp = timestamp;
    } else if (timestamp.toString().length === 16) {
        timestamp = timestamp.toString().substring(0, 13);
    } else {
        return "";
    }
    var n = Number(timestamp);
    var D = new Date(n);
    var year = D.getFullYear(); //四位数年份

    var month = D.getMonth() + 1; //月份(0-11),0为一月份
    month = month < 10 ? "0" + month : month;

    var day = D.getDate(); //月的某一天(1-31)
    day = day < 10 ? "0" + day : day;

    var hours = D.getHours(); //小时(0-23)
    hours = hours < 10 ? "0" + hours : hours;

    var minutes = D.getMinutes(); //分钟(0-59)
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var seconds = D.getSeconds(); //秒(0-59)
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // var week = D.getDay();//周几(0-6),0为周日
    // var weekArr = ['周日','周一','周二','周三','周四','周五','周六'];

    var now_time =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    return now_time;
}

async function copyToClipboard(text: string) {
    try {
        return navigator.clipboard.writeText(text)
    } catch {
        const element = document.createElement('textarea')
        const previouslyFocusedElement = document.activeElement

        element.value = text

        // Prevent keyboard from showing on mobile
        element.setAttribute('readonly', '')

        element.style.contain = 'strict'
        element.style.position = 'absolute'
        element.style.left = '-9999px'
        element.style.fontSize = '12pt' // Prevent zooming on iOS

        const selection = document.getSelection()
        const originalRange = selection
            ? selection.rangeCount > 0 && selection.getRangeAt(0)
            : null

        document.body.appendChild(element)
        element.select()

        // Explicit selection workaround for iOS
        element.selectionStart = 0
        element.selectionEnd = text.length

        document.execCommand('copy')
        document.body.removeChild(element)

        if (originalRange) {
            selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
            selection!.addRange(originalRange)
        }

        // Get the focus back on the previously focused element, if any
        if (previouslyFocusedElement) {
            ; (previouslyFocusedElement as HTMLElement).focus()
        }
    }
}


const proxyToPlainObject = <T extends Object>(proxy: T): T => {
    const plainObject: any = JSON.parse(JSON.stringify(proxy))
    return plainObject as T;
}

export { 
    message, 
    parseParams, 
    randomString, 
    isJSON, 
    isEmpty, 
    parseJSONData, 
    readFile, 
    exportFile, 
    isArray, 
    rgbtoHex, 
    copyToClipboard, 
    dateFormat,
    proxyToPlainObject
 }

