import { checkAuth, createItem, deleteAllItems, fetchAndDisplayList, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const itemForm = document.getElementById('shopping-list-form');
const deleteButton = document.getElementById('delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    await deleteAllItems();
    await fetchAndDisplayList();
});

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data = new FormData(itemForm);
    let item = { item_name: data.get('item-name'), amount: data.get('item-amount') };
    await createItem(item);
    itemForm.reset();
    await fetchAndDisplayList();
});

window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});