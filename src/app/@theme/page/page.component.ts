import { Component, Input, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'ngx-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.fl-page]': 'true',
  },
})
export class PageComponent implements AfterViewInit {
    private readonly routeChange: Subscription | undefined;
  constructor(private router: Router) {
    this.routeChange = router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe(event => {
        setTimeout(() => this.ngAfterViewInit(), 100); // TODO refactor to check of changes
    });
  }

  tabset: Element;
  tabsetTabs: Element;
  page: Element;
  pageActions: Element;

  ngAfterViewInit(): void {
    this.tabset = document.getElementsByTagName('nb-route-tabset')[0];
    if (this.tabset) {
      this.tabsetTabs = this.tabset.firstChild as Element;
      this.page = this.tabset.lastChild as Element;
      this.pageActions = this.page.firstChild as Element;
      if (
        this.pageActions?.classList?.contains('page-actions') &&
        this.pageActions.innerHTML !== ''
      ) {
        (this.page as HTMLElement).style.transition = '0.1s';
        this.onResize();
      }
    }
  }

  @Input() title: string = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (
      this.tabset &&
      this.pageActions &&
      this.pageActions?.classList?.contains('page-actions') &&
      this.pageActions.innerHTML !== ''
    ) {
      const fWidth = this.tabset.getBoundingClientRect().width;
      const tWidth = this.tabsetTabs.getBoundingClientRect().width;
      const aWidth = this.pageActions.getBoundingClientRect().width;
      if (tWidth + aWidth > fWidth) {
        (this.page as HTMLElement).style.marginTop = '0';
      } else {
        (this.page as HTMLElement).style.marginTop = '-55px';
      }
    }
  }
}
