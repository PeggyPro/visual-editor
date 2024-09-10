<!--
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2024-09-03 20:23:58
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-10 21:49:01
 * @FilePath: \visual-editor\src\plugins\tp-plugin\curve\Data.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="height:100%">
    <el-row style="margin-bottom: 10px">
      <el-radio-group v-model="formData.bindType">
        <el-radio v-for="item in bindOptions" :label="item.value" size="small">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-row>
    <el-row style="height:100%">
      <!-- 静态数据 -->
      <el-input v-if="formData.bindType === 'static'" :rows="20" type="textarea" v-model="formData.static"></el-input>
      <!-- 动态数据 -->
      <el-form-item v-else-if="formData.bindType === 'dynamic'" style="width:100%">
        <el-input :rows="2" type="textarea" v-model="formData.dynamic"></el-input>
      </el-form-item>
      <!-- 设备数据 -->
      <div class="w-full" v-else-if="formData.bindType === 'device'">
        <slot></slot>
      </div>

    </el-row>
  </div>
</template>

<script>
// const staticData = {
//   "xAxis": ["周一","周二","周三","周四","周五"],
//   "series": [{"name": "访问量","type": "line","data": [10,20,60,12,4],"symbol": "circle"}]
// }
const staticData = [
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
]

export default {
  props: {
    data: {
      type: [String, Object],
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        bindType: 'static',
        static: JSON.stringify(staticData, null, 4)
      },
      bindOptions: [
        { value: 'static', label: '静态数据' },
        { value: 'dynamic', label: '动态数据' },
        { value: 'device', label: '设备数据' }
      ]

    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$emit("onChange", {
          data: { bindType: this.bindType, ...val }
        });
      },
      deep: true
    }
  },
  mounted() {
    if (JSON.stringify(this.data) !== "{}" && JSON.stringify(this.data) !== "[]") {
      this.formData = JSON.parse(JSON.stringify(this.data));
    }
  },


}
</script>
<style lang="scss" scoped>
.el-radio.el-radio--small {
  margin-right: 10px
}
</style>