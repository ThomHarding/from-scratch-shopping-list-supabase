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

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function createItem(item) {
    const response = await client
        .from ('shopping_list_items')
        .insert({
            amount: item.amount,
            item_name: item.item_name,
            is_bought: false,
            user_id: client.auth.user().id,
        })
        .single();
    return checkError(response);
}

export async function deleteAllItems() {
    const response = await client
        .from('shopping_list_items')
        .delete()
        .match({ user_id: client.auth.user().id });    
    return checkError(response);
}

export async function getItems() {
    const response = await client
        .from ('shopping_list_items')
        .select()
        .match({ user_id: client.auth.user().id })
        .order('complete', { ascending: true });
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from ('shopping_list_items')
        .update({
            is_bought: true
        })
        .match({
            user_id: client.auth.user().id,
            id: id,
        })
        .single();
    return checkError(response);
}

export async function fetchAndDisplayList() {
    //clear dom of list display div
    //get all items
    //for each item
        //render
        //display
        //add event listener to mark as complete
}