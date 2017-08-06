import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualDataComponent } from './visual-data.component';

const routes: Routes = [
    {
        path: '',
        component: VisualDataComponent,
        data: { title: 'Game charts' }
    }
];

export const visualDataRoutingComponents = [VisualDataComponent];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class VisualDataRoutingModule {}
