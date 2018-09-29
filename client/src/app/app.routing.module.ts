import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundPreloading } from './core/loading-strategies/background.preloading';

const routes: Routes = [];

@NgModule({
    providers: [
        BackgroundPreloading
    ],
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: BackgroundPreloading })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
