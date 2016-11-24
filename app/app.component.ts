import { Component, ElementRef, Inject, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'my-app',
  template: `Enter Date: <div id="multiDatesPicker"></div>`,
})
export class AppComponent  {
	elementRef: ElementRef;

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        jQuery(this.elementRef.nativeElement).find("#multiDatesPicker").multiDatesPicker({
			numberOfMonths: [3,4],
			defaultDate:"1/1/2016"
		});
    }
}