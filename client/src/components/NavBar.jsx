import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl">Todo App</h1>
        <div>
          <Link to="/profile" className="text-white mr-4">Profile</Link>
          <Link to="/todos" className="text-white">Todos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
