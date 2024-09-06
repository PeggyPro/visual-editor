<template>
  <div style="height: calc(100% - 300px); overflow-y: auto">
    <el-collapse style="height: 100%" v-model="activeNames" accordion >
      <el-collapse-item title="属性" name="attribute">
        <el-form class="ml-4" label-position="left" label-width="100px">
          <el-form-item label="轮播">
            <el-switch v-model="table.carousel"></el-switch>
          </el-form-item>
          <el-form-item label="每页行数">
            <el-input type="number" v-model="table.plimit" :min="1" :max="10"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
  
      <el-collapse-item title="背景和边框" name="bgandbd">
        <el-form class="ml-4" label-position="left" label-width="100px">
          <el-form-item label="背景颜色">
            <tp-color-picker v-model="table.table.bgColor"></tp-color-picker>
          </el-form-item>
          <el-form-item label="显示边框">
            <el-switch v-model="table.table.showBorder"></el-switch>
          </el-form-item>
          <el-form-item v-if="table.table.showBorder" label="边框宽度">
            <el-input-number v-model="table.table.borderWidth" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item v-if="table.table.showBorder" label="边框颜色">
            <tp-color-picker v-model="table.table.borderColor"></tp-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
  
      <el-collapse-item title="表格边框" name="bgbk">
        <el-form class="ml-4" label-position="left" label-width="100px">
          <el-form-item label="显示边框">
            <el-switch v-model="table.border.showBorder"></el-switch>
          </el-form-item>
          <el-form-item v-if="table.border.showBorder" label="边框颜色">
            <tp-color-picker v-model="table.border.borderColor"></tp-color-picker>
          </el-form-item>
  
          <el-form-item label="显示斑马纹">
            <el-switch v-model="table.border.showZebrastripe"></el-switch>
          </el-form-item>
          <el-form-item v-if="table.border.showZebrastripe" label="斑马纹颜色">
            <tp-color-picker v-model="table.border.zebrastripeColor"></tp-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
  
      <el-collapse-item title="表头" name="btou">
        <el-form class="ml-4" label-position="left" label-width="100px">
          <el-form-item label="背景颜色">
            <tp-color-picker v-model="table.header.bgColor"></tp-color-picker>
          </el-form-item>
  
          <el-form-item label="字体大小">
            <el-input v-model="table.header.fontSize"></el-input>
          </el-form-item>
  
          <el-form-item label="字体颜色">
            <tp-color-picker v-model="table.header.fontColor"></tp-color-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
  
      <el-collapse-item name="zdylie">
        <template #title>
          <div class="flex justify-between w-full items-center">
            <span>自定义列</span>
            <el-icon class="header-icon mr-3" @click.stop="addRow">
              <Plus /> +
            </el-icon>
          </div>
        </template>
  
        <el-collapse class="ml-4">
          <el-collapse-item v-if="table.newRows[0]" v-for="(item, index) in table.newRows" :name="'zdylie-' + index">
  
            <template #title>
              <div class="flex justify-between w-full items-center">
                <span>{{ item.name }}</span>
                <el-icon class="header-icon mr-3" @click.stop="removeRow(index)">
                  <Minus /> -
                </el-icon>
              </div>
            </template>
  
            <el-form class="ml-4" label-position="left" label-width="100px">
              <el-form-item label="是否显示">
                <el-switch v-model="table.newRows[index].show"></el-switch>
              </el-form-item>
              <el-form-item label="字段名">
                <el-input v-model="table.newRows[index].filed"></el-input>
              </el-form-item>
              <el-form-item label="列名">
                <el-input v-model="table.newRows[index].name"></el-input>
              </el-form-item>
              <el-form-item label="文本颜色">
                <tp-color-picker v-model="table.newRows[index].color"></tp-color-picker>
              </el-form-item>
              <el-form-item label="列宽">
                <el-input v-model="table.newRows[index].width"></el-input>
              </el-form-item>
              <el-form-item label="文本大小">
                <el-input-number v-model="table.newRows[index].size"></el-input-number>
              </el-form-item>
            </el-form>
  
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
  
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import { Plus, Minus } from '@element-plus/icons-vue'
import data from "./data"
import { cloneDeep } from "lodash";
const staticData = cloneDeep(data)

export default defineComponent({
  props: {
      data: {
          type: Object,
          default: () => ({})
      },
      bindData: {
        type: Object,
        default: () => ({})
      },
  },
  data() {
    return {
      activeNames: 'attribute',
      table: {
        carousel: false, //轮播
        plimit: staticData.plimit, //每页行数
        table: staticData.table,
        border: staticData.border,
        header: staticData.header,
        newRows: staticData.newRows
      },
    }
  },
  watch: {
    'table.border.showBorder': {
      handler(val) {
        this.table.border.showZebrastripe = false
      },
      immediate: true
    },
    'table.border.borderColor': {
      handler(val) {
        this.table.border.showZebrastripe = false
      },
      immediate: true
    },
    table: {
      handler(val) {
        console.log("table.Attribute.table", JSON.stringify(val))
        this.$emit("onChange", {
          style: val
        });
      },
      deep: true
    }
  },
  methods: {
    addRow() {
      this.table.newRows.push({
        show: true,
        filed: 'test',
        name: 'AAA',
        width: 100,
        color: '#000000',
        size: 10
      })
    },
    removeRow(index: number) {
      this.table.newRows.splice(index, 1);
    }
  },
  mounted(){
    if (this.data) {
      const jsonStr = JSON.stringify(this.data);
      if (jsonStr === '{}') return
      console.log(`====table.attr.mounted: ${jsonStr}`)
      const formData = JSON.parse(jsonStr);
      this.table = formData;
    }
  }
})
</script>

<style lang="scss" scoped>
.header-icon {
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}
</style>