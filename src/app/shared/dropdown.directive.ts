import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective  {

  @HostBinding('class.open') addOpen = false;
  @HostListener('document:click', ['$event']) toggleClick(event) {
    this.addOpen =
        this.elRef.nativeElement.contains(event.target) ? !this.addOpen : false;
  }

  constructor(private elRef: ElementRef) {}

}


// isOpen = false;
// constructor(private elRef: ElementRef, private renderer: Renderer2) {}

// @HostListener('click') click(eventData: Event) {
//   if (!this.isOpen) {
//     this.isOpen = ! this.isOpen;
//     this.renderer.addClass(this.elRef.nativeElement, 'open');
//   } else {
//     this.isOpen = ! this.isOpen;
//     this.renderer.removeClass(this.elRef.nativeElement, 'open');

//   }
// }


