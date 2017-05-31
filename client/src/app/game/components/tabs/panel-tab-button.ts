import { Component, HostListener, OnInit, Input } from '@angular/core';
import { TabsComponent } from './panel-tabs';

@Component({
    selector: 'app-tab-button',
    template: `<div class="app-tab-button" [ngClass]="{'active': active}"><ng-content></ng-content></div>`,
    styleUrls: ['./panel-tab-button.scss']
})
export class TabButtonComponent implements OnInit {
    @Input()
    public active = false;

    constructor(private panelTabs: TabsComponent) {}

    ngOnInit() {
        this.panelTabs.addButton(this);
    }

    @HostListener('click')
    select() {
        this.panelTabs.selectTab(this);
    }
}
