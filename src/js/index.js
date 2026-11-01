import { fetching, searchingSelectionClick, searchingSelectionListClick, initCards } from './searching.js'

export let API = 'http://localhost:3000/';

let searchingSelection = document.querySelector('.searching__selection');

async function init() {
    initCards(await fetching(API + 'destinations'));
}

searchingSelection.addEventListener('click', (event) => {
    searchingSelectionClick(event)
})

searchingSelection.addEventListener('click', (event) => {
    searchingSelectionListClick(event)
})

init();