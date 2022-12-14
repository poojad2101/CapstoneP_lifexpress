import * as usersAPI from './users-api'
import jwt_decode from 'jwt-decode';

export async function signUp(userData) {
    console.log('in users-service')
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token' , token)
    return getUser()
}

export async function login(credentials){
    //creds are {email,password}
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token' , token)
    return getUser()
}

export async function checkToken(){
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}

export function logOut(){
    localStorage.removeItem('token');
}

export function getToken(){
    const token = localStorage.getItem('token')
    console.log(token)
    console.log('this user token in Loc Stor is ' , token)
    if(!token) return null

    const payload = jwt_decode(token, { header:true})
    // const payload = JSON.parse(window.atob(token.split('.')[1]))

    if(payload.exp<Date.now()/1000){
        localStorage.removeItem('token')
        return null
    }
    return token
}


export function getUser(){
    console.log('getting token')
    const token = getToken()
    return token ? JSON.parse(window.atob(token.split('.')[1])).user:null
}

