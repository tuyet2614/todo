const AddTodo = (props) => {
    let {handleOnclick, handleOnChange, newContent} = props
    return(
        <div className="addForm">
            <input type="text" placeholder="Enter your content" onChange={(e) => handleOnChange(e)}></input>
            <button onClick={() => handleOnclick(newContent)}>Save</button>
        </div>
    )
}

export default AddTodo