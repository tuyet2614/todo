const Items = (props) => {

    let { currentItems, handleEditTodo, keyDownHandler, DoneTodo, handleDelete, DataSave, newContent, loading } = props
    let color = 'black'
    let done = ''
    if (loading) {
        return <h2>Loading....</h2>
    }
    return (
        <>
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Complete</th>
                    </tr>

                    {currentItems && currentItems.map((item, index) => (
                        item.completed ? [done = 'completed', color = '#DEB887'] : [done = '', color = "black"],
                        <tr key={item._id} style={{ color: color }}>

                            <td>{index}</td>
                            <td onClick={(e) => handleEditTodo(item, e)} className="description" onBlur={(e) => DataSave(e, item)}>
                                {item.description
                                    ? item.description : <input type="text" defaultValue={newContent.description} onKeyDown={(e) => keyDownHandler(e, item)} ></input>}

                            </td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => DoneTodo(item)}>v</button>
                                <button onClick={() => handleDelete(item)}>x</button>
                            </td>
                            <td>{done}</td>
                        </tr>


                    ))}


                </table>
            </div>

        </>
    );
}

export default Items