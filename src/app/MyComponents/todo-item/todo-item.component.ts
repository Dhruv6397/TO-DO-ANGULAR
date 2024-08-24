import { Input, Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdate: EventEmitter<Todo> = new EventEmitter();

  edit(todo: Todo) {
    todo.editing = true;
  }

  save(todo: Todo) {
    if (todo.editing) {
      todo.history.push(`Task edited and saved on ${new Date().toLocaleString()}`);
      todo.editing = false;
      this.todoUpdate.emit(todo);
    }
  }

  cancel(todo: Todo) {
    todo.editing = false;
  }

  onClick(todo: Todo) {
    todo.history.push(`Task deleted on ${new Date().toLocaleString()}`);
    this.todoDelete.emit(todo);
  }

  toggleHistory(todo: any): void {
    todo.showHistory = !todo.showHistory;
}
isMobileView(): boolean {
  return window.innerWidth <= 767;
}


}
