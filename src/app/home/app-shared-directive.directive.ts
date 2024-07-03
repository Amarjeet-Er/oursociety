import { Directive, HostListener } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Directive({
  selector: '[appAppSharedDirective]',
  standalone: true
})
export class AppSharedDirectiveDirective {

  constructor(
    private shared :  SharedService
  ) { }

  @HostListener('click') onClick() {
    this.shared.sharedFunction();
  }
}
