import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as Vue from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import * as G2Plot from '@antv/g2plot'
import * as dayjs from 'dayjs'
import * as axios from 'axios'
import * as ElementPlus from 'element-plus'
import TpColorPicker from "@/plugins/tp-plugin/components/TpColorPicker.vue";
// 第三方插件
import * as Plugins from './dependence';
import * as Global from '@/utils/global'
// 全局方法
Global.install();

import 'systemjs'
System.set('lib:vue', Vue)
System.set('lib:element-plus', ElementPlus)
System.set('lib:@antv/g2plot', G2Plot)
System.set('lib:dayjs', dayjs)
System.set('lib:axios', axios)


const app = createApp(App);

app.component('tp-color-picker', TpColorPicker);
// 使用 Element Plus
Plugins.installElementPlus(app);
// 使用AMap
Plugins.installAMap(app);
Plugins.installDataV(app);


app.use(router);
app.use(createPinia());

router.isReady().then(() => app.mount('#app'));
