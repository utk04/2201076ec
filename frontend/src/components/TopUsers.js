import { useEffect, useState } from "react";
import { getTopUsers } from "../api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTopUsers().then(setUsers);
  }, []);

  return (
    <div className="container">
      <h2>Top Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
