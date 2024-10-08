/*
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2024-09-03 20:23:58
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-06 17:34:08
 * @FilePath: \visual-editor\src\display\useDisplay.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanvasConfig } from "@/editor/config";
import VisualAPI from '@/api/visual';
import { ref } from "vue";
import { usePlugins } from "@/editor/hooks";


export const useDisplay = (containerId: string) => {
    const { loadPlugins } = usePlugins();

    let jsonObj: any = {};
    const screenName = ref<string>("")
    const initDisplay = async (data: any, id?: string, shareID?: string) => {
        let jsonData = data;
        if (id) {
            let { data: result } = await VisualAPI.getJsonDataById({current_page: 1, per_page: 10, id, share_id: shareID});
            if (result.code === 200) {
                screenName.value = result.data?.list?.[0]?.dashboard_name;
                jsonData = result.data?.list?.[0]?.json_data;
            }
        }
        if (jsonData && jsonData!== '{}' && JSON.stringify(jsonData) !== '{}') {
            jsonObj = JSON.parse(jsonData);
            console.log('initDisplay.jsonObj', jsonObj)
            const options: ICanvasConfig.Options = {
                autoResize: true,
                nodeMovable: false,
                nodeResizable: false,
                enableRotating: false,
                enableSelection: false,
            }
            let canvasConfig: ICanvasConfig = CanvasConfig.getDisplayInstance(containerId, options);
            // 渲染节点
            jsonObj.cells.forEach((cell: any) => {
                /**
                 如果节点有链接桩，则不显示
                 **/
                if(cell.ports){
                    cell.ports.groups.top.attrs.circle.r=0
                    cell.ports.groups.bottom.attrs.circle.r=0
                    cell.ports.groups.left.attrs.circle.r=0
                    cell.ports.groups.right.attrs.circle.r=0
                    cell.ports.groups.absolute.attrs.circle.r=0
                }

                // 移除删除按钮
                cell.tools = undefined;

            });
            
            // 加载插件
            loadPlugins(() => {
                // 渲染并注册插件
                canvasConfig.renderJSON(jsonObj, () => {
                    canvasConfig.center();
                    // canvasConfig.zoomToFit();
                });
                // 初始化画布背景
                canvasConfig.setBackground(jsonObj.graph.background);
                // 初始化画布网格
                canvasConfig.showGrid(false);
    
                const  theg = canvasConfig.getGraph()
                const Edges=theg.getEdges()
                console.log(Edges)
                Edges.forEach((edge:any)=>{
                    console.log(edge.attr('targetData'))
                    canvasConfig.edgeAnimation(edge,edge.attr('targetData'))
                })
                // canvasConfig.zoomToFit();
                // setTimeout(() => {
                //     canvasConfig.zoomToFit();
                // }, 1000);
            }, { mode: 'display' });
        }
    }

    return {
        initDisplay, screenName
    }
}