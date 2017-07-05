import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'body', // tslint:disable-line
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    width: number;
    height: number;

    private routerSubscription: Subscription;

    constructor(private body: ElementRef,
                private Router: Router,
                private ActivatedRoute: ActivatedRoute,
                private TitleService: Title,
                private MetaService: Meta) {
    }

    ngOnInit() {
        this.onResize();
        this.setPageTitleAndMeta();
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    @HostListener('window:resize')
    onResize() {
        const { offsetWidth: width, offsetHeight: height } = this.body.nativeElement;
        Object.assign(this, { width, height });
    }

    setPageTitleAndMeta() {
        this.routerSubscription = this.Router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.ActivatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .switchMap(route => route.data)
            .subscribe(
                data => {
                    this.MetaService.addTags(data['meta']);
                    this.TitleService.setTitle(data['title'])
                }
            );
    }
}
