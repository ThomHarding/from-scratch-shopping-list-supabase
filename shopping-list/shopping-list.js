import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//form submit event listener
    //add item to supabase
    //fetchanddisplayitems()