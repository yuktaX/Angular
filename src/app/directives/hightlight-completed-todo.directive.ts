import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHightlightCompletedTodo]',
  standalone: true,
})
export class HightlightCompletedTodoDirective {
  isCompleted = input(false);
  el = inject(ElementRef);
  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  });
}
