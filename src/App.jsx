import { Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import TaskPage from "./Pages/TaskPage/TaskPage";

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
        </Routes>

    )
}

export default App;