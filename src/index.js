import './sass/styles.scss';
import debounce from 'lodash.debounce';
import refs from './js/refs.js';
import fetchCountries from './fetchCountries.js';


refs.searchInput.addEventListener('input', debounce((e) => {
    fetchCountries(e.target.value)
    }, 500))