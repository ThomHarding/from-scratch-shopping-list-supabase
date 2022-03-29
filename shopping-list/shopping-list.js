import { checkAuth, createItem, fetchAndDisplayList, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const itemForm = document.getElementById('shopping-list-form');

logoutButton.addEventListener('click', () => {
    logout();
});

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data = new FormData(itemForm);
    let item = { item_name: data.get('item-name'), amount: data.get('item-amount') };
    await createItem(item);
    itemForm.reset();
    fetchAndDisplayList();
});