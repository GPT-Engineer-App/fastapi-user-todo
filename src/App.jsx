import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import TodosPage from "./pages/TodosPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
