import axios from "./interceptor/http";

export default {

    /**
     * 获取分组列表 不需要了
     * @param data 
     * @returns 
     */
    getGroupList: (data: any) => {
        const page = data.current_page;
        const page_size = data.per_page;
        const parent_id = data.parent_id;
        return axios.request({
            url: `/device/group?page=${page}&page_size=${page_size}&parent_id=${parent_id}`,
            method: 'get',
            data
        })
    },
    
    /**
     * 获取设备列表
     * @param data 
     * @returns 
     */
    getDeviceList: () => {
        return axios.request({
            url: '/device/tenant/list',
            method: 'get',
        })
    },

    /**
     * 根据设备Id获取属性、遥测、事件等
     * @param data 
     * @returns 
     */
    getdeviceMetricsList: (data: any) => {
        return axios.request({
            url: `/device/metrics/${data}`,
            method: 'get',
        })
    }
}