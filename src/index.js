
import React from 'react';
import { Provider } from 'mobx-react'
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './Todo/TodoList/index.js'
// import {observableTodoStore, TodoList} from './Test/index'
import TodoStore from './Todo/store'

const todoStore = new TodoStore()
const appStore = new TodoStore()
const store = {
  todoStore,
  appStore
}
class App extends React.Component{
  
  render(){
    return <Provider {...store}><TodoList/></Provider> 
  }
}
ReactDOM.render( <App />, document.getElementById('root'));
