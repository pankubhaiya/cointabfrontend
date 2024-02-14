// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:9090/api/users');
      console.log(response)
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add user to the database
  const addUserToDB = async (user) => {
    try {
      await axios.post('https://localhost:9090/api/users', user);
      // Refresh the user list after adding a user
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Open user details page
  const openUserPage = (userId) => {
    // Implement logic to open user details page
    console.log(`Opening user details page for user with ID: ${userId}`);
  };

  return (
    <div>
      <h1>Cointab SE-ASSIGNMENT</h1>
      <button onClick={fetchUsers}>All Users</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.phone}</div>
            <div>Website: {user.website}</div>
            <div>City: {user.address.city}</div>
            <div>Company: {user.company.name}</div>
            {/* Add and Open buttons */}
            <button onClick={() => addUserToDB(user)}>Add</button>
            <button onClick={() => openUserPage(user.id)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
