<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="样式" name="style">
      <el-form v-model="formData" label-width="80px" label-position="left">
        <el-form-item label="填充颜色" v-if='!isImg'>
          <tp-color-picker v-model="formData.body.fill" show-alpha />
        </el-form-item>

        <el-form-item label="边框宽度" v-if='!isImg'>
          <el-input type="number" v-model="formData.body.strokeWidth"></el-input>
        </el-form-item>

        <el-form-item label="边框颜色" v-if='!isImg'>
          <tp-color-picker v-model="formData.body.stroke" />
        </el-form-item>

        <el-form-item label="边框圆角" v-if='!isImg'>
          <el-input type="number" v-model="formData.body.rx"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" v-if='isImg'>
          <el-input v-model="formData.image.xlink"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="files" v-if='isImg'>
          <el-upload ref="upload" :on-exceed="handleExceed" action='' :auto-upload='false' :limit="1" class="upload-demo"
            :file-list="formData.files" :multiple="false" :on-change="handleChange">
            <template #trigger>
              <el-button type="primary">选择图片</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import PluginAPI from '@/api/plugin'
import { FormInstance, UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { ref, reactive, watch, watchSyncEffect, watchEffect } from "vue";
const activeNames = ref("style");
const getPicPlugins = async () => {
  let { data: result } = await PluginAPI.getPicPlugins({ "current_page": 1, "per_page": 9999 })
  if (result.code === 200) {
    return result.data.data;
  }
}
const upload = ref<UploadInstance>()
const formData = reactive({
  body: {
    fill: "",
    strokeWidth: 2,
    stroke: "#000000",
    rx: 6,
    ry: 6
  },
  image: {
    fill: "",
    strokeWidth: 2,
    stroke: "#000000",
    rx: 6,
    ry: 6,
    xlink: '',
  },
  files: []
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
let isImg = ref(false)
const handleChange = async (file: any, uploadFiles: any) => {
  formData.files = uploadFiles;
  const fd = new FormData()

  fd.append('file', file.raw)
  fd.append('type', "logo")
  const res = await PluginAPI.uploadPlugin(fd)
  console.log("====handleChange.res.data", res.data)

  if (res.data.data) {
    formData.image.xlink = import.meta.env.VITE_BASE_URL + res.data.data.file_url.replace('.', '')
    console.log(res.data.data)
  }
}

watch(() => props.data, (val) => {
  console.log('====基础图形.data', JSON.stringify(val))
  if (!val || JSON.stringify(val) === "{}") return;
  let temp = JSON.parse(JSON.stringify(val));
  if (temp.shape === 'rect_img') {
    isImg.value = true
    formData.body = { ...temp.attrs.image };
    formData.image.xlink = temp.attrs.image['xlink:href'];
  } else {
    isImg.value = false
    if (temp.attrs.body.fill === "transparent")
      temp.attrs.body.fill = "";
    formData.body = { ...temp.attrs.body };
  }
  console.log('====基础图形.formData', JSON.stringify(formData))

}, { deep: true, immediate: true })

const upImg = () => {

}
const emit = defineEmits(["onChange", 'update:visible', 'submit']);
watch(formData, (val) => {
  // 当自定义属性改变时，传递给Main.vue的style属性
  console.log('基础图形', val)
  let temp = JSON.parse(JSON.stringify(val));
  if (!temp.body.fill)
    temp.body.fill = "transparent";
  temp.body.ry = temp.body.rx;
  emit("onChange", {
    style: { ...temp }
  });
}, { deep: true })

</script>

<style lang="scss" scoped></style>