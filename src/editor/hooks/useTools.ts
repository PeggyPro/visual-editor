import { Cell } from '@antv/x6';
import { CanvasConfig,StencilConfig } from '../config'
import { useRouter } from "vue-router";
/**
 * @author cxs
 * @date 2023-04-20
 * @update 2023-05-18 新增预览、分享
 * @description 工具栏
 * @interface ITools
 * @returns 
 */
export const useTools = (): ITools => {
    const router = useRouter();
    return {

        // 测试线条的颜色修改工具;  *@author; 王炳宏  2023-05-23
        attrColor: () => {
            CanvasConfig.getInstance().onChangeEdges('attr');
        },

        zoomToFit: () => {
            CanvasConfig.getInstance().zoomToFit();
        },
        zoomOut: () => {
            CanvasConfig.getInstance().zoomOut();
        },
        zoomIn: () => {
            CanvasConfig.getInstance().zoomIn();
        },
        enableSnapline: () => {
            CanvasConfig.getInstance().enableSnapline();
        },
        disableSnapline: () => {
            CanvasConfig.getInstance().disableSnapline();
        },
        undo: () => {
            CanvasConfig.getInstance().undo();
        },
        redo: () => {
            CanvasConfig.getInstance().redo();
        },
        toJSON: (): { cells: Cell.Properties[] } => {
            return CanvasConfig.getInstance().toJSON();
        },
        exportJPEG(fileName?, options?) {
            CanvasConfig.getInstance().exportJPEG(fileName, options);
        },
        exportPNG(fileName?, options?) {
            CanvasConfig.getInstance().exportPNG(fileName, options);
        },
        exportSVG(fileName?, options?) {
            CanvasConfig.getInstance().exportSVG(fileName, options);
        },
        preview() {
            const json = CanvasConfig.getInstance().toJSON();
            const url = router.resolve({
                name: 'display',
                params: { id: '123'},
                query: { id: "123" }
            })
            window.open(url.href);
        },
        share() {

        }
    }
}
