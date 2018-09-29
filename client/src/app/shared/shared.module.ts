import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogService } from './dialog.service';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';

import { TabsComponent } from './tabs/panel-tabs';
import { TabButtonComponent } from './tabs/panel-tab-button';
import { TabContentComponent } from './tabs/panel-tab-content';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        DialogService,
        CanDeactivateGuard
    ],
    declarations: [
        TabsComponent,
        TabButtonComponent,
        TabContentComponent
    ],
    exports: [
        ReactiveFormsModule,
        TabsComponent,
        TabButtonComponent,
        TabContentComponent
    ]
})
export class

SharedModule {}
