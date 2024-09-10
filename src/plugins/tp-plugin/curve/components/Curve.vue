<template>
    <div :id="id" style="width:100%;height:100%;float: left;" :style="{
        borderRadius: background.bordereduse + '%',
        backgroundColor: bgColorAndOpicity,
        border: `${background.borderSize + 'px'} solid ${background.borderColor}`,
    }">
    </div>
</template>

<!-- https://g2plot.antv.antgroup.com/manual/plots/line#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B -->
<script lang="ts">
import { Line } from '@antv/g2plot';
import { defineComponent } from "vue";
import { randomString, isEmpty, proxyToPlainObject } from "@/utils"

export default defineComponent({
    name: "Gauge",
    components: {
        Line
    },
    props: {
        id: {
            type: String,
            required: true,
            default: "gauge"
        },
        formData: {
            type: [Object],
            default: () => {
                return {};
            },
        },
        value: {
            type: [Object],
            default: () => ({})
        }
    },
    data() {
        return {
            id: "container_curve_" + randomString(10),
            line: null,
            data: [
                {
                    "x": "2010-01",
                    "data": 10
                },
                {
                    "x": "2010-02",
                    "data": 20
                },
                {
                    "x": "2010-03",
                    "data": 60
                },
                {
                    "x": "2010-04",
                    "data": 12
                }
            ],
            border: "border:5px solid red",
            padding: 'auto',
            xField: 'Date',
            yField: 'scales',
            xAxis: {
                tickCount: 5,
            },
            slider: {
                start: 0.1,
                end: 0.9,
            },
            background: {
                Color: "",
                XColor: "",
                XTextColor: "",
                XfontSize: "",
                bgColor: "",
                borderColor: "",
                borderSize: "",
                bordereduse: 0,
                fontColor: "",
                fontSize: 20,
                slidingblock: 10,
            },
            bgColorAndOpicity: '#FFFFFF',
            keydata: {
                value: "",
                options: ['静态数据', '动态数据', '设备数据'],
                selectedValue: '',
            },
        }
    },
    mounted() {
        this.initCurve();
    },
    watch: {
        // 样式
        formData: {
            handler(val) {
                if (!val || JSON.stringify(val) === "{}") return;
                if (isEmpty(val)) return;
                const plainObj = proxyToPlainObject(val);
                function hexToRgba(hex: any, alpha: any) {
                    if (!hex?.slice) return "rgba(" + 0 + ", " + 0 + ", " + 0 + ", " + alpha + ")";
                    var r = parseInt(hex.slice(1, 3), 16);
                    var g = parseInt(hex.slice(3, 5), 16);
                    var b = parseInt(hex.slice(5, 7), 16);
                    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
                }
                // 背景
                this.background = plainObj;
                // 背景透明度
                this.bgColorAndOpicity = hexToRgba(this.background.Color, this.background.slidingblock as any / 10);

                // 设置图表样式
                this.setOptions(plainObj);
            },
            deep: true,
        },
        // 图表数据
        value: {
            handler(val) {
                if (isEmpty(val)) return;
                const obj = JSON.parse(val);
                let data: any = obj?.series || obj;
                if (isEmpty(data)) return;
                this.updateCurve(data);
            }
        }
    },
    methods: {
        /**
         * 初始化图表
         */
        initCurve(data?: Record<string, any>[]) {
            this.destroyCurve();
            const plainObj = proxyToPlainObject(this.data);
            (this.line as any) = new Line(this.id, {
                data: data || plainObj,
                padding: this.padding as any,
                color: ['#FE740C', '#F70909'],
                xField: 'x',
                yField: 'data',
                xAxis: { type: 'time' },
                seriesField: 'category',
                theme: 'dark',
            });
            (this.line as any).render();
        },
        /**
         * 更新图表数据
         */
        updateCurve(data: Record<string, any>[]) {
            if (!this.line) return;
            (this.line as any).changeData(data)
        },
        /**
         * 销毁图表
         */
        destroyCurve() {
            if (this.line) {
                (this.line as any).destroy(); // 销毁旧图表  
                this.line = null;
            }
        },
        /**
         * 设置图表样式
         */
        setOptions(value: any) {
            const opt = proxyToPlainObject(value);
            if (isEmpty(opt)) return;
            const plot = (this.line as any);
            plot.update({
                ...this.getOptions(),
                theme: opt.theme,   // 主题
                color: opt.lineColor,   // 线条颜色
                xAxis: {
                    // 标签
                    label: {
                        style: {
                            fontSize: opt.XfontSize,   // x轴标签文字大小
                            fill: opt.XTextColor        // x轴标签文字颜色
                        }
                    },
                    // 轴线
                    line: {
                        style: {
                            stroke: opt.XColor   // x轴轴线颜色
                        }
                    }
                },
                yAxis: {
                    // 标签
                    label: {
                        style: {
                            fontSize: opt.YfontSize,   // y轴标签文字大小
                            fill: opt.YTextColor        // y轴标签文字颜色
                        }
                    },
                    // 轴线
                    line: {
                        style: {
                            stroke: opt.YColor   // y轴轴线颜色
                        }
                    }
                }
            })
        },
        getOptions() {
            return (this.line as any).options;
        }
    }
})

</script>


<style lang="scss" scoped>
.header {
    width: 50px;
    position: absolute;
    left: 0;
    top: 10px;
}
</style>
