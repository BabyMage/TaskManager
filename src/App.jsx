import { Routes, Route, useNavigate } from "react-router-dom";
import * as authservice from "./Services/authService"
import { validateUser } from "./utils/taskHelpers"
import { useEffect } from "react";

import TaskPage from "./Pages/TaskPage/TaskPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage"

function App() {

    const navigate = useNavigate();

    useEffect(() => 
    {
        validateUser(
            navigate,
            authservice.checkUser,
            authservice.logout
        )
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={<LoginPage />}
            />
            <Route
                path="/tasks"
                element={<TaskPage username={authservice.checkUser().username} />}
            />
            <Route
                path="/register"
                element={<SignUpPage />}
            />
        </Routes>
    )
}

export default App;