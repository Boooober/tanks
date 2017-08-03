import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SelectModule } from 'ng2-material-select';
import { EditToolbarComponent } from './components/edit-toolbar/edit-toolbar.component';

import { EditorRoutingModule, editorRoutingComponents } from './editor.routing.module';
import { EditAreaComponent } from './components/edit-area/edit-area.component';

@NgModule({
    declarations: [
        EditAreaComponent,
        EditToolbarComponent,
        editorRoutingComponents
    ],
    imports: [
        FormsModule,
        CommonModule,
        Ng2SelectModule,
        EditorRoutingModule
    ],
    providers: []
})
export class EditorModule {}
