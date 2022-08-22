import { useEffect, useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";
import Items from "./item";
import ReactPaginate from 'react-paginate';

const ListTodo = (props) => {


    const [isShow, setIsShow] = useState(false)
    const handleOnShow = () => setIsShow(true)
    const token = localStorage.getItem('token')
    const [todoList, setTodoList] = useState([])
    const [newContent, setNewContent] = useState()
    const [check, setCheck] = useState(false)


    const handleOnChange = (e) => {

        setNewContent(e.target.value)
        console.log(e.target.value)


    }


    const handleOnclick = () => {
        console.log(check)


        axios.post(`https://api-nodejs-todolist.herokuapp.com/task`, {
            "description": newContent
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                console.log(check)
                ShowData()
            })
            .catch(error => console.log(error));

        setIsShow(false)
    }

    const ShowData = async () => {
        check ? setCheck(false) : setCheck(true)
        axios.get(`https://api-nodejs-todolist.herokuapp.com/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTodoList(res.data.data)
                console.log(res);
                console.log(res.data);

            })
            .catch(error => console.log(error));

    }

    const handleDelete = (todo) => {
        console.log(todo._id)
        check ? setCheck(false) : setCheck(true)
        axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                ShowData()
            })
            .catch(error => console.log(error));
    }
    const keyDownHandler = (event, todo) => {
        check ? setCheck(false) : setCheck(true)
        if (event.key === 'Enter') {
            axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
                "description": event.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {

                    ShowData()
                })
                .catch(error => console.log(error));

        }
    }

    const DataSave = (event, todo) => {
        check ? setCheck(false) : setCheck(true)
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            "description": event.target.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                ShowData()
            })
            .catch(error => console.log(error));


    }

    const handleEditTodo = (todo, e) => {

        setNewContent(todo)
        const TodoItem = todoList.find(item => item._id === todo._id)

        setTodoList(
            todoList.map(item => item._id === todo._id ? { ...TodoItem, description: '' } : item)

        )
        check ? setCheck(false) : setCheck(true)


    }

    const DoneTodo = (todo) => {
        let todoChange = todoList.find((item) => item._id === todo._id)
        setTodoList(
            todoList.map((item) => item._id === todo._id ? { ...todoChange, color: "blue" } : item))
        check ? setCheck(false) : setCheck(true)


    }

    const failTodo = (todo) => {
        let todoChange = todoList.find((item) => item._id === todo._id)
        setTodoList(
            todoList.map((item) => item._id === todo._id ? { ...todoChange, color: "red" } : item))
        check ? setCheck(false) : setCheck(true)

    }


    useEffect(() => {
        ShowData()
    }, [])



    const PaginatedItems = (itemsPerPage) => {
        // We start with an empty list of items.

        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(todoList.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(todoList.length / itemsPerPage));

        }, [itemOffset, itemsPerPage, check]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % todoList.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems}
                    handleEditTodo={handleEditTodo}
                    keyDownHandler={keyDownHandler}
                    DoneTodo={DoneTodo}
                    failTodo={failTodo}
                    handleDelete={handleDelete}
                    DataSave={DataSave}
                    newContent={newContent}
                    todoList={todoList}
                />

                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </>
        );
    }

    return (
        <div className="mainList">
            <div className="add_button">


                {isShow ? <AddTodo
                    handleOnclick={handleOnclick}
                    handleOnChange={handleOnChange}

                /> :
                    <button onClick={() => handleOnShow()} className="addTodo">create</button>}
            </div>
            <div className="list_todo">
                {PaginatedItems(4)}
            </div>


        </div >
    )

}

export default ListTodo