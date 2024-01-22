import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users");
      const json = await response.json();
      if (json.success) {
        setUsers(json.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <thead
          style={{
            backgroundColor: "lightgray",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
                padding: "10px",
              }}
            >
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <NavLink
                  to={`/users/${user._id}`}
                  style={{ cursor: "pointer" }}
                >
                  View Attendance
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
