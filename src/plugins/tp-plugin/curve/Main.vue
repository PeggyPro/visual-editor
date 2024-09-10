
<template>
  <Line id="yibiaopan" :value="value" :formData="formData" :formData1="formData1"></Line>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import Line from './components/Curve.vue'
export default defineComponent({
  components: {
    Line,
  },
  props: {
    value: {
      type: [Object],
      default: () => ({})
    },
    data: {
      type: [Object, String, Number],
      default: () => {
        return {};
      },
    },
    style: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
    }
  },
  watch: {
    data: {
      handler(val) {
        console.log("Main.value", val);
        this.formData1 = val
      },
      deep: true
    },
    style: {
      handler(val) {
        console.log("====Main.style", val);
        this.formData = val
      },
      deep: true
    }
  },
  computed: {
    formData1() {
        if (JSON.stringify(this.value) !== "{}") {
            return this.value;
        } else {
            return {};
        }
    }
  },
  methods: {
    changeData(data: any) {
      this.formData = JSON.parse(JSON.stringify(data));
      console.log("Main.data", this.formData);
    }
  }
})

</script>

<style lang="scss" scoped></style>