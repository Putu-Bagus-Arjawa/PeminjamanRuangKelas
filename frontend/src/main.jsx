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
import Riwayat from './pages/Riwayat.jsx'
import Profile from './pages/Profile.jsx'
import KalenderJadwal from './pages/KalenderJadwal.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

const routes = createBrowserRouter([
  {path: '/register', element: <Register/>},
  {path: '/login', element: <Login/>},
  {path: '/listruangan', element: <ListRuangan/>},
  {path: '/dashboard', element :<ProtectedRoutes/> ,children:[{ index: true, element:  <Dashboard/>}]},
  {path: '*', element: <App/>},
  {path: '/riwayat', element: <Riwayat/>},
  {path: '/kalender', element: <KalenderJadwal/>},
  {path: '/profile', element: <Profile/>,}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  </StrictMode>,
)
