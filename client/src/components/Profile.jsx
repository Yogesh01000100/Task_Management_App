import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://task-management-app-7goy.onrender.com/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
