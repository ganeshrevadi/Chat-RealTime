import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


const RegisterPage = () => {
    const {handleUserRegister} = useAuth()

    const [credentials, setCrendentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:''
    })

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCrendentials({...credentials, [name]:value})
      
    }

    return (
        <div className="auth--container">
        <div className="from--wrapper">
            <form onSubmit={(e) => {handleUserRegister(e,credentials)} }>

            <div className="field--wrapper">
                <label htmlFor="email">Name:</label>
                <input type="text" required name="name" placeholder="Enter your Name ..."
                value={credentials.name}
                onChange={handleInputChange}/>
                </div>

                <div className="field--wrapper">
                <label htmlFor="email">Email:</label>
                <input type="email" required name="email" placeholder="Enter your Email ..."
                value={credentials.email}
                onChange={handleInputChange}/>
                </div>

                <div className="field--wrapper">
                <label htmlFor="email">Password</label>
                <input type="password" required name="password1" placeholder="Enter your password"
                value={credentials.password1}
                onChange={handleInputChange}/>
                </div>

                <div className="field--wrapper">
                <label htmlFor="email">Confirm Password</label>
                <input type="password" required name="password2" placeholder="Confirm your password"
                value={credentials.password2}
                onChange={handleInputChange}/>
                </div>

                <div className="field--wrapper">
                <input type="submit" value="Login" className="btn btn--lg btn btn--main"/>

                </div>
            </form>
            <p>Already have an account? Login <Link to="/login">here</Link></p>

        </div>
</div>
    )
}
export default RegisterPage;