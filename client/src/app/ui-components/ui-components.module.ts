import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from './dialog.service';

import { TabsComponent } from './tabs/panel-tabs';
import { TabButtonComponent } from './tabs/panel-tab-button';
import { TabContentComponent } from './tabs/panel-tab-content';

@NgModule({
    declarations: [
        TabsComponent,
        TabButtonComponent,
        TabContentComponent
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        DialogService
    ],
    exports: [
        TabsComponent,
        TabButtonComponent,
        TabContentComponent
    ]
})
export class UiComponentsModule {}
