// import * as fabric from '@types/fabric';
declare const fabric;
import { Injectable } from '@angular/core';


@Injectable()
export class EditAreaObjectsHelperService {
    private copyBuffer: Array<any> = [];

    addImageObject(canvas: any, src: string, width: number, height: number): void {
        Object.assign(
            new Image(),
            {
                src,
                width,
                height,
                onload() {
                    canvas.add(new fabric.Image(this));
                    canvas.renderAll();
                }
            });
    }

    combineImages(images: Array<HTMLCanvasElement | HTMLImageElement>,
                  width: number,
                  height: number): HTMLCanvasElement {
        const canvas = fabric.document.createElement('canvas');
        Object.assign(canvas, { width, height });
        const context = canvas.getContext('2d');
        images.forEach(image => context.drawImage(image, 0, 0));
        return canvas;
    }

    bringSelectedForward(canvas): void {
        this.getSelected(canvas)
            .forEach(object => canvas.bringForward(object));
    }

    bringSelectedToFront(canvas): void {
        this.getSelected(canvas)
            .forEach(object => canvas.bringToFront(object));
    }

    sendSelectedBackwards(canvas): void {
        this.getSelected(canvas)
            .forEach(object => canvas.sendBackwards(object));
    }

    sendSelectedToBack(canvas): void {
        this.getSelected(canvas)
            .forEach(object => canvas.sendToBack(object));
    }

    copySelected(canvas): Array<any> {
        this.copyBuffer = this.getSelected(canvas)
            .map(object => fabric.util.object.clone(object));
        return this.copyBuffer;
    }

    pasteSelected(canvas): void {
        if (!this.copyBuffer) { return; }

        canvas.discardActiveGroup();
        canvas.discardActiveObject();

        this.copySelected(canvas)
            .forEach(object => {
                object.left += 30;
                object.top += 30;
                object.setCoords();
                object.set('active', true);
                object.set('canvas', canvas);
                canvas.add(object);
            });

        if (this.copyBuffer.length > 1) {
            const group = new fabric.Group(this.copyBuffer, {
                originX: 'center',
                originY: 'center'
            });
            canvas.setActiveGroup(group.setCoords()).renderAll();
        }
    }

    deleteSelected(canvas): void {
        this.getSelected(canvas)
            .forEach(object => canvas.remove(object));
    }

    private getSelected(canvas): Array<any> {
        const objects = [];
        const activeGroup = canvas.getActiveGroup();
        const activeObject = canvas.getActiveObject();

        if (activeGroup) {
            objects.push(...activeGroup.getObjects());
        } else if (activeObject) {
            objects.push(activeObject);
        } else {
            return this.copyBuffer;
        }
        return objects;
    }
}
