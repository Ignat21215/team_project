import Handlebars from "handlebars";
import cardTemplate from "../templates/search-card.hbs"
import { API } from './index.js'

let searchingList = document.querySelector('.searching__list');

let newData = {
    countryId: [],
    waveType: [],
    priceLevel: [],
    crowdLevel: [],
    bestMonths: [],
    categoryId: []
};

export async function fetching(api) {
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export function searchingSelectionClick(e) {
    let target = e.target;
    if (target.classList.contains('searching__selection-item') && !target.classList.contains('clicked-item')) {
        target.querySelector('.searching__selection-btn').style.transform = 'rotate(90deg)';
        target.classList.add('clicked-item');
        target.querySelector('.searching__selection-list').style.display = 'flex';
        target.style.marginBottom = target.querySelector('.searching__selection-list').getBoundingClientRect().height + 'px';
    } else {
        target.querySelector('.searching__selection-btn').style.transform = 'rotate(0deg)';
        target.classList.remove('clicked-item');
        target.querySelector('.searching__selection-list').style.display = 'none';
        target.style.marginBottom = 0;
    }
}

export async function searchingSelectionListClick(e) {
    let target = e.target;
    if (target.classList.contains('searching__selection-list__item')) {
        if (!target.classList.contains('clicked-option')) {
            target.classList.add('clicked-option')
            let arr = target.dataset.arr;
            let toPush;
            if (target.getAttribute('id') === null) {
                if (target.getAttribute('data-crowd')) {
                    toPush = target.dataset.crowd;
                }
                if (target.getAttribute('data-price')) {
                    toPush = target.dataset.price;
                }
                if (target.getAttribute('data-month')) {
                    toPush = target.dataset.month;
                }
            } else {
                toPush = target.id;
            }
            newData[arr].push(toPush)
        } else {
            target.classList.remove('clicked-option')
            let arr = target.dataset.arr;
            let toRemove;
            if (target.getAttribute('id') === null) {
                if (target.getAttribute('data-crowd')) {
                    toRemove = target.dataset.crowd;
                }
                if (target.getAttribute('data-price')) {
                    toRemove = target.dataset.price;
                }
            } else {
                toRemove = target.id;
                newData[arr].splice(arr.indexOf(toRemove), 1);
            }
        }
        renderCards(await fetching(API + 'destinations'))
    }
}

export function initCards(arr) {
    arr.forEach(x => {
        let html = cardTemplate(x);
        searchingList.insertAdjacentHTML('beforeend', html)
    });
}

export function renderCards(arr) {
    searchingList.innerHTML = '';
    let newArr = [];
    arr.forEach(x => {
        let checkArr = [];
        Object.keys(newData).forEach(newDataKey => {
            if (!newData[newDataKey] || newData[newDataKey].length === 0) {
            } else if (Array.isArray(x[newDataKey]) && x[newDataKey].length !== 0) {
                if (newData[newDataKey].some(e => x[newDataKey].includes(e) || x[newDataKey].some(item => item == e))) {
                    checkArr.push(true);
                } else {
                    checkArr.push(false);
                }
            } else {
                if (newData[newDataKey].some(e => x[newDataKey] == e)) {
                    checkArr.push(true);
                }
                else {
                    checkArr.push(false);
                }
            }
        });
        if (checkArr.every(e => e === true)) {
            newArr.push(x);
        }
    });
    newArr.forEach(x => {
        let html = cardTemplate(x);
        searchingList.insertAdjacentHTML('beforeend', html);
    });
}