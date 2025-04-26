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
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import TicketBookingPage from "../Pages/TicketBookingPage/TicketBookingPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import OrderHistoryPage from "../Pages/OrderHistoryPage/OrderHistoryPage";
import ViewTicketPage from  "../Pages/ViewTicketPage/ViewTicketPage";
import AdHomePage from "../Pages/AdminPages/AdHomePage";
import CurrentStatusPage from "../Pages/AdminPages/CurrentStatusPage";
import ManageShowPage from "../Pages/AdminPages/ManageShowPage";
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
            },
            {
                path:"/profile",
                element:<ProfilePage/>
            },
            {
                path:"/ticketBooking/:movieId",
                element:<TicketBookingPage/>
            },
            {
                path: "/payment",
                element: <PaymentPage />
            },
            {
                path:"/orderHistory",
                element:<OrderHistoryPage/>
            },
            {
                path:"/viewTicket/:id",
                element:<ViewTicketPage/>
            },
            {
                path: "/adminHomePage",
                element: <AdHomePage />
            },
            {
                path: "/current-status",
                element: <CurrentStatusPage />
            },
            {
                path: "/manage-shows",
                element:<ManageShowPage/>
            }
        ]

    }
])