import { Component } from '@angular/core';
import { TabButtonComponent } from './panel-tab-button';
import { TabContentComponent } from './panel-tab-content';

@Component({
    selector: 'app-panel-tabs',
    template: `<div class="app-panel-tabs"><ng-content></ng-content></div>`,
    styleUrls: ['./panel-tabs.scss']
})
export class TabsComponent {
    public tabButton: TabButtonComponent[] = [];
    public tabContent: TabContentComponent[] = [];

    addButton(button: TabButtonComponent) {
        this.tabButton.push(button);
    }

    addContent(content: TabContentComponent) {
        this.tabContent.push(content);
    }

    selectTab(button: TabButtonComponent) {
        for (let i = 0; i < this.tabButton.length; i++) {
            this.tabButton[i].active = false;
            this.tabContent[i].active = false;
        }
        const index = this.tabButton.indexOf(button);
        this.tabButton[index].active = true;
        this.tabContent[index].active = true;
    }
}
