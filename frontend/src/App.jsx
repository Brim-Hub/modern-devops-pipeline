import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      setName("");
      setEmail("");
      await loadUsers();
    } catch (err) {
      console.error("Failed to add user", err);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🚀 MERN DevOps Dashboard</h1>

        <form className="form" onSubmit={submit}>
          <input
            className="input"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="button" disabled={loading}>
            {loading ? "Saving..." : "Add User"}
          </button>
        </form>

        <div className="card">
          <h2 className="subtitle">Users</h2>

          {users.length === 0 ? (
            <p className="empty">No users found</p>
          ) : (
            <div className="list">
              {users.map((user) => (
                <div className="user" key={user._id}>
                  <div className="avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;