import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from './pages/Register.jsx'
import App from './App.jsx'

const routes = createBrowserRouter([
  {path: '/register', element: <Register/>},
  {path: '/login', element: <Register/>},
  {path: '*', element: <App/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
