<template>
    <el-container id="containerId">

      <el-header id="header" height="50px" class="flex items-center shadow-md w-full">
        <!-- 顶部start -->
        <Header :name="screenName"/>
        <!-- 顶部end -->
      </el-header>

      <el-container id="layout" class="layout-container relative">
        <el-aside class="shadow-sm absolute w-44 z-50 h-full bg-white" style="width:300px">
          <!-- 左侧组件start -->

          <left-aside class="left-aside w-full"/>
          <div class="custom-component">
            <el-row>
              <el-col :span="24"><el-button class="custom-button" @click="showCustomPlugins">自定义图形</el-button></el-col>
            </el-row>
          </div>
          <!-- 左侧组件end -->
        </el-aside>
        <el-main>


          <!-- 中间编辑区域start -->
          <canvas-editor class="canvas-editor"/>
          <!-- 中间编辑区域end -->
  
          <!-- 右侧属性面板start -->
          <RightAttributePanel class="absolute inset-y-0 p-2 right-0 w-64 z-50 h-full bg-white" style="width:300px"/>
          <!-- 右侧属性面板end -->
        </el-main>
      </el-container>
    </el-container>
    <CustomPlugins v-model:visible="customPluginsDialogVisible" @submit="customPluginSubmit"/>
  </template>
<script setup lang="ts">
import { onMounted, inject, ref, onUnmounted } from "vue";
import Header from "./components/header/index.vue";
import LeftAside from "./components/left-aside/index.vue";
import CanvasEditor from "./components/canvas-editor/index.vue";
import RightAttributePanel from "./components/right-attribute-panel/index.vue";
import { useTools, useCanvas } from './hooks'
import CustomPlugins from "./components/left-aside/CustomPlugins.vue";


const params: any = inject('params', null);
const { initCanvas, screenName } = useCanvas(params?.id || null);

onMounted(async () => {
  // 从服务器获取大屏数据
  initCanvas();
})

// ========================================自定义图片=============================================
const customPluginsDialogVisible = ref(false);
const showCustomPlugins = () => {
  customPluginsDialogVisible.value = true;
}

const customPluginSubmit = () => {
}
// ========================================自定义图片=============================================

const containerRect = ref({
  width: 0,
  height: 0
});
onMounted(() => {
  const resizeObserver = new ResizeObserver(entries => {
    containerRect.value = {
      width: entries[0].contentRect.width,
      height: entries[0].contentRect.height
    }
  })
  const displayContainer: HTMLElement = <HTMLElement>document.getElementById("containerId");
  resizeObserver.observe(displayContainer);
  
});

let { save } = useTools();
onUnmounted(() => {
  save(params?.id);
});
</script>

<style lang="scss">
  $headerHeight: 50px;
  .el-header {
    height: $headerHeight;
  }
  .el-header,
  .el-footer {
    position: relative;
    z-index: 99;
    background-color: white;
    padding: 0;
  }

  .el-aside {
    background-color: white;
    overflow:hidden;
    height: calc(100% - 4px);
    
    .custom-component {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      z-index: 999;
      background-color: #fff;
      overflow:hidden;
      padding:4px 4px 0 4px;;
      .el-button {
        overflow: hidden;
        width: calc(100% - 10px);
        margin-left: 4px;
        margin-right: 80px;;
      }
    }
  }

  .layout-container {
    height: calc(100vh - $headerHeight);
  }

  .el-main {
    .canvas-editor {
      width: calc(100% - 600px);
      margin-left:300px;
      margin-right:300px
    }

    padding: 0;
    background-color: #f5f5f5;
    @media (min-width: 1111px) {
      overflow-x: hidden;
    }
    @media (min-width: 1920px) {
      width: 1920px;
    }
    @media (min-width: 1920px) {
      .container {
        max-width: calc(100vw - 600px);
      }
    }
      
  }
  .x6-widget-stencil-content {
    height: 100%;
  }
</style>
