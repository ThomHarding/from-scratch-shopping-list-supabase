const SUPABASE_URL = '';
const SUPABASE_KEY = '';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }

async function createItem(item) {
    //insert item into supabase
}

async function deleteAllItems() {
    //delete all items in supabase
}

async function getItems() {
    //get all items in supabase
}

async function buyItem(id) {
    //get the item that matches id in supabase
    //update its complete to true
}

async function fetchAndDisplayList() {
    //clear dom of list display div
    //get all items
    //for each item
        //render
        //display
        //add event listener to mark as complete
}