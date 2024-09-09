
/// <reference types="vite/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
  }
   
declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module 'element-plus/dist/locale/en.mjs';

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_BASE_URL: string
  readonly VITE_USER_NAME: string
  readonly VITE_USER_PASS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Date<T> {
  format(fmt : any) : any
}



