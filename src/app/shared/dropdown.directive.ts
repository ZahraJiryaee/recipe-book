import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
} // close the dropdown by clicking anywhere in the document

// export class DropdownDirective {
//   @HostBinding('class.open') isOpen = false;
//   @HostListener('click') toggleOpen() {
//     this.isOpen = !this.isOpen;
//   }
//   constructor() {}

// } ** close the dropdown by clicking on the dropdown again

//add some functionality to it which allows us to add a certain css class to th element it sits on
//sinced it's clicked & remove the class once we clicks a again.
