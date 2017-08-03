import { NgModule,  } from '@angular/core';
import { CommonModule,  } from '@angular/common';



import { DialogService } from './dialog.service';

import tabs from './tabs';

@NgModule({
    declarations: [
        tabs
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        DialogService
    ],
    exports: [
        tabs
    ]
})
export class UiComponentsModule {}
