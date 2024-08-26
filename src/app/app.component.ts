import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from "./MyComponents/todos/todos.component";
import { Store } from '@ngrx/store';
import { toggleTheme } from './theme.actions';
import { Observable } from 'rxjs';
import { selectIsDarkMode } from './theme.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodosComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To do list by '; 
  userName: string = 'User'; 

  isDarkMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.isDarkMode$ = this.store.select(selectIsDarkMode);
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
