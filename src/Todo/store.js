
import { observable,action,computed, autorun } from 'mobx';
class TodoStore {
  constructor(){
    autorun(() => console.log(this.report) )
  }
  @observable todos = []
  @action addTodo(task){
    this.todos.push({
      task: task,
      completed: false
    })
  }
  @computed get todolistLength(){
      return this.todos.length
  } 
  @computed  get report(){
    if (this.todolistLength === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}".`
  }
}
export default TodoStore