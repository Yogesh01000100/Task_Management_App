import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://task-management-app-7goy.onrender.com/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/todos');
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
