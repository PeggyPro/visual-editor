<!--
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2024-09-03 20:23:58
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-04 21:02:37
 * @FilePath: \visual-editor\src\plugins\tp-plugin\text\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div :style="myStyle" style="width:100%;height:100%;overflow-y: auto" @dblclick="handleDBClick">
        <span v-if="mode==='view'" class="whitespace-pre-wrap" :class="`text-${myStyle.textAlign}`" :style="{ 'color': myStyle.color }">{{ textValue }}</span>
        <el-input type="textarea" id="inputRef" ref="inputRef" style="width:100%;height:100%" v-if="mode==='edit'" v-model="textValue" @blur="onChange" @keyup.enter.native="onChange"></el-input>
    </div>
</template>

<script>
import { styleData } from './default'

export default {
  props: {
    value: {
      type: [String, Object],
      default: '文本'
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      myStyle: {
        ...styleData, fontSize: styleData.fontSize + 'px'
      },
      textValue: '文本',
      mode: "view"
    }
  },
  watch: {
    style: {
      handler: function (val, oldVal) {
        console.log('text.Main.style', val, oldVal)
        if (JSON.stringify(val) === "{}") return;
        this.myStyle = val;
      },
      immediate: true,
      deep: true
    },
    value: {
      handler: function(val) {
        console.log( val,"9892832913218")
        if (!val) {
          this.textValue = "文本";
        } else {
          this.textValue = val;
        }
        console.log('text.Main.value', this.textValue)
      },
      immediate: true
    }
  },
  methods: {
    handleDBClick(e) {
      this.mode = "edit";
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      })
    },
    onChange() {
      console.log("text.onChange", this.textValue)
      this.mode = "view";
      this.$emit("onChange", {
          data: { bindType: "static", static: this.textValue }
        });
    }
  },
  mounted() {
    console.log("====text.main.style", this.myStyle)
    this.$emit("init", {
      style: this.myStyle
    })
  },
}
</script>
<style lang="scss" scoped></style>