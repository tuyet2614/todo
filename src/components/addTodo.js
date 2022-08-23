const AddTodo = (props) => {
    let {handleOnclick, handleOnChange, handleShow} = props
    return(
        <div className="addForm">
            <form onSubmit={handleOnclick}>
                <input type="text" placeholder="Enter your content" onChange={handleOnChange}></input>
                <button >Save</button>
            </form>
            
        </div>
    )
}

export default AddTodo