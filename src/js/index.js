import { searchingSelectionClick, searchingSelectionListClick, initCards, searchingList } from './searching.js'
import { renderDesc } from './desc.js'

export let API = 'https://team-projectbe.onrender.com';

let searchingSelection = document.querySelector('.searching__selection');

export async function fetching(api) {
    try {
        let response = await fetch(api + '/destinations');
        let data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

async function init() {
    if (searchingList) {
        initCards(await fetching(API));
        searchingSelection.addEventListener('click', (event) => {
            searchingSelectionClick(event)
        })

        searchingSelection.addEventListener('click', (event) => {
            searchingSelectionListClick(event)
        })

        searchingList.addEventListener('click', (event) => {
            if (event.target.classList.contains('searching__item-link')) {
                localStorage.setItem('itemId', event.target.dataset.redirect);
            }
        })
    }
    if (window.location.pathname === '/desc.html' || window.location.pathname.endsWith('/desc.html')) {
        renderDesc();
    }
}

init();