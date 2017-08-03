// import * as fabric from '@types/fabric';
declare const fabric;
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppComponent } from '../../../../../app.component';

import { EditAreaBrushHelperService } from './edit-area-brush.helper.service';
import { EditAreaObjectsHelperService } from './edit-area-objects.helper.service';
import { EditToolbarComponent } from '../edit-toolbar/edit-toolbar.component';

import { VIRTUAL_KEY_CODES as KEY } from '../../../../../../../../common/constants/virtual-key-codes.constant';

import objects from '../../assets/objects';
import textures from '../../assets/textures';


@Component({
    selector: 'app-edit-area',
    providers: [
        EditAreaBrushHelperService,
        EditAreaObjectsHelperService
    ],
    templateUrl: './edit-area.component.html',
    styleUrls: ['./edit-area.component.scss']
})
export class EditAreaComponent implements OnInit {
    @ViewChild('canvas') canvasEl: ElementRef;
    @ViewChild('drawingCanvas') drawingCanvasEl: ElementRef;
    @ViewChild('toolbar') toolbar: EditToolbarComponent;

    public filename = 'tanx_map.png';

    private canvas: any;
    private drawingCanvas: any;
    private ctrlPressed = false;
    private shiftPressed = false;

    constructor(private App: AppComponent,
                private EditAreaBrushHelperService: EditAreaBrushHelperService,
                private EditAreaObjectsHelperService: EditAreaObjectsHelperService) {
    }

    ngOnInit(): void {
        this.canvas = new fabric.Canvas(this.canvasEl.nativeElement);
        this.drawingCanvas = new fabric.Canvas(this.drawingCanvasEl.nativeElement);
        this.toolbar.onObjectAdd.subscribe(object => this.addObject(object));
        this.toolbar.onTextureChange.subscribe(texture => this.changeTexture(texture));
        this.toolbar.onFreeDrawModeChange.subscribe(drawingMode => this.changeDrawingMode(drawingMode));
        this.toolbar.onSaveCanvas.subscribe(trigger => this.saveCanvas(trigger));
        this.resizeCanvases();
        this.initDrawingCanvas();
    }

    addObject(name): void {
        const { image, width, height } = objects.find(({ value }) => value === name);
        this.EditAreaObjectsHelperService.addImageObject(
            this.canvas,
            image, width, height
        );
    }

    changeTexture(name): void {
        const { image: src, width, height } = textures.find(({ value }) => value === name);
        this.EditAreaBrushHelperService.updateOptions({
            texture: { src, width, height }
        });
    }

    changeDrawingMode(drawingMode): void {
        drawingMode
            ? this.EditAreaBrushHelperService.enableDrawingMode()
            : this.EditAreaBrushHelperService.disableDrawingMode();
    }

    isDrawingModeEnabled(): boolean {
        return this.EditAreaBrushHelperService.isDrawingModeEnabled();
    }

    saveCanvas(trigger: HTMLAnchorElement): void {
        const { width, height } = this.canvas;
        const canvas = this.EditAreaObjectsHelperService.combineImages(
            [
                this.drawingCanvas.getElement(),
                this.canvas.getElement()
            ],
            width, height
        );
        const dataURL = canvas
            .toDataURL('image/png')
            /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
            .replace(/^data:image\/[^;]*/, 'data:application/octet-stream')
            /* Define HTTP-style headers */
            .replace(
                /^data:application\/octet-stream/,
                `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=${this.filename}`
            );

        trigger.download = this.filename;
        trigger.href = dataURL;
    }

    @HostListener('window:keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case KEY.SHIFT:
                this.shiftPressed = false;
                break;
            case KEY.CTRL:
                this.ctrlPressed = false;
                break;
        }
    }

    @HostListener('window:keydown', ['$event'])
    private onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case KEY.DEL:
                this.EditAreaObjectsHelperService.deleteSelected(this.canvas);
                break;
            case KEY.SHIFT:
                this.shiftPressed = true;
                break;
            case KEY.CTRL:
                this.ctrlPressed = true;
                break;
            case KEY.C:
                if (this.ctrlPressed) {
                    this.EditAreaObjectsHelperService.copySelected(this.canvas);
                }
                break;
            case KEY.V:
                if (this.ctrlPressed) {
                    this.EditAreaObjectsHelperService.pasteSelected(this.canvas);
                }
                break;
            case KEY[']'] || KEY['}']:
                if (this.ctrlPressed && this.shiftPressed) {
                    this.EditAreaObjectsHelperService.bringSelectedToFront(this.canvas);
                    break;
                }
                if (this.ctrlPressed) {
                    this.EditAreaObjectsHelperService.bringSelectedForward(this.canvas);
                    break;
                }
                if (this.isDrawingModeEnabled()) {
                    this.EditAreaBrushHelperService.incrementBrushSize();
                    break;
                }
                break;
            case KEY['['] || KEY['{']:
                if (this.ctrlPressed && this.shiftPressed) {
                    this.EditAreaObjectsHelperService.sendSelectedToBack(this.canvas);
                    break;
                }
                if (this.ctrlPressed) {
                    this.EditAreaObjectsHelperService.sendSelectedBackwards(this.canvas);
                    break;
                }
                if (this.isDrawingModeEnabled()) {
                    this.EditAreaBrushHelperService.decrementBrushSize();
                    break;
                }
                break;
        }
    }

    @HostListener('window:resize')
    private resizeCanvases(): void {
        const { width, height } = this.App;
        [
            this.canvas,
            this.drawingCanvas
        ].forEach(canvas => {
            canvas.setHeight(height);
            canvas.setWidth(width);
            canvas.renderAll();
        });
    }

    private initDrawingCanvas(): void {
        this.EditAreaBrushHelperService.setDrawingCanvas(this.drawingCanvas);
    }
}
