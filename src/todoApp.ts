export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoApp {
  private todos: Todo[] = [];

  // Tambah todo baru
  addTodo(text: string): Todo {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // Dapatkan semua todo
  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  // Toggle status todo (complete/incomplete)
  toggleTodo(id: string): Todo | null {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return null;
    
    todo.completed = !todo.completed;
    return todo;
  }
}