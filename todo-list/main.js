new Vue({
  el: "#app",
  data: {
    title: 'TODOS: ',
    todos: [
    ]
  },
  methods: {
    addTodo(e) {
      const text = e.target.value;
      this.todos.push( {text, done: false, id: Date.now()} );
      e.target.value = '';
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    check(todo) {
      todo.done = !todo.done;
    }
  }
})
