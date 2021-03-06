import { Component, OnInit, Input } from '@angular/core';
import { TabsComponent } from './panel-tabs';

@Component({
    selector: 'app-panel-tab-content',
    template: `<div class="app-panel-tab-content" [hidden]="!active"><ng-content></ng-content></div>`,
    styleUrls: ['./panel-tab-content.scss']
})
export class TabContentComponent implements OnInit {
    @Input()
    public active = false;

    constructor(private panelTabs: TabsComponent) {}

    ngOnInit() {
        this.panelTabs.addContent(this);
    }
}
