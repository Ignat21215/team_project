import Handlebars from "handlebars";
import cardTemplate from "../templates/search-card.hbs"
import pageTemplate from "../templates/desc-page.hbs"
import { API, fetching } from './index.js'

export let searchingList = document.querySelector('.searching__list');

let newData = {
    countryId: [],
    waveType: [],
    priceLevel: [],
    crowdLevel: [],
    bestMonths: [],
    categoryId: []
};

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
                if (target.hasAttribute('data-crowd')) {
                    toPush = target.dataset.crowd;
                }
                if (target.hasAttribute('data-price')) {
                    toPush = target.dataset.price;
                }
                if (target.hasAttribute('data-month')) {
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
                if (target.hasAttribute('data-crowd')) {
                    toRemove = target.dataset.crowd;
                }
                if (target.hasAttribute('data-price')) {
                    toRemove = target.dataset.price;
                }
                if (target.hasAttribute('data-month')) {
                    toRemove = target.dataset.month;
                }
            } else {
                toRemove = target.id;
            }
            newData[arr].splice(arr.indexOf(toRemove), 1);
        }
        renderCards(await fetching(API))
    }
}

export function initCards(arr) {
    arr.forEach(x => {
        let html = cardTemplate(x);
        searchingList.insertAdjacentHTML('beforeend', html)
    });
}

export async function renderCards(arr) {
    searchingList.innerHTML = '';
    if (Object.keys(newData).some(key => newData[key].length > 0)) {
        let newArr = [];
        arr.forEach(x => {
            let checkArr = [];
            Object.keys(newData).forEach(key => {
                if (newData[key].length > 0) {
                    if (Array.isArray(x[key])) {
                        let includes = false;
                        newData[key].forEach(e => {
                            x[key].forEach(b => {
                                if (e == b) {
                                    includes = true;
                                }
                            })
                        })
                        if (includes) {
                            checkArr.push(true);
                        } else {
                            checkArr.push(false)
                        }
                    } else {
                        let includes = false;
                        newData[key].forEach(e => {
                            if (e == x[key]) {
                                includes = true;
                            }
                        })
                        if (includes) {
                            checkArr.push(true);
                        } else {
                            checkArr.push(false)
                        }
                    }
                }
            })
            if (checkArr.length > 0 && checkArr.every(e => e === true)) {
                newArr.push(x);
            }
        });
        newArr.forEach(x => {
            let html = cardTemplate(x);
            searchingList.insertAdjacentHTML('beforeend', html);
        });
    } else {
        initCards(await fetching(API + 'destinations'))
    }
}