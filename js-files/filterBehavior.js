const exploreWorldButton=document.getElementById('explore-the-world');
const filterAll=document.getElementById('filter-all');
const ingridientSearchButton=document.getElementById('ingridient-search');
const allCountryFilter=document.getElementById('all-country-filter');
const otherCountryButton=document.getElementById('Exploring');
const countryButtons=document.getElementById('cuisines');
const cuisinesBtns=document.getElementById('cuisinesBtns');
const flagAboutCuisine=document.getElementById('flagAboutCuisine');
const healthiest = document.querySelector(".sliderBestFb");


filterAll.classList.add('hide');
allCountryFilter.classList.add('hide');
flagAboutCuisine.classList.add('hide');

exploreWorldButton.addEventListener('click',showFilter);
ingridientSearchButton.addEventListener('click',hideFilter);
otherCountryButton.addEventListener('click',showAllCountryFilter);
cuisinesBtns.addEventListener('click',cuisinesBtnsClickHandler)

function showFilter(){
    filterAll.classList.add('slide-in-right');
    filterAll.classList.add('show');
    cuisineResultSection.innerHTML='';
}

function hideFilter(){
    filterAll.classList.remove('show');
    filterAll.classList.add('hide');
    flagAboutCuisine.classList.remove('show');
    flagAboutCuisine.classList.add('hide');
    healthiest.classList.add('hide');
}

function showAllCountryFilter(){
    allCountryFilter.classList.remove('hide');
    allCountryFilter.classList.add('show');
    countryButtons.style.display='none';
}

function cuisinesBtnsClickHandler(){
    if(!flagAboutCuisine.classList.contains('show'))
    {
    flagAboutCuisine.classList.add('slide-in-left');
    flagAboutCuisine.classList.add('show');
    flagAboutCuisine.classList.remove('hide');
    }
    displayAboutCuisine(cuisineId);
}

