import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {LoginPage} from "./pages/LoginPage";
import {CarPage} from "./pages/CarPage";
import {RegLog} from "./layouts/RegLog";
import {RegisterPage} from "./pages/RegisterPage";
import {SuperAdminPage} from "./pages/SuperAdminPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'WelcomeList'}/>
            },
            {
                path: 'WelcomeList', element: <RegLog/>
            },
            {
                path: 'registration', element: <RegisterPage/>
            },
            {
                path: 'login', element: <LoginPage/>
            },
            {
                path: 'cars_page', element: <CarPage/>
            },
            {
                path: 'admin_page', element: <SuperAdminPage/>
            }
        ]

    }
])

export {
    router
}