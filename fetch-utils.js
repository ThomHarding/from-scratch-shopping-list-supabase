import { renderItem } from './render-utils.js';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmc25pb3pteXV1aWpzY2ZkcXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTMzNTYsImV4cCI6MTk2MzU2OTM1Nn0.o5Vjx7n791rkZxuhmxHUoti3dkFusShLHfaXhGvGNHg';
const SUPABASE_URL = 'https://tfsniozmyuuijscfdqre.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const listDisplayDiv = document.getElementById('list-display');

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
        .order('is_bought', { ascending: true });
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
    listDisplayDiv.innerHTML = '';
    let items = await getItems();
    for (let item of items) {
        let renderedItem = renderItem(item);
        renderedItem.addEventListener('click', async () => {
            await buyItem(item.id);
            await fetchAndDisplayList();
        });
        listDisplayDiv.append(renderedItem);
    }
}