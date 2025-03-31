import { createBrowserRouter } from "react-router-dom";
import Client from "../Layout/Client";
import LandingPage from "../Pages/LandingPage/LandingPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import HomePage from "../Pages/HomePage/HomePage";
import CurrentMoviesPage from "../Pages/MoviesPages/CurrentMoviesPage";
import CurrentMovieDetailsPage from "../Pages/MovieDetailsPage/CurrentMovieDetailsPage";
import UpcomingMoviesPage from "../Pages/MoviesPages/UpcomingMoviesPage";
import UpcomingMovieDetailsPage from "../Pages/MovieDetailsPage/UpcomingMovieDetailsPage";
import SearchPage from "../Pages/SearchPage/SearchPage";

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
                path:"/currentMovieDetails/:id",
                element: <CurrentMovieDetailsPage/>
            },
            {
                path: "/browseUpcoming",
                element: <UpcomingMoviesPage/>
            },
            {
                path:"/upcomingMovieDetails/:id",
                element: <UpcomingMovieDetailsPage/>
            },
            {
                path:"/search",
                element: <SearchPage/>
            }
        
        ]

    }
])