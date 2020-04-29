import React from 'react';
import './Register.scss';
import UseInput from '../../Hooks/UseInput';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {userInfo} from '../../redux/reducer';

const Register = (props) => {
    const [{firstname, lastname, username, email, password}, {setInput, resetInputs}] = UseInput({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        axios.post(`/api/auth/register`, {firstname, lastname, username, email, password}).then(res => {
            props.userInfo(res.data)
            console.log("res.data", res.data)
            props.history.push('/')
        }).catch(err => console.log(err))
    }

    const handleLogout = () => {
        axios.get(`/api/auth/logout`, {})
    }

    console.log("props", props)

    return(
        <div className="register">
            <p>First Name: </p><input name="firstname" onChange={(e) => setInput(e)}></input>
            <p>Last Name: </p><input name="lastname" onChange={(e) => setInput(e)}></input>
            <p>Username: </p><input name="username" onChange={(e) => setInput(e)}></input>
            <p>Email: </p><input name="email" onChange={(e) => setInput(e)}></input>
            <p>Password: </p><input name="password" onChange={(e) => setInput(e)}></input>
            <br />
            <button onClick={handleSubmit}>REGISTER</button>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default withRouter(connect(null, {userInfo})(Register));