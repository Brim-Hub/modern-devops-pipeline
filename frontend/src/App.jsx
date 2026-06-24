import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API =
    import.meta.env.VITE_API_URL 

  const loadUsers = async () => {
    const res = await fetch(`${API}/api/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await fetch(`${API}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    setName("");
    setEmail("");

    await loadUsers();

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>MERN DevOps Demo</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Add User"}
        </button>
      </form>

      <hr />

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user._id}>
          <strong>{user.name}</strong> - {user.email}
        </div>
      ))}
    </div>
  );
}

export default App;