import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useState } from "react";
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Routes,
  Link
} from "react-router-dom";
import SignUp from './components/signUp';

function App() {

  const [newContent, setNewContent] = useState({})
  const [newDate, setNewDate] = useState(new Date().toLocaleDateString())
  const [isShow, setIsShow] = useState(false)
  const handleOnShow = () => setIsShow(true)
  
  const [todoList, setTodoList] = useState([
        {
            id: 1,
            content: "do homeword",
            date: newDate,
            action: false,
        },
        {
            id: 2,
            content: "metting",
            date: newDate,
            action: false,
        },
        {
            id: 3,
            content: "clean house",
            date: newDate,
            action: false,
        }
    ])

  const handleOnChange = (e) => {
    setNewContent(e.target.value)
    console.log(e.target.value)
    
  }

  const handleOnclick = (content) => {
    if (!content){

    }
    let newTodo = {
      id: Math.floor(Math.random()*100),
      content: content,
      date: newDate,

    }

    setTodoList([...todoList,{...newTodo}])
    setIsShow(false)
  }
  const handleDelete = (todo) => {
    
    let newTodo = todoList.filter(item => item.id !== todo.id)
    setTodoList(newTodo)
    console.log(todo)
  }
  const keyDownHandler = (event, todo) => {
    if (event.key === 'Enter') {
      const TodoItem = todoList.find(item => item.id === todo.id)
    setTodoList(
      todoList.map(item => item.id === todo.id ? {...TodoItem, content: event.target.value} : item)
    )
    }
}
  const handleEditTodo = (todo,e) => {
    const TodoItem = todoList.find(item => item.id === todo.id)
    setTodoList(
      todoList.map(item => item.id === todo.id ? {...TodoItem, content: e.target.value} : item)
    )
  }
  const DoneTodo = (todo) => {
    let todoChange = todoList.find((item) => item.id === todo.id)
    setTodoList(
    todoList.map((item) => item.id === todo.id ? {...todoChange, color: "blue"} : item))
    
  }

  const failTodo = (todo) => {
    let todoChange = todoList.find((item) => item.id === todo.id)
    setTodoList(
    todoList.map((item) => item.id === todo.id ? {...todoChange, color: "red"} : item))
  }
  return (
    <div className="App">
      <header className="App-header">
        <Router> 
          <Routes>
            
            <Route path="/Signup" element={<SignUp />}>
              {/* <Login /> */}
            </Route>
            <Route path="/login" element={<Login />}>
              
            </Route>
            <Route path="/TodoList" 
            element={<ListTodo 
                todoList = {todoList}
                newContent = {newContent}
                handleOnclick = {handleOnclick}
                handleOnChange = {handleOnChange}
                isShow = {isShow}
                handleOnShow = {handleOnShow}
                handleDelete = {handleDelete}
                DoneTodo = {DoneTodo}
                failTodo = {failTodo}
                handleEditTodo = {handleEditTodo}
                keyDownHandler = {keyDownHandler}
            />}>
            </Route>
          </Routes>
          
          
        </Router>
        
        
      </header>
    </div>
  );
}

export default App;
