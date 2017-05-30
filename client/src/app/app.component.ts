import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    width: number;
    height: number;

    constructor(private body: ElementRef) {
    }

    ngOnInit() {
        this.onResize();
    }

    @HostListener('window:resize')
    onResize() {
        const { offsetWidth: width, offsetHeight: height } = this.body.nativeElement;
        Object.assign(this, { width, height });
    }
}
