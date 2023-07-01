
import './App.css'
import Room from './Pages/Room'
<<<<<<< HEAD
function App() {

  return (
    <>
      <Room />
    </>
=======
import LoginPage from './Pages/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'
import {AuthProvider} from './utils/AuthContext'
function App() {

  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />

        <Route element={<PrivateRoutes/>}>
        <Route path="/" element={<Room/>}/>
        </Route>

        </Routes>
        </AuthProvider>
    </Router>
>>>>>>> 1942aedb1aaa29778c278eae3b7fb7df00f4895c
  )
}

export default App
