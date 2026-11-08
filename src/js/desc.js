import Handlebars from "handlebars";
import pageTemplate from "../templates/desc-page.hbs"
import { API, fetching } from './index.js'

let main = document.querySelector('.main');
let id = localStorage.getItem('itemId');

export async function renderDesc() {
    console.log(id)
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