import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import TaskPage from "./Pages/TaskPage/TaskPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage"

function App() {

    

    return (
        <Routes>
            <Route
                path="/"
                element={<LoginPage />}
            />
            <Route
                path="/tasks"
                element={<TaskPage />}
            />
            <Route
                path="/register"
                element={<SignUpPage />}
            />
        </Routes>

    )
}

export default App;