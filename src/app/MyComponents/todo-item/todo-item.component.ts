import { Input,Component, Output,EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!:Todo;
  @Output() todoDelete:EventEmitter<Todo> = new EventEmitter();
  onClick(todo:Todo){
    this.todoDelete.emit(todo)
    console.log("onclick has been triggered")
  }
}
