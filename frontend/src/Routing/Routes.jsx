import { createBrowserRouter } from "react-router-dom";
import Client from "../Layout/Client";
import LandingPage from "../Pages/LandingPage/LandingPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import HomePage from "../Pages/HomePage/HomePage";
import CurrentMoviesPage from "../Pages/MoviesPages/CurrentMoviesPage";
import MovieDetailsPage from "../Pages/MovieDetailsPage/MovieDetailPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Client />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
              },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path:"/register",
                element: <RegistrationPage/>
            },
            {
                path: "/homePage",
                element:<HomePage/>
            },
            {
                path: "/browseCurrent",
                element: <CurrentMoviesPage/>
            },
            {
                path:"/movieDetails/:id",
                element: <MovieDetailsPage/>
            }
        
        ]

    }
])