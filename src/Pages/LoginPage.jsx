import React , { useEffect ,useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const {user , handleUserLogin} = useAuth()
    const navigate = useNavigate()

    const [credentials, setCrendentials] = useState({
        email:'',
        password:''
    })

    useEffect(() => {
        if(user) {
            navigate('/')
        }
        
    }, [])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCrendentials({...credentials, [name]:value})
      
    }

    return (
        <div className="auth--container">
                <div className="from--wrapper">
                    <form onSubmit={(e) => {handleUserLogin(e,credentials)} }>
                        <div className="field--wrapper">
                        <label htmlFor="email">Email:</label>
                        <input type="email" required name="email" placeholder="Enter your Email ..."
                        value={credentials.email}
                        onChange={handleInputChange}/>
                        </div>

                        <div className="field--wrapper">
                        <label htmlFor="email">Password</label>
                        <input type="password" required name="password" placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleInputChange}/>
                        </div>

                        <div className="field--wrapper">
                        <input type="submit" value="Login" className="btn btn--lg btn btn--main"/>

                        </div>
                    </form>

                </div>
        </div>
    )
}

export default LoginPage