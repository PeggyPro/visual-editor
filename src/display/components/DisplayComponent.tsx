/*
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2023-07-21 19:30:35
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-09 20:55:58
 * @FilePath: \tp-editor\src\display\components\DisplayComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { parseJSONData, randomString } from "@/utils";
import { Component, defineComponent } from "vue";
import { DataConfig } from "../config/DataConfig";
import { Node } from "@antv/x6";

export const getDisplayComponent = (cpt: Component, nodeData: any, refType: any): Component => {
    return defineComponent({
        inject: ['getNode'],
        data() {
            return {
                value: "",
                style: {},
                data: {},
                id: randomString(8),
                dataConfig: new DataConfig(nodeData, refType)
            }
        },
        mounted() {
            const node: Node.Properties = (this as any).getNode() as Node.Properties;
            const data = node.store.data.data || {};
            console.log('display.mounted.data', data)
            const jsonData = parseJSONData(data.jsonData);
            if (jsonData.style) {
                this.style = { ...jsonData.style }
            }
            if (jsonData.data) {
                this.data = { ...jsonData.data } ;
                if (jsonData.data.bindType === "static") {
                    // 静态数据
                    this.value = jsonData.data.static;
                } else if (jsonData.data.bindType === "dynamic") {
                    // 动态数据
                    // this.value = jsonData.data.dynamic;
                } else if (jsonData.data.bindType === "device") {
                    //if (!jsonData.data.deviceData[0].projectId) return;
                    // 设备数据
                    const cb = (value: any) => {
                        this.value = value;
                    }
                    // 设置回调
                    this.dataConfig.setCallback(cb);
                    // 设置设备ID
                    this.dataConfig.setDevicesData(jsonData.data.deviceData)
                    this.dataConfig.setDeviceId(jsonData.data.deviceData[0].deviceId);
                    this.dataConfig.setProperty(jsonData.data.deviceData[0].property);
                    // 启动定时器开始刷新数据
                    this.dataConfig.start();
                }
            }
            console.log('display.mounted.this.style', jsonData.data)


        },
        methods: {
            onChange(value: any, _callback: any) {
                console.log(value)
                const { device, property, switch: switchValue } = value; 
                if (refType === 'switch') {
                    this.dataConfig.setCallback(_callback);
                    this.dataConfig.setValue(switchValue);
                    this.dataConfig.start();
                } else {
                    if (!device || !property) return;
                    this.dataConfig.stop();
                    // 改变了数据入口
                    device && this.dataConfig.setDeviceId(device.value);
                    property && this.dataConfig.setProperty(property);
                    // 重启定时器
                    this.dataConfig.start();
                }
            }
        },
        render() {
            return (
                <cpt id={this.id} 
                    key={this.id} 
                    value={this.value} 
                    style={this.style} 
                    data={this.data} 
                    onChange={this.onChange}
                     isDisplay={true}
                    />
            )
        }
    })
}