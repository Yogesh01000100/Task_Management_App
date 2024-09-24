import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import TodoList from "./components/TodoList";
import AuthPage from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
