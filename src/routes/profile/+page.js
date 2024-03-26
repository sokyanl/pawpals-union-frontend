import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getTokenFromLocalStorage, getUserId } from '../../utils/func.js';

export async function load({ fetch }) {
    const token = getTokenFromLocalStorage();
    const userID = getUserId();

    const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}/pet/users/${userID}`, { // Correct link?
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }); // Corrected placement of closing bracket

    const res = await resp.json();
    if (resp.status === 200) {
        return {
            pet: res
        };
    } else {
        return {
            pets: []
        };
    }
}
