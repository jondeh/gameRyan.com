const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        image: ''
}

const USER_INFO = "USER_INFO";

export function userInfo(userObj){
    return {
        type: USER_INFO,
        payload: userObj
    }
}

export default function reducer(state = initialState, action){
    // console.log(type)
    const {type, payload} = action
    console.log("payload", payload)
    switch(type){
        case USER_INFO:
            return{...state, firstname: payload.firstname, lastname: payload.lastname, username: payload.username, email: payload.email, password: payload.password, image: payload.image};
        default: return state;
    }
}