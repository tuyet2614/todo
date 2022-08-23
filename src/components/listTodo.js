import { useEffect, useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";

const ListTodo = (props) => {
    
    const [listItem, setListItem] = useState([])
    const DoneTodo = (todo) => {
        let todoChange = listItem.find((item) => item._id === todo._id)
        setListItem(
        listItem.map((item) => item._id === todo._id ? {...todoChange, color: "blue"} : item))
        
    }

    const failTodo = (todo) => {
        let todoChange = listItem.find((item) => item._id === todo._id)
        setListItem(
        listItem.map((item) => item._id === todo._id ? {...todoChange, color: "red"} : item))
    }

    const handleDelete = (todo) => {
    
        let newTodo = listItem.filter(item => item._id !== todo._id)
        setListItem(newTodo)
        console.log(todo)
    }

    const keyDownHandler = (event, todo) => {
    if (event.key === 'Enter') {
      const TodoItem = listItem.find(item => item._id === todo._id)
    setListItem(
      listItem.map(item => item._id === todo._id ? {...TodoItem, description: event.target.value} : item)
    )
    }
  }
  const [isShow, setIsShow] = useState(false)
  const handleOnShow = () => setIsShow(true)
  const [content, setNewContent] = useState('')
  const token = sessionStorage.getItem('token')
  
  const [todoList, setTodoList] = useState([])

  const handleOnChange = (e) => {
    setNewContent(e.target.value)
    console.log(content)
  }

  const handleOnclick = (e) => {
    e.preventDefault();
    console.log(token)
    
    axios.post(`https://api-nodejs-todolist.herokuapp.com/task`, {
      
      "description": content,
      
    }, {
    
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      },
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      handleShow()
    })
    .catch(error => console.log(error));

    // setTodoList([...todoList,{...newTodo}])
    setIsShow(false)
  }
  
  const handleEditTodo = (todo,e) => {
    const TodoItem = listItem.find(item => item._id === todo._id)
    setListItem(
      listItem.map(item => item._id === todo._id ? {...TodoItem, description: e.target.value} : item)
    )
  }

    const handleShow = async() => {
    
        await axios.get(`https://api-nodejs-todolist.herokuapp.com/task`, {

            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            
            console.log(res);
            console.log(res.data);
            console.log("data: " + (res.data.data))
            setListItem(res.data.data)
            console.log("hello : " + listItem)
        })
        .catch(error => console.log(error));
    }
    useEffect(() => {
        handleShow()
    },[])
    
    return(
        <div className="mainList">
            <div className="add_button">
                
                
                {isShow?<AddTodo 
                handleOnclick = {handleOnclick}
                content = {content}
                handleOnChange = {handleOnChange}
                /> :
                <button onClick={() => handleOnShow()}>create</button>}
            </div>
            <div className="list_todo">
                <div>
                    
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Content</th>
                            <th>Date</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                        
                        {listItem.map((item) => (
                            <tr key={item._id} style={{color:item.color}}>
                                <td>{parseInt(item._id)}</td>
                                <td onClick={(e) => handleEditTodo(item, e)}>{item.description ? item.description : <input type="text" onKeyDown={(e) => keyDownHandler(e, item)}></input>}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => DoneTodo(item)}>v</button>
                                    <button onClick={() => failTodo(item)}>x</button>
                                </td>
                                <td><button onClick={() => handleDelete(item)}>Delete</button></td>
                            </tr>
                            
                            
                        ))}
                        
                        
                    </table>
                    
                </div>
            </div>
        </div>
    )

}

export default ListTodo