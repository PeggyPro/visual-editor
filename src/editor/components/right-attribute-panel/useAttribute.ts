/*
 * @Author: chaoxiaoshu-mx leukotrichia@163.com
 * @Date: 2024-09-03 20:23:58
 * @LastEditors: chaoxiaoshu-mx leukotrichia@163.com
 * @LastEditTime: 2024-09-05 21:38:09
 * @FilePath: \visual-editor\src\editor\components\right-attribute-panel\useAttribute.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanvasConfig } from "@/editor/config";
import * as Common from '@/common';

/**
 * @author cxs
 * @date 2023-05-25
 * @description 属性面板逻辑
 * @returns 
 */
export const useAttribute = () => {

    const onCanvasAttrChange = (data: any) => {
        const canvasConfig: ICanvasConfig = CanvasConfig.getInstance();
        canvasConfig.showGrid(data.showGrid);
        canvasConfig.setGridSize(data.gridSize);
        canvasConfig.showRuler(data.showRuler);
        const background = {
            color: data.backgroundColor,
            image:data.backgroundImage,
            showImage: false,
            repeat: 'no-repeat',
            position: 'center',
            size: 'auto auto',
            opacity: 1,
            angle: 20,
          }
        canvasConfig.setBackground(background);
        setTimeout(() => {
            const json = canvasConfig.toJSON();
            localStorage.setItem(Common.STORAGE_JSON_DATA_KEY, JSON.stringify(json));
        }, 200);
    }

    return {
        onCanvasAttrChange
    }

}