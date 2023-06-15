import { CanvasConfig, StencilConfig } from '../config';
import * as Common from '@/common';
import { Graph } from '@antv/x6';
import { Stencil } from "@antv/x6-plugin-stencil";
import { getDropPicComponent } from '../components/canvas-editor/DropPicComponent';
/**
 * @author cxs
 * @date 2023-04-28
 * @update 2023-05-24
 * @description 左侧组件列表
 * @returns 
 */
export const useStencil = () => {

    /**
     * 初始化左侧组件列表
     * @param plugins 
     */
    const initStencil = (plugins: any, picPlugins?: any) => {
        console.log('=================initStencil===================');
        const graph: Graph = getGraph();
        const { groups, nodeMap } = createStencilNode(plugins, graph);
        // 基础图形
        createStencilBaseNode(groups, nodeMap, graph);
        console.log('initStencil.nodeMap', groups, nodeMap)
        let groupList: Stencil.Group[] = groups.map((group: string) => getGroup(group));
        const stencilConfig: IStencilConfig = getStencilConfig(groupList);
        nodeMap.forEach((nodes: any[], key: string) => {
            stencilConfig.getStencil().load(nodes, key);
        });
        console.log('=================initStencil===================');
    }

    /**
     * 创建左侧列表上的图标
     * @param plugins 
     * @param graph 
     * @returns 
     */
    const createStencilNode = (plugins: any, graph: Graph) => {
        let nodeMap: Map<string, any[]> = new Map<string, any[]>();
        let groups: string[] = [];
        let nodeList: any[] = [];
        for (const key in plugins) {
            const plugin = plugins[key];
            const { views } = plugin.default;
            views.forEach((view: any) => {
                if (groups.indexOf(view.group) === -1) {
                    groups.push(view.group);
                }
                const node = graph?.createNode({
                    shape: 'image',
                    x: 40,
                    y: 40,
                    width: 40,
                    height: 40,
                    data: {
                        name: view.name
                    },
                    imageUrl: view.icon
                })
                if (!nodeMap.has(view.group)) {
                    nodeList = [];
                    nodeList.push(node);
                } else {
                    nodeList.push(node);
                }
                nodeMap.set(view.group, nodeList);
            })
        }

        return {
            groups,
            nodeMap
        }
    }

    const commonAttrs = {
        body: {
            fill: 'transparent',
            stroke: '#000',
            strokeWidth: 2,
            rx: 6,
            ry: 6,
        },
        label: {
            text: '',
            refX: 0.5,
            refY: '100%',
            refY2: 4,
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
        }
    }
    
    const baseNode = [

        {
            shape: "rect",
            width: 40,
            height: 40,
            label: "矩形",
            attrs: commonAttrs
        },
        {
            shape: "circle",
            width: 40,
            height: 40,
            label: "圆形",
            attrs: commonAttrs
        },
        {
            shape: "ellipse",
            width: 40,
            height: 20,
            label: "椭圆",
            attrs: commonAttrs
        },
        {
            shape: 'polygon',
            width: 40,
            height: 40,
            points: '100,10 40,198 190,78 10,78 160,198',
            label: '多边形',
            attrs: commonAttrs
        },
        {
            shape: 'polygon',
            width: 40,
            height: 40,
            points: '17,182 109,23 199,182',
            label: '三角形',
            attrs: commonAttrs
        },
        {
            shape: 'polygon',
            width: 40,
            height: 40,
            points: '80,0 80,60 200,60 200,140 80,140 80,200 0,100',
            label: '左箭头',
            attrs: commonAttrs
        },
        {
            shape: 'polygon',
            width: 40,
            height: 40,
            points: '0,20 60,20 60,0 100,50 60,100 60,80 0,80',
            label: '右箭头',
            attrs: commonAttrs
        }
    ]
    const createStencilBaseNode = (groups: any, nodeMap: any, graph: any) => {
        console.log('createStencilBaseNode.nodeMap', groups, nodeMap)
        const groupName = '基础图形';
        groups.unshift(groupName);
        const nodeList: any[] = [];
        baseNode.forEach((item: any) => {
            const node = graph.createNode(item);
            nodeList.push(node);
        });

        nodeMap.set(groupName, nodeList);

    }


    /**
     * 获取画布上下文
     * @returns 
     */
    const getGraph = (): Graph => {
        const canvasConfig: ICanvasConfig = CanvasConfig.getInstance();
        const graph: Graph = canvasConfig.getGraph();
        return graph;
    }

    /**
     * 获取Stencil管理器
     * @param groupList 
     * @returns 
     */
    const getStencilConfig = (groupList: Stencil.Group[]): IStencilConfig => {
        const graph = getGraph();
        const stencilConfig: IStencilConfig = StencilConfig.getInstance(graph, groupList, Common.DEFAULT_STENCIL_CONTAINER_ID);
        return stencilConfig;
    }

    const getGroup = (name: string): Stencil.Group => {
        return {
            name: name,
            title: name,
            collapsable: true,
            collapsed: true
        }
    }

    return {
        initStencil
    }

}



