import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddTodoComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor() {}
 
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const localItem = localStorage.getItem('todos');
      this.todos = localItem ? JSON.parse(localItem) : [];
    }
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t !== todo);
    this.saveToLocalStorage();
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveToLocalStorage();
  }

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex(t => t.sno === updatedTodo.sno);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.saveToLocalStorage();
    }
  }

  sortByPriority() {
    this.todos.sort((a, b) => a.priority - b.priority);
  }

  sortByDate() {
    this.todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}
