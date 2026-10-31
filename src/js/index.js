import { fetching, searchingSelectionClick, searchingSelectionListClick, renderCards, newDate, initCards } from './searching.js'

let API = 'http://localhost:3000/';

let searchingSelection = document.querySelector('.searching__selection');
let searchingSelectionList = document.querySelector('.searching__selection-item__list');

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