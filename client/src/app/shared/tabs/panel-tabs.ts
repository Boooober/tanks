import { Component } from '@angular/core';
import { TabButtonComponent } from './panel-tab-button';
import { TabContentComponent } from './panel-tab-content';

@Component({
    selector: 'app-panel-tabs',
    template: `<div class="app-panel-tabs"><ng-content></ng-content></div>`,
    styleUrls: ['./panel-tabs.scss']
})
export class TabsComponent {

    tabButton: TabButtonComponent[] = [];
    tabContent: TabContentComponent[] = [];

    addButton(button: TabButtonComponent): void {
        this.tabButton.push(button);
    }

    addContent(content: TabContentComponent): void {
        this.tabContent.push(content);
    }

    selectTab(button: TabButtonComponent): void {
        for (let i = 0; i < this.tabButton.length; i += 1) {
            this.tabButton[i].active = false;
            this.tabContent[i].active = false;
        }
        const index = this.tabButton.indexOf(button);
        this.tabButton[index].active = true;
        this.tabContent[index].active = true;
    }
}
