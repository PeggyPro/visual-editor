/*
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2024-09-03 20:23:58
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-04 16:25:56
 * @FilePath: \visual-editor\src\api\market\http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios,{AxiosResponse} from 'axios'
import { ElMessage } from 'element-plus'
import { useMarketStore } from "@/store";
const $market = axios.create({
  baseURL: import.meta.env.VITE_MARKET,
  transformRequest: (data, headers) => {
    headers.set('authorization', useMarketStore().getToken());
    headers.set('Content-Type', 'application/json')
    return JSON.stringify(data)
  }
})

$market.interceptors.response.use(res => {
  return res
}, err => {
  const res = err.response as AxiosResponse
  if (res?.status > 300 && res.data.message) {
    if (res.status === 401) return;
    ElMessage({
      message: res.data.message,
      type: 'error'
    })
  } else {
    ElMessage({
      message: '服务器响应失败，请稍后再试',
      type: 'error'
    })
  }
})

export {$market}
