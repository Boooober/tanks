// import * as fabric from '@types/fabric';
declare const fabric;
import { Injectable } from '@angular/core';

@Injectable()
export class EditAreaBrushHelperService {
    private canvas;
    private drawingOptions = {
        brushSize: 5,
        texture: {} as {
            src: string;
            width: number;
            height: number;
        }
    };

    enableDrawingMode(): void {
        this.canvas.isDrawingMode = true;
    }

    disableDrawingMode(): void {
        this.canvas.isDrawingMode = false;
    }

    isDrawingModeEnabled(): boolean {
        return this.canvas.isDrawingMode;
    }

    setDrawingCanvas(canvas): void {
        this.canvas = canvas;
    }

    updateOptions(options): void {
        Object.assign(this.drawingOptions, options);
        this.updateDrawingBrush();
    }

    incrementBrushSize() {
        this.drawingOptions.brushSize += this.drawingOptions.brushSize >= 10 ? 5 : 1;
        this.updateDrawingBrush();
    }

    decrementBrushSize(): void {
        if (this.drawingOptions.brushSize === 1) {
            return;
        }
        this.drawingOptions.brushSize -= this.drawingOptions.brushSize >= 10 ? 5 : 1;
        this.updateDrawingBrush();
    }

    updateDrawingBrush(): void {
        const patternCanvas = fabric.document.createElement('canvas');
        const patternContext = patternCanvas.getContext('2d');
        const { src, width, height } = this.drawingOptions.texture;
        Object.assign(patternCanvas, { width, height });
        Object.assign(new Image(), {
            src,
            onload() {
                patternContext.drawImage(this, 0, 0);
            }
        });
        this.canvas.freeDrawingBrush = Object.assign(
            new fabric.PatternBrush(this.canvas),
            {
                source: patternCanvas,
                width: this.drawingOptions.brushSize
            }
        );
    }
}
