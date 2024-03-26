import { isLoggedIn } from "../utils/func";
export const ssr = false;

export async function load () {
    await isLoggedIn()
}