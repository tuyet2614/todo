import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useState } from "react";

function App() {
  const [newContent, setNewContent] = useState({})
  const [newDate, setNewDate] = useState(Date())
  const [todoList, setTodoList] = useState([
        {
            id: 1,
            content: "do homeword",
            date: 12,
            action: false,
        },
        {
            id: 2,
            content: "metting",
            date: 12,
            action: false,
        },
        {
            id: 3,
            content: "clean house",
            date: 12,
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
      id: todoList.length + 1,
      content: content,
      date: 16,

    }
    setTodoList([...todoList,{...newTodo}])
  }
  return (
    <div className="App">
      <header className="App-header">
        <ListTodo 
          todoList = {todoList}
          newContent = {newContent}
          handleOnclick = {handleOnclick}
          handleOnChange = {handleOnChange}
        />
      </header>
    </div>
  );
}

export default App;
