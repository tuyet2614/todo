import { useState } from "react";
import './listTodo.css'

const ListTodo = (props) => {
    let {todoList,newContent,handleOnclick, handleOnChange} = props
    
    return(
        <div className="mainList">
            <div className="add_button">
                <button onClick={() => {handleOnclick(newContent)}}>create</button>
                <input type="text" onChange={(e) => handleOnChange(e)}></input>
                {/* <input type="text" onChange={(e) => handleOnChange(e)}></input> */}
            </div>
            <div className="list_todo">
                <div>
                    
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Content</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        
                        {todoList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.content}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button>done</button>
                                </td>
                            </tr>
                            
                            
                        ))}
                        
                        
                    </table>
                    
                </div>
            </div>
        </div>
    )

}

export default ListTodo