import React, {useState, useEffect} from 'react';
import './Header.scss';
// import 'Header.scss'
import UseInput from '../../Hooks/UseInput';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {GiEmptyChessboard} from 'react-icons/gi';
import {FaChess} from 'react-icons/fa';
import {GiDiceSixFacesSix} from 'react-icons/gi';
import {userInfo} from '../../redux/reducer';
import {AiOutlinePlusCircle} from 'react-icons/ai';


const Header = (props) => {
    const [{email, password}, {setInput, resetInputs}] = UseInput({email: "", password: ""})

    const handleLogin = (email, password) => {
        axios.post(`/api/auth/login`, {email, password}).then(res => {
            props.userInfo(res.data)
        }).catch(err => console.log(err))
    }

    const handleLogout = () => {
        console.log("ding")
        axios.post('/api/auth/logout').then(res => {
            console.log("ding2")
            props.userInfo({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                image: ''
            })
            props.history.push('/')
        })
    }

    const handleDash = () => {
        props.history.push('/')
    }

    console.log("props", props)

    return(
        <header>
            <div className="logo-container">
                <div className="logo" onClick={handleDash}><GiEmptyChessboard size={165}/></div>
            </div>

            {
                props.firstname.length > 0 ? 
                <div className="user-profile">
                    <div className="profile-picture-container">
                        {
                            props.image ? <img className="profile-picture1" src={props.image} /> : <div className="profile-picture2"><AiOutlinePlusCircle color={"white"} /></div>
                        }
                    </div>
                    <div className="user-name">
                        {props.username}
                    </div>
                </div> : 
            <div className="login-container">
                <input name="email" className="email" placeholder="Email" onChange={(e) => setInput(e)}></input>
                <input name="password" className="password" placeholder="Password" onChange={(e) => setInput(e)}></input>
                <button name="login" className="login" onClick={() => handleLogin(email, password)}>Login</button>
            </div>
            }
            
            <div className="bottom-logo-container">
                {
                    props.firstname.length > 0 ? <button className="logout" onClick={handleLogout}>Logout</button> : <Link to="/register"><button name="register" className="register-b">Register</button></Link>
                }
                <div className="bottom-logo" onClick={() => props.history.push('/')}></div>
            </div>
        </header>
    )
}

const mapStateToProps = reduxState => {
    const {firstname, lastname, username, email, password, image} = reduxState
    return {firstname, lastname, username, email, password, image}
}

export default withRouter(connect(mapStateToProps, {userInfo})(Header));