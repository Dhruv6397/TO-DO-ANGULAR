import { Component, Output,EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Todo } from '../../Todo';
import { v4 as uuidv4 } from 'uuid'; 
@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  title:string='';
  desc:string='';
  dueDate:string='';
  priority:number=0
  @Output() todoAdd :EventEmitter<Todo> = new EventEmitter()
  
  onSubmit(){
    console.log("onsubmit triggered")
    const todo = {
      sno:uuidv4(),
      title:this.title,
      desc:this.desc,
      active:true,
      dueDate:this.dueDate,
      priority:this.priority,
      editing: false,
      history:[`Task created on ${new Date().toLocaleString()}`]
    }
    this.todoAdd.emit(todo)
  }
}
