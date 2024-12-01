import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoredContext'
import axios from 'axios'

export const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
            toast.success(response.data.message);
        }
        else {
            alert(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-pop-up-title'>
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : "Login"}</button>
                {currentState === 'Sign Up'
                    ?
                    <div className="login-popup-conditon">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    : <></>}

                {currentState === 'Login'
                    ? <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>}

            </form>
        </div>
    )
}
