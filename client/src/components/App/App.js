import { Routes, Route } from 'react-router-dom';
import Home from './../Home/Home';
import Login from './../Login/Login'
import SignUp from './../SignUp/SignUp'
import Dashboard from './../Dashboard/Dashboard'

function App() {
    return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='dashboard' element={<Dashboard />} />
            </Routes>
    )
}

export default App;