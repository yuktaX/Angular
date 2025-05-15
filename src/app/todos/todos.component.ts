import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal(<Array<Todo>>[]); //use signal to render
  searchTerm = signal(''); //use signal to render

  ngOnInit(): void {
    this.todoService
      .getTodosFromApi() //returns an obseravable, handled differently for promises
      .pipe(
        catchError((error) => {
          console.error('Error fetching todos:', error);
          throw error;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos); //set the value of the signal
        console.log('Todos fetched:', todos);
      }); //called everytime page is loaded
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }
}
