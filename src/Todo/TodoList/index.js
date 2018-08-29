import { observer, inject } from 'mobx-react'
import React from 'react'
import TodoView from '../TodoView/index'
@inject('todoStore')
@observer
class TodoList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {todoStore} = this.props
    return(
      <React.Fragment>
         <span>待办事项总数是: {todoStore.todolistLength}</span>
      <div>
        {todoStore.todos.map((todo,index) => {
          return(
            <TodoView key={index} todo={todo}/>
          )
        })}
      </div>
      <button onClick={todoStore.addTodo.bind(todoStore, '新的任务')}>添加</button>
      </React.Fragment>
     
    )
  }
}
export default TodoList