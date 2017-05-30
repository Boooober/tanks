import { Component } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
    isOpened = false;

    toggle(): void {
        this.isOpened = !this.isOpened;
    }
}
