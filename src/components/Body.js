import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Watchlist from './Watchlist'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/watchlist",
            element: <Watchlist />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
            {/* <Login />
            <Browse /> */}
        </div>
    )
}

export default Body