<template>
  <div style="height:100%">
    <!-- 项目 -> 分组(绑定分组) -->
    <el-row style="height:100%">
        <!-- 设备数据 -->
        <div class="w-full" >
          <el-button style="width:100%" @click="addDevice">新增设备</el-button>
          <div class="device-container overflow-y-auto overflow-x-auto" >
              <div v-for="(device, index) in deviceData" :key="device.id">
                <DeviceSelector :index="index" :data="device" @delete="handleDeleteDevice" @change="handleChangeDeviceData"/>
              </div>
          </div>
          
        </div>
        
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, toRaw, watch } from "vue";
import { ElMessageBox } from 'element-plus'

import DeviceSelector from "./components/DeviceSelector.vue";
import { useBaseData } from './useBaseData'
const props = defineProps({
  data: {
    type: [Object],
    default: () => ({})
  }
})

const emit = defineEmits(["onChange"]);
const deviceData = ref<any>([
  {
    devices: [],
    groupId: '',
    deviceId: '',
    property: '',
    pluginId: '',
    propertyTitle: ''
  }
])

let { 
  state, bindOptions, groupOptions,
  getGroupList, handleChangeGroup 
} = useBaseData();

onMounted(() => {
  //getGroupList('0')
  //console.log('groupOptions onMounted:', groupOptions.value);
})

const addDevice = () => {
  deviceData.value.push({
    devices: [],
    //groupId: '',
    deviceId: '',
    property: '',
    pluginId: '',
    propertyTitle: '',
    propertyList: []
  })
}

watch(() => props.data, (val) => {
  if (JSON.stringify(val) !== "{}" && val.deviceData) {
    deviceData.value = JSON.parse(JSON.stringify(val.deviceData));
  } else {
    deviceData.value = [
      {
        devices: [],
        //groupId: '',
        deviceId: '',
        property: '',
        pluginId: '',
        propertyTitle: '',
        propertyList: []
      }
    ]
  }
}, {deep: true, immediate: true});


watch(deviceData, (value) => {
  emit('onChange', { data: { bindType: 'device', deviceData: toRaw(deviceData.value) }})
}, {deep: true});

const handleChangeDeviceData = (data: any) => {
  deviceData.value.splice(data.index, 1, data);
  // const _deviceData = toRaw(deviceData.value);
  // const option = { bindType: 'device', deviceData: _deviceData  };
  // emit('onChange', { data: option })
}

/**
 * 删除设备
 * @param id 
 */
const handleDeleteDevice = (index: number) => {
  if (deviceData.value.length === 1) {
    ElMessageBox.alert('至少保留一个设备', '提示', {})
    return
  }
  const callback = (action: any, instance: any) => {
    if (action === 'confirm') {
      deviceData.value.splice(index, 1)
    }
  }
  ElMessageBox.confirm('是否确认删除该设备？', '确认删除', {callback}, null)
}
    
</script>

<style lang="scss" scoped>
.device-container {
  width: 100%;
  height: calc(100vh - 200px);
}
</style>