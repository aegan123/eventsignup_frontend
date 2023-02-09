/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './routes/error-page'
import EventSignup from './components/EventSignup'
import Login from './components/Login'
import EventManagement from './components/EventManagement'
import AdminPage from './components/AdminPage'
import NewEvent from './components/NewEvent'
import Logout from './components/Logout'
import IndexRoute from './components/IndexRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: 'signup/:eventId',
        element: <EventSignup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'management',
        element: <EventManagement />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'newEvent',
        element: <NewEvent />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
