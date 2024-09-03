/*
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2023-11-30 14:01:28
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2023-11-30 14:40:14
 * @FilePath: \visual-editor\src\editor\components\right-attribute-panel\components\baseData\useBaseData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DeviceAPI from "@/api/device";
import * as Common from "@/common";
import { reactive, ref } from "vue";


export const useBaseData = () => {
    const state = reactive({
        bindType: 'static',
        static: '',
        dynamic: '',
        device: '',
        groupId: '0'
    })

    const projectOptions = ref<any>([]);
    const groupOptions = ref<any>([]);

    const bindOptions:any[] = [
        { value: 'static', label: '静态数据' }, 
        { value: 'dynamic', label: '动态数据'}, 
        { value: 'device', label: '设备数据'}
    ]

    const getGroupList = (groupId: string) => {
        DeviceAPI.getGroupList({ current_page: Common.DEFAULT_API_CURRENT_PAGE, per_page: Common.DEFAULT_API_PER_PAGE, parent_id: groupId })
            .then(({ data: result }) => {
                if (result.code === 200) {
                    console.log('getGroupList', result)
                    const { data } = result;
                    groupOptions.value = data.list.map((item: any) => ({ value: item.id, label: item.name }))
                }
            })
    }

    const handleChangeGroup = (value: string) => {
        console.log('handleChangeGroup', value)
        state.groupId = value;
        getGroupList(value);
    }


    return {
        state,
        bindOptions,
        groupOptions,
        getGroupList,
        handleChangeGroup
    }
}