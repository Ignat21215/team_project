import Handlebars from "handlebars";
import cardTemplate from "../templates/search-card.hbs"

let searchingList = document.querySelector('.searching__list');

let newData = {
    countries: [],
    waveTypes: [],
    priceLevels: [],
    crowdLevels: [],
    bestMonths: [],
    categories: []
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
    console.log(target)
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

export function searchingSelectionListClick(e) {
    let target = e.target;
    if (target.classList.contains('searching__selection-list__item') && !target.classList.contains('clicked-option')) {
        target.classList.add('clicked-option')
        let arr = newData[target.dataset.arr];
        let toPush;
        if (target.getAttribute('id') === null) {
            if (target.getAttribute('data-crowd')) {
                toPush = target.dataset.crowd;
            }
            if (target.getAttribute('data-price')) {
                toPush = target.dataset.price;
            }
        } else {
            toPush = target.id;
            arr.push(toPush)
        }
    } else {
        target.classList.remove('clicked-option')
        let arr = newData[target.dataset.arr];
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
            arr.splice(arr.indexOf(toRemove), 1);
        }
    }
}

export function initCards(arr){
    arr.forEach(x => {
        let html = cardTemplate(x);
        searchingList.insertAdjacentHTML('afterbegin', html)
    });
}

export function renderCard(card){

}