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

  downloadCSV() {
    const header = 'Sno,Title,Description,Due Date,Priority,Status,History\n';
    const rows = this.todos.map(todo => 
      `${todo.sno},"${todo.title}","${todo.desc}",${todo.dueDate},${todo.priority},${todo.active ? 'Active' : 'Completed'},"${todo.history.join('; ')}"`
    );
    const csvContent = header + rows.join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'todos.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
