import debounce from 'lodash.debounce';
import refs from './js/refs.js';

import templateCountry from './templates/country.hbs';
import templateCountries from './templates/countries.hbs';

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

// import "@pnotify/confirm/dist/PNotifyConfirm.css";



refs.searchInput.addEventListener('input', debounce((e) => {
     let name = e.target.value;
     const url = `https://restcountries.eu/rest/v2/name/${name}`
     if( name === '') {
        refs.countries.innerHTML = '';
     }
     else {
    fetch(url).then(res => res.json())
    .then(data => {
        if(data.length >= 2 && data.length < 10) {
            createItem(refs.countries, templateCountry(data))
        }

        else if(data.length > 10) {
            console.log('Ошибка');
            error({
                title: 'Error',
                text: 'to many matches found countries',
                delay: 2000
            })
        }

        else if(data.status === 404) {
            error({
                title:'Error',
                text: 'No country found',
                delay: 2000
            })
        }

        else {
            createItem(refs.countries, templateCountries(data));
        }
    });

    function createItem (place, data) {
        place.innerHTML = data;
    }
}},500))






