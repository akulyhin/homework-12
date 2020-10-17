import refs from './js/refs.js';

// Templates
import templateCountry from './templates/country.hbs';
import templateCountries from './templates/countries.hbs';
// END Templates

// PNotify
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// END PNotify

    export default function fetchCountries(searchQuery){
     const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`
     if( searchQuery === '') {
        refs.countries.innerHTML = '';
     }
     else {
        refs.spinner.classList.remove('is-hidden'); 
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.length >= 2 && data.length < 10) {
            setTimeout(createItem, 300, refs.countries, templateCountry(data));
        }

        else if(data.length > 10) {
            refs.spinner.classList.add('is-hidden');
            console.log('Ошибка');
            error({
                title: 'Error',
                text: 'to many matches found countries',
                delay: 2000
            })
        }

        else if(data.status === 404) {
            refs.spinner.classList.add('is-hidden');
            error({
                title:'Error',
                text: 'No country found',
                delay: 2000
            })
        }

        else {
            setTimeout(createItem, 300, refs.countries, templateCountries(data));
        }
    });

    function createItem (place, data) {
        refs.spinner.classList.add('is-hidden');
        place.innerHTML = data;
    }
}}
