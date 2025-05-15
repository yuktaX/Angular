import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../greeting/greeting.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = signal('My Angular App');
}
