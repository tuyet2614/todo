import { useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";

const ListTodo = (props) => {
    let {todoList,handleOnShow, isShow, 
        handleOnclick, handleOnChange, newContent, 
        handleDelete, DoneTodo, failTodo, handleEditTodo, keyDownHandler} = props
    
    
    
    return(
        <div className="mainList">
            <div className="add_button">
                
                
                {isShow?<AddTodo 
                handleOnclick = {handleOnclick}
                newContent = {newContent}
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
                        
                        {todoList.map((item) => (
                            <tr key={item.id} style={{color:item.color}}>
                                <td>{item.id}</td>
                                <td onClick={(e) => handleEditTodo(item, e)}>{item.content ? item.content : <input type="text" onKeyDown={(e) => keyDownHandler(e, item)}></input>}</td>
                                <td>{item.date}</td>
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