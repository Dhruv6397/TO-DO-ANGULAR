import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Todo } from '../../Todo';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule to imports
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  title: string = '';
  desc: string = '';
  dueDate: string = '';
  priority: number = 1;
  
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  
  onSubmit() {
    if (this.title && this.desc && this.dueDate && this.priority) {
      const todo: Todo = {
        sno: uuidv4(),
        title: this.title,
        desc: this.desc,
        active: true,
        dueDate: this.dueDate,
        priority: this.priority,
        editing: false,
        history: [`Task created on ${new Date().toLocaleString()}`]
      };
      this.todoAdd.emit(todo);
      console.log('Todo added:', todo);

      // Reset form fields after submission
      this.title = '';
      this.desc = '';
      this.dueDate = '';
      this.priority = 1;
    } else {
      console.log('Please fill out all fields');
    }
  }
}
