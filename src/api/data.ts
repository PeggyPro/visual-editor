import axios from './interceptor/http'

export default {
    //TODO:增加属性及事件数据查询
    /**
     * 通过设备id获取设备当前值
     * @param data 
     * @returns 
     */
    getCurrentValue: (data: any) => {
        const deviceid = data
        return axios.request({
            url: `telemetry/datas/current/${deviceid}`,
            method: 'get'
        })
    },

    /**
     * 通过设备id获取设备历史值
     * @param data 
     * @returns 
     */
    getHistory: (data: any) => {
        return axios.request({
            url: `telemetry/datas/history/pagination?device_id=${data.device_id}&key=${data.key}&start_time=${data.start_ts}&end_time=${data.end_ts}&export_excel=false`,
            method: 'get'
        })
    },

    /**
     * 手动控制设备即下发遥测
     * @param data 
     * @returns 
     */
    setDeviceValue: (data: any) => {
        return axios.request({
            url: 'telemetry/datas/pub',
            method: 'post',
            data
            /**
             * device_id string 设备id 必需
             * value string  or integer  or boolean  or array  or object {0}  or number  or null 指令 必需
             * 如："value": {"switch": false}
             */
        })
    }
}