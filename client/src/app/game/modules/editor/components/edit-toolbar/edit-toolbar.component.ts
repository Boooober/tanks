import {
    Component,
    OnInit,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import { Ng2Select } from 'ng2-material-select/dist/src/ng2-select'

import textures from '../../assets/textures';
import objects from '../../assets/objects';


@Component({
    selector: 'app-edit-toolbar',
    templateUrl: './edit-toolbar.component.html',
    styleUrls: ['./edit-toolbar.component.scss']
})
export class EditToolbarComponent implements OnInit {
    @ViewChild('objectSelect') objectSelect: Ng2Select;
    @ViewChild('textureSelect') textureSelect: Ng2Select;
    @Output() onObjectAdd: EventEmitter<string> = new EventEmitter<string>();
    @Output() onTextureChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() onFreeDrawModeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onSaveCanvas: EventEmitter<boolean> = new EventEmitter<boolean>();

    texture = 'ground';
    textures = textures;
    object = null;
    objects = objects;
    isFreeDraw = false;

    ngOnInit(): void {
        this.onTextureChange.next(this.texture);
        this.objectSelect.onChange.subscribe(({ value }) => this.onObjectAdd.next(value));
        this.textureSelect.onChange.subscribe(({ value }) => this.onTextureChange.next(value));
    }

    toggleFreeDraw(): void {
        this.isFreeDraw = !this.isFreeDraw;
        this.onFreeDrawModeChange.next(this.isFreeDraw);
    }

    saveCanvas($event): void {
        this.onSaveCanvas.next($event.target);
    }
}
