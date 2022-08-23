import axios from "axios";
import { useEffect, useState } from "react";
import "./User.css";

const User = () => {
  const token = localStorage.getItem("token");

  let [isEmpty, setIsEmpty] = useState(true);
  let [user, setUser] = useState([]);
  let [editText, setEditText] = useState("");

  const getUser = () => {
    axios
      .get(`https://api-nodejs-todolist.herokuapp.com/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleOnchangeEditUser = (e) => {
    setEditText(e.target.value);
  };

  const handleEditUser = (text) => {
    setIsEmpty(false);
    if (isEmpty === false) {
      axios
        .put(
          `https://api-nodejs-todolist.herokuapp.com/user/me`,
          {
            name: text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setUser({ ...user, name: text });
          setIsEmpty(true);
        })
        .catch((error) => console.log(error));
    }

    //save

    //   this.setState({
    //     listTodos: listTodosCopy,
    //     editTodo: {},
    //   });

    //edit
    // this.setState({
    //   editTodo: todo,
    // });
  };

  return (
    <div>
      <div class="container">
        <div class="rightbox">
          <div class="profile">
            <h1>Personal Info</h1>
            <h2>Full Name</h2>
            <p>
              {isEmpty === true ? (
                user.name
              ) : (
                <input
                  defaultValue={user.name}
                  onChange={(e) => handleOnchangeEditUser(e)}
                />
              )}

              <button class="btn" onClick={() => handleEditUser(editText)}>
                {isEmpty === true ? "update" : "Save"}
              </button>
            </p>
            <h2>Birthday</h2>
            <p>July 21</p>
            <h2>Gender</h2>
            <p>Female</p>
            <h2>Email</h2>
            <p>
              {user.email} <button class="btn">update</button>
            </p>
            <h2>Password </h2>
            <p>
              {user.password} <button class="btn">Change</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
