import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export function installElementPlus(app: App): void {
  app.use(ElementPlus, { locale: zhCn })
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   app.component(key, component)
  // }
}