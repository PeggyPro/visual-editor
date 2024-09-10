<template>
  <el-collapse v-model="activeNames">

    <el-collapse-item title="背景与边框" name="style1">
      <el-form v-model="formData" label-width="100px" label-position="left" class="px-6">

        <el-form-item label="主题颜色">
          <el-switch v-model="formData.theme" class="ml-2" 
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #141414" 
            active-value="light" inactive-value="dark"
            active-text="默认" inactive-text="暗黑"/>
        </el-form-item>

        <el-form-item label="背景颜色">
          <tp-color-picker v-model="formData.Color" />
        </el-form-item>

        <el-form-item label="背景透明度">
          <el-slider style="margin-right: 20px" :min="0" :max="10" v-model="formData.slidingblock"></el-slider>
        </el-form-item>

        <el-form-item label="边框颜色">
          <tp-color-picker v-model="formData.borderColor" />
        </el-form-item>

        <el-form-item label="边框宽度">
          <el-input-number v-model="formData.borderSize" />
        </el-form-item>

        <el-form-item label="边框圆角">
          <el-input-number v-model="formData.bordereduse" />
        </el-form-item>
      </el-form>
    </el-collapse-item>

    <el-collapse-item title="线条" name="line">
      <el-form v-model="formData"  label-width="80px" label-position="left" class="px-6">
        <el-form-item label="线条颜色">
            <div v-for="(lineColor, index) in formData.lineColor"  :key="index"  >  
              <tp-color-picker v-model="formData.lineColor[index]" />  
            </div> 
            <el-icon class="ml-2" size="18" @click.stop="handleAddLineColor">
              <Plus />
            </el-icon>
          
        </el-form-item>
        

      </el-form>
    </el-collapse-item>

    <el-collapse-item title="X轴" name="style2">
      <el-form v-model="formData"  label-width="80px" label-position="left" class="px-6">
        <el-form-item label="字体颜色">
          <tp-color-picker v-model="formData.XTextColor" />
        </el-form-item>

        <el-form-item label="字体大小">
          <el-input-number v-model="formData.XfontSize" />
        </el-form-item>

        <el-form-item label="轴线颜色">
          <tp-color-picker v-model="formData.XColor" />
        </el-form-item>
      </el-form>
    </el-collapse-item>

    <el-collapse-item title="Y轴" name="style3">
      <el-form v-model="formData"  label-width="80px" label-position="left" class="px-6">
        <el-form-item label="字体颜色">
          <tp-color-picker v-model="formData.YTextColor" />
        </el-form-item>

        <el-form-item label="字体大小">
          <el-input-number v-model="formData.YfontSize" />
        </el-form-item>

        <el-form-item label="轴线颜色">
          <tp-color-picker v-model="formData.YColor" />
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Plus } from '@element-plus/icons-vue'

export default defineComponent({
  components: { Plus },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeNames: 'style',
      formData: {
        theme: 'light',  // 主题
        lineColor: ["#0591F8", "#FE740C"],  // 线条颜色
        // lineColor: [
        //   {
        //     color: "#0591F8"
        //   },
        //   {
        //     color: "#FE740C"
        //   },
        // ],  
        fontSize: 20,
        fontColor: '',
        bgColor: '',
        Color: '#FFFFFF',   // 背景颜色
        slidingblock: 10,
        borderColor: '',
        borderSize: '',
        bordereduse: 0,
        XfontSize: 12,
        XTextColor: '#9a9a9a',
        XColor: '',
        YfontSize: 12,
        YTextColor: '#9a9a9a',
        YColor: ''
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$emit("onChange", {
          style: val
        });
      },
      deep: true,
    }
  },
  mounted() {
    if (this.data) {
      const jsonStr = JSON.stringify(this.data);
      console.log(jsonStr, '++')
      if (jsonStr === '{}') return;
      const jsonObj = JSON.parse(jsonStr);
      this.formData = jsonObj;
    }

  },
  methods: {
    handleAddLineColor() {
      this.formData.lineColor.push("#0591F8");
    }
  }
})


</script>

<style lang="scss" scoped></style>