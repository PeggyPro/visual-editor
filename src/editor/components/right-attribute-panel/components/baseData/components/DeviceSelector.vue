<template>
    <!-- 设备数据 -->
    <el-collapse v-model="activeNames">
        <el-collapse-item name="device">
            <template #title>
                <div class="flex justify-between w-full items-center">
                    <span>设备 {{ index }}</span>
                    <el-icon class="header-icon mr-3" @click.stop="handleDelete">
                        <Delete />
                    </el-icon>
                </div>

            </template>
            <el-form>
                <!--<el-form-item label="选择项目">
                    <el-select filterable v-model="state.projectId" placeholder="选择项目">
                        <el-option v-for="item in projectOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>-->

                <!--<el-form-item label="选择分组">
                    <el-select filterable v-model="state.groupId" placeholder="选择分组">
                        <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>-->

                <!-- <el-form-item v-if="state.groupId" label="选择设备">
                    <el-select filterable v-model="state.deviceId" placeholder="选择设备">
                        <el-option v-for="item in deviceOptions" :key="item.value" 
                        :label="item.label + (item.pluginId ? ' [已绑定]' : '')" 
                        :value="item.value" />
                    </el-select>
                </el-form-item> -->

                <el-form-item label="选择设备">
                    <el-cascader ref="deviceRef" style="width: 100%;margin-right:10px" v-model="state.deviceId"
                        placeholder="选择设备" :options="options.deviceOptions" clearable
                        :props="{ checkStrictly: true, emitPath: false }">
                    </el-cascader>
                </el-form-item>

                <el-form-item v-if="state.deviceId" label="选择数据">
                    <el-select multiple v-model="state.properties" placeholder="选择数据">
                        <el-option v-for="item in options.tslOptions" :key="item.name" :label="item.title" :value="item.name" />
                    </el-select>
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRaw, onMounted, watchEffect } from "vue";
import { Delete } from '@element-plus/icons-vue'
import DeviceAPI from "@/api/device";

const props = defineProps({
    index: Number,
    data: Object,
});
const emit = defineEmits(["delete", 'change']);

const activeNames = ref<string[]>(['style']);
const state = reactive<{
    //groupId: string,
    //groupName: string,
    deviceId: string,
    deviceName: string,
    pluginId: string,
    property: string,
    propertyTitle: string,
    properties: string[],
    propertyList: any[],
    devices: any[],
}>({
    //groupId: '',
    //groupName: '',
    deviceId: '',
    deviceName: '',
    pluginId: '',
    property: '',
    propertyTitle: '',
    properties: [],
    propertyList: [],
    devices: [],
})

const options = reactive({
    deviceOptions: <any>[],
    tslOptions: <any>[]
})
const projectOptions = ref<any>([]);
const groupOptions = ref<any>([]);
const deviceOptions = ref<any>([]);
const tslOptions = ref<any>([]);

watch(() => state, (value) => {
    console.log('watch state', value)
    // emit('change', { index: props.index, ...value})
    emit('change', { index: props.index, ...toRaw(value) })
}, { deep: true })

watch(() => props.data, async (val: any) => {
    console.log('watch props.data', val)
    if (JSON.stringify(val) === "{}") return;
    // 分组
    //state.groupId = val.groupId || "";
    // 设备
    state.deviceId = val.deviceId || "";
    // 插件
    state.pluginId = val.pluginId || "";
    // 属性
    state.property = val.property || "";
    // 属性数组
    state.properties = val.properties || [];
    // 属性标题
    state.propertyTitle = val.propertyTitle || "";

    state.propertyList = val.propertyList || [];


}, { deep: true, immediate: true });

onMounted(async () => {
    //projectOptions.value = await getProjectList();
    const deviceList = await getDeviceList();
    options.deviceOptions = deviceList;
    console.log('deviceOptions onMounted:', deviceOptions.value);
});

/**
 * 分组改变的回调
 */
/**
watch(() => state.groupId, async (value) => {
    if (!value) return;
    const index: number = groupOptions.value.findIndex((item: any) => item.value === state.groupId);
    //state.groupName = index > -1 ? groupOptions.value[index].label : ''
    options.deviceOptions = await getDeviceList();
    state.devices = [...options.deviceOptions];

    console.log('watch deviceOptions', options.deviceOptions)

}, { immediate: true, deep: true });
 */
/**
 * 设备改变的回调
 */
watch(() => state.deviceId, async (value) => {
    console.log('watch deviceId', state)
    if (!value) return;
    try {
        getMetricsList(value);
        console.log('watch deviceId', value, options.deviceOptions)
        options.deviceOptions.forEach((item: any) => {
            if (item.children && item.children.length > 0) {
                item.children.forEach((child: any) => {
                    if (child.value === value) {
                        state.deviceName = child.device_name
                        state.pluginId = child.pluginId;
                        throw new Error('break');
                    }
                })
            }
        })
    }
    catch (e) {
        console.log('watch deviceId', e)
    }
}, { immediate: true, deep: true });

/**
 * @description: 设备id改变的回调
 * @return {*}
 */
/**
watch(() => state.pluginId, async (value) => {
    if (!value) return;
    console.log('watch Metrics', value)
    getMetricsList(value);
}, { immediate: true, deep: true })
*/

watchEffect(() => {
    console.log('watch deviceId', state,options.deviceOptions)
    if (state.deviceId && JSON.stringify(options.deviceOptions) !== "{}" && JSON.stringify(options.deviceOptions) !== "[]") {
        const index: number = options.deviceOptions?.findIndex((item: any) => item.value === state.deviceId);
        state.deviceName = index > -1 ? options.deviceOptions[index].label : ''
        if (index === -1) return;
        state.pluginId = options.deviceOptions[index].pluginId;
    }
})



/**
 * 属性改变
 */
watch(() => state.properties, async (value) => {
    if (!value || value.length === 0) return;
    state.propertyList = [];
    value.forEach((item: any) => {
        const index = options.tslOptions.findIndex((tsl: any) => tsl.name === item);
        state.propertyList.push(JSON.parse(JSON.stringify(options.tslOptions[index])));
    })
})

/**
 * 通过分组id获取分组列表
 * @param projectId
 * @returns 
 */
/**
async function getGroupList(groupId: string) {
    const { data: result } = await DeviceAPI.getGroupList({ current_page: 1, per_page: 100, parent_id: groupId })
    if (result.code === 200) {
        const { data } = result;
        console.log('watch pluginId111', data.list)
        return data.list.map((item: any) => ({ value: item.id, label: item.name }))
    }
    // return new Promise((resolve, reject) => {
    //     DeviceAPI.getGroupList({ current_page: 1, per_page: 9999, business_id: groupId })
    //         .then(({ data: result }) => {
    //             if (result.code === 200) {
    //                 const { data } = result;
    //                 const options = data.map((item: any) => ({ value: item.id, label: item.name }))
    //                 resolve(options)
    //             }
    //         })
    // })
}
 */
/**
 * 获取设备列表
 * @param id 
 */
async function getDeviceList() {
    // const params = { current_page: 1, per_page: 9999 }
    let { data: result } = await DeviceAPI.getDeviceList();
    console.log('getDeviceList', result)
    if (result.code !== 200) return [];
    let arr = result.data || [];
    return arr.map((item: any) => {
        // if (item.children && item.children.length > 0) {
        //     item.children = item.children.map((child: any) => {
        //         return {
        //             label: child.device_name, value: child.device, pluginId: child.type
        //         }
        //     })
        // }
        return {
            label: item.name,
            value: item.id,
            pluginId: item.device_config_id,
          //  children: item.children || []
        }
    });
}

/**
 * 通过设备Id获取指标
 * @param deviceId
 * @returns 
 */
/**
function getMetricsList(deviceId: string) {
    console.log('watch getMetricsList', deviceId)
    return new Promise((resolve, reject) => {
        DeviceAPI.getdeviceMetricsList(deviceId)
            .then(({ data: result }) => {
                if (result.code === 200) {
                    // const tsl = JSON.parse(data[0].chart_data).tsl;
                    // const opt = JSON.parse(JSON.stringify(tsl.properties));
                    // options.tslOptions = opt;
                    // console.log('getPlugin opt', opt)
                    // resolve(opt);

                }
            })
    })

}
    */
function getMetricsList(deviceId: string) {
    console.log('watch getMetricsList', deviceId)
    return DeviceAPI.getdeviceMetricsList(deviceId)
        .then(({ data: result }) => {
            if (result.code === 200) {
                const tslOptions: { name: string; title: string }[] = [];
                
                // 遍历返回的数据
                result.data.forEach((item: any) => {
                    // 遍历每个 item 的 options
                    item.options.forEach((opt: any) => {
                        tslOptions.push({
                            name: opt.key,
                            title: opt.label || opt.key
                        });
                    });
                });

                // 更新 tslOptions
                options.tslOptions = tslOptions;
                console.log('getdeviceMetrics tslOptions:', tslOptions);

                return { tslOptions };
            }
        });

}

/**
 * 删除设备
 * @param id 
 */
const handleDelete = (e: any) => {
    e.preventDefault();
    console.log('handleDelete', props.index)
    emit('delete', props.index)
}
</script>

<style lang="scss" scoped>
.header-icon {
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
}
</style>