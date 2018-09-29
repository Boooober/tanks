import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/index';
import { filter, map, switchMap } from 'rxjs/internal/operators';

@Component({
    selector: 'body', // tslint:disable-line
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    width: number;
    height: number;

    private routerSubscription: Subscription = new Subscription();

    constructor(
        private body: ElementRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private metaService: Meta
    ) {}

    ngOnInit(): void {
        this.onResize();
        this.setPageTitleAndMeta();
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    @HostListener('window:resize')
    onResize(): void {
        const { offsetWidth: width, offsetHeight: height } = this.body.nativeElement;
        Object.assign(this, { width, height });
    }

    setPageTitleAndMeta(): void {
        this.routerSubscription = this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route: ActivatedRoute) => {
                let parentRoute: ActivatedRoute = route;
                while (parentRoute.firstChild) {
                    parentRoute = route.firstChild;
                }
                return parentRoute;
            }),
            filter((route: ActivatedRoute) => route.outlet === 'primary'),
            switchMap((route: ActivatedRoute) => route.data)
        ).subscribe((data: any) => {
            this.metaService.addTags(data.meta);
            this.titleService.setTitle(data.title);
        });
    }
}
