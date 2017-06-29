import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
        BrowserModule,
    ],
    exports: [
        TabsComponent,
        TabButtonComponent,
        TabContentComponent
    ]
})
export class UiComponentsModule {}
