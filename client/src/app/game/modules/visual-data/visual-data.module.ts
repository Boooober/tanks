import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SelectModule } from 'ng2-material-select';

import { VisualDataRoutingModule, visualDataRoutingComponents } from './visual-data.routing.module';
import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
    declarations: [
        ChartsComponent,
        visualDataRoutingComponents
    ],
    imports: [
        FormsModule,
        CommonModule,
        Ng2SelectModule,
        VisualDataRoutingModule
    ],
    providers: []
})
export class VisualDataModule {}
