import React, { useState } from "react";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create user");
        return res.json();
      })
      .then((data) => {
        alert("User created!");
        setName("");
        setEmail("");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default CreateUser;
