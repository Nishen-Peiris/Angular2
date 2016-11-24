import { Component, ElementRef, Inject, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'my-app',
  template: `<input type="text" class="amount" required placeholder="Enter a name here">
			<div class="slider"></div>
			<h2>slideValue = {{slideValue}}</h2>`,
})
export class AppComponent  {
	name = 'Angular';
	elementRef: ElementRef;
    slideValue: number;

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        var $amount = jQuery(this.elementRef.nativeElement).find(".amount");
        jQuery(this.elementRef.nativeElement).find(".slider").slider({
            range: false,
            orientation: "vertical",
            min: 0,
            max: 100,
            value: 60,
            slide: (event:any, ui:any) => {
                this.slideValue = ui.value;
                $amount.val(ui.value);
            }
        });
    }
}