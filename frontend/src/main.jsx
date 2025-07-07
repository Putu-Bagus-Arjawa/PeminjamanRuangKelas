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
import DashboardAdmin from './pages/DashboardAdmin.jsx'
import ProfileAdmin from './pages/ProfileAdmin.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import BookingForm from './pages/BookingForm.jsx'
import ManajemenRuangan from './pages/ManajemenRuangan.jsx'
import EditRuangan from './pages/EditRuangan.jsx'

const routes = createBrowserRouter([
  {path: '/register', element: <Register/>},
  {path: '/login', element: <Login/>},
  {path: '/listruangan', element: <ListRuangan/>},
  {path: '/', element :<ProtectedRoutes/> ,children:[{ index: true, element:  <Dashboard/>}]},
  {path: '*', element: <App/>},
  {path: '/riwayat', element: <Riwayat/>},
  {path: '/profile', element: <Profile/>},
  {path: '/admin', element: <DashboardAdmin/>},
  {path: '/booking', element: <BookingForm/>},
  {path: '/profileadmin', element: <ProfileAdmin/>},
  {path: '/manajemenruangan', element: <ManajemenRuangan/>},
  {path: '/editruangan/:id', element: <EditRuangan/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={routes}/>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)