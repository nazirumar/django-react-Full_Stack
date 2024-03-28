
import { BrowserRouter,Routes, Navigate, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function LogOut() {
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogin() {
  localStorage.clear()
  return < Register />
}
function App() {
 
  return (
   <BrowserRouter>
   <Routes>
      <Route path='/'
      element={
        <ProtectedRoute>
          <Home />
       </ProtectedRoute>
      }
      /> 
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterAndLogin />} />
      <Route path='/logout' element={<LogOut />} />
      <Route path='*' element={<NotFound />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
