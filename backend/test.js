import { analyzeCode } from "./ast.js";

const code = `
import { useState, useEffect } from "react";

const unusedConstant = 123;

interface User {
  id: number;
  name: string;
}

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const tempValue = "debug";

  console.log("Dashboard rendered");

  useEffect(() => {
    console.log("Fetching users...");

    async function fetchUsers() {
      const response = await fetch("/api/users");
      const data = await response.json();

      setUsers(data);
    }

    fetchUsers();
  }, []);

  function handleClick(id: number) {
    console.log("clicked:", id);

    const unusedVariable = true;

    setUsers(prev =>
      prev.filter(user => user.id !== id)
    );
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
`;

console.log(analyzeCode(code));