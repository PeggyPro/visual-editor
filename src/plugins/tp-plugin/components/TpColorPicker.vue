<template>
  <div>
    <el-color-picker
     :model-value="modelValue" 
      @update:modelValue="changeColor"
      :predefine="predefineColors"
      @change="changeColor">
    </el-color-picker>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#c7158577',
]
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      predefineColors,
    }
  },
  mounted() {
    const storePredefineColors = localStorage.getItem('predefineColors')
      ? JSON.parse(localStorage.getItem('predefineColors') as any)
      : predefineColors

    this.predefineColors = storePredefineColors
    this.saveColorLocal()
  },
  methods: {
    changeColor(val: any) {
      const inx = this.predefineColors.findIndex(x => x === val)
      if (inx > -1) {
        this.predefineColors.splice(inx, 1)
      } else {
        const num = this.predefineColors.length - 7
        if (num > 0) {
          this.predefineColors.splice(7, num)
        }
      }

      this.predefineColors.unshift(val)
      this.saveColorLocal()
      console.log(`====changeColor: ${val}`)
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
    },
    saveColorLocal() {
      localStorage.setItem('predefineColors', JSON.stringify(this.predefineColors))
    },
  },
})
</script>
