import { Component, HostListener, OnInit, Input } from '@angular/core';
import { TabsComponent } from './panel-tabs';

@Component({
    selector: 'app-panel-tab-button',
    template: `<div class="app-panel-tab-button" [ngClass]="{'active': active}"><ng-content></ng-content></div>`,
    styleUrls: ['./panel-tab-button.scss']
})
export class TabButtonComponent implements OnInit {
    @Input()
    active: boolean = false;

    constructor(
        private panelTabs: TabsComponent
    ) {}

    ngOnInit(): void {
        this.panelTabs.addButton(this);
    }

    @HostListener('click')
    select(): void {
        this.panelTabs.selectTab(this);
    }
}
