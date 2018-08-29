import { observer } from 'mobx-react'
import React from 'react'
@observer
class TodoView extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {todo} = this.props
    return(
      <li>{todo.task}</li>
    )
  }
}
export default TodoView