import Handlebars from "handlebars";
import pageTemplate from "../templates/desc-page.hbs"
import { API, fetching } from './index.js'

let main = document.querySelector('.main');

export async function renderDesc() {
    let id = localStorage.getItem('itemId');
    let data = await fetching(API);
    let dataToPush;
    data.forEach(x => {
        if(x.id == id){
            dataToPush = x
        }
    });
    let html = pageTemplate(dataToPush);
    main.insertAdjacentHTML('beforeend', html);
}