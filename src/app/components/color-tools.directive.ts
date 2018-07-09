import { Directive, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appColorTools]'
})

export class ColorToolsDirective implements OnInit{



    constructor(
        private activatedroute: ActivatedRoute,
        private router: Router,
        private elRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(({ url }: any) => {
            this.changeColor(url);
        });

    }
    changeColor(url: string) {
        if (url.indexOf('note') > -1) {
            this.elRef.nativeElement.style['background-color'] = 'yellow';
            
        } else if (url.indexOf('archive') > -1) {
            this.elRef.nativeElement.style['background-color'] = 'MediumSlateBlue ';
            this.elRef.nativeElement.style['title']='Archive'; 
        } else if (url.indexOf('reminder') > -1) {
            this.elRef.nativeElement.style['background-color'] = 'pink';
        } else if (url.indexOf('trash') > -1) {
            this.elRef.nativeElement.style['background-color'] = 'RosyBrown';
        } else if(url.indexOf('search') > -1) {
          this.elRef.nativeElement.style['background-color'] = 'blue';
        }
    }

}
