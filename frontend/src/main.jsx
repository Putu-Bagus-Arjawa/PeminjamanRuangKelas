import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login.jsx'
import ListRuangan from './pages/ListRuangan.jsx'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoutes from './Context/ProtectedRoutes.jsx'
import Riwayat from './pages/Riwayat.jsx'
import Profile from './pages/Profile.jsx'
import DashboardAdmin from './pages/DashboardAdmin.jsx'
import ProfileAdmin from './pages/ProfileAdmin.jsx'
import EditUser from './pages/EditUser.jsx'
import ManajemenPengguna from './pages/ManajemenPengguna.jsx'
import BookingForm from './pages/BookingForm.jsx'
import ManajemenRuangan from './pages/ManajemenRuangan.jsx'
import EditRuangan from './pages/EditRuangan.jsx'
import Approval from './pages/Approval.jsx'
import AllContext from './Context/AllContext.jsx'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/listruangan', element: <ListRuangan /> },
      { path: '/riwayat', element: <Riwayat/> },
      { path: '/profile', element: <Profile /> },
      { path: '/admin', element: <DashboardAdmin /> },
      { path: '/booking', element: <BookingForm /> },
      { path: '/profileadmin', element: <ProfileAdmin /> },
      { path: '/manajemenruangan', element: <ManajemenRuangan /> },
      { path: '/editruangan/:id', element: <EditRuangan /> },
      { path: '/approve/:id', element: <Approval /> },
      { path: '/manajemenpengguna', element: <ManajemenPengguna /> },
      { path: '/edituser/:id', element: <EditUser /> },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <App/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AllContext>
        <RouterProvider router={routes}/>
    </AllContext>
  </StrictMode>
)