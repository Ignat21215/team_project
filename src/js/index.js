import { searchingSelectionClick, searchingSelectionListClick, initCards, searchingList, redirect } from './searching.js'
import { renderDesc } from './desc.js'

export let API = 'https://vjcucvgfkfqsfhiz.private.blob.vercel-storage.com/db.json?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfVkpDdUNWZ0ZLZnFzRkhpWiIsIm93bmVySWQiOiJ0ZWFtX3lWS3dnVEFoWWpiOUhRdDlJa1hLd0N3QyIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzk0MTIyNjEzODEzLCJpYXQiOjE3OTQwNzk0MTM4OTN9.uQaf3sQovlqxSHbG1Jjd1hNtPt9ueOhHpzwHc9mr9rc&vercel-blob-signature=EULCiwNCq1iMA8NTMIF80cvNNShcdB1OhkvawR_QyRk';

let searchingSelection = document.querySelector('.searching__selection');

export async function fetching(api) {
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.destinations
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
                redirect(event)
            }
        })
    }
    if (window.location.pathname === '/desc.html' || window.location.pathname.endsWith('/desc.html')) {
        renderDesc();
    }
}

init();