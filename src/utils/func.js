import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

export const loggedIn = writable(false)


const emptyAuth = {
    "token": "",
    "userID": ""
}

export function logOut() {
    localStorage.setItem("auth", JSON.stringify(emptyAuth))
    loggedIn.set(false)
    return true
}

export function getUserId() {
    const auth = localStorage.getItem("auth")
    if (auth) {
        return JSON.parse(auth)["userID"]
    }
    return null

}
export function getTokenFromLocalStorage() {
    const auth = localStorage.getItem("auth")
    if (auth) {
        return JSON.parse(auth)["token"]
    }
    return null;
}

export async function isLoggedIn() {
    if (!(getTokenFromLocalStorage())) {
        loggedIn.set(false)
    } else loggedIn.set(true);
}



export async function authLogin (email, password) {
    const resp = await fetch (PUBLIC_BACKEND_BASE_URL + '/auth', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify ({
            email,
            password
        })
    });

const res = await resp.json ();

if (resp.status == 200) {
    localStorage.setItem(
        'auth',
        JSON.stringify({
            token: res.accessToken,
            userID: res.userFiltered.id
        })
    );

    loggedIn.set(true);

    return {
        success: true,
        res: res
    };
}

    return {
        success: false,
        res: res
    };
    
}
