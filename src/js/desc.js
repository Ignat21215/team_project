import Handlebars from "handlebars";
import pageTemplate from "../templates/desc-page.hbs"
import { API, fetching } from './index.js'

let main = document.querySelector('.main');
let url = new URLSearchParams(window.location.search);
let monthsArr = [];

export async function renderDesc() {
    let id = url.get('id');
    let data = await fetching(API);
    let dataToPush;
    data.forEach(x => {
        if (x.id == id) {
            dataToPush = x
        }
    });
    monthsArr = dataToPush.bestMonths;
    let html = pageTemplate(dataToPush);
    main.insertAdjacentHTML('beforeend', html);
    renderMonths();
    sliderInit();
}

function renderMonths() {
    let items = document.querySelectorAll('.calendar__item');
    items.forEach(x => {
        monthsArr.forEach(e => {
            if (x.dataset.monthnum == e) {
                x.classList.add('perfectMonth');
            }
        })
    })
}

function sliderInit() {
    let items = document.querySelectorAll('.gallery__item');
    items.forEach(x => x.classList.add('hidden'));
    items[0].classList.remove('hidden');
    let counter = 0;
    let counterMax = items.length - 1;
    let counterMin = 0;
    let swipeRight = document.querySelector('.gallery__swipe--right');
    let swipeLeft = document.querySelector('.gallery__swipe--left');

    swipeRight.addEventListener('click', () => {
        items.forEach(x => x.classList.add('hidden'))
        items[0].classList.remove('hidden');

        if (counter === counterMax) {
            counter = counterMin;
            items.forEach(x => x.classList.add('hidden'));
            items[counter].classList.remove('hidden');
        } else {
            counter++;
            items.forEach(x => x.classList.add('hidden'));
            items[counter].classList.remove('hidden');
        }
    })

    swipeLeft.addEventListener('click', () => {
        if (counter === counterMin) {
            counter = counterMax
            items.forEach(x => x.classList.add('hidden'))
            items[counter].classList.remove('hidden');
        } else {
            counter--
            items.forEach(x => x.classList.add('hidden'))
            items[counter].classList.remove('hidden');
        }
    })
}