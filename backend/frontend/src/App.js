import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users on load
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crime Alert System</h1>
      <CreateUser />  {/* Add CreateUser component */}
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
