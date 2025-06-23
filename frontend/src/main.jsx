import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ListRuangan from './pages/ListRuangan.jsx'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoutes from './Context/ProtectedRoutes.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

const routes = createBrowserRouter([
  {path: '/register', element: <Register/>},
  {path: '/login', element: <Login/>},
  {path: '/listruangan', element: <ListRuangan/>},
  {path: '/dashboard', element :<ProtectedRoutes/> ,children:[{ index: true, element:  <Dashboard/>}]},
  {path: '*', element: <App/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  </StrictMode>,
)
