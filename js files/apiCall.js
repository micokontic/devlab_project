const API_KEY='3203da816026457084c63835967a95c3';
const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';
const LINK_INGREDIENT_SEARCH='https://api.spoonacular.com/food/ingredients/search?apiKey='
const ingredientSearchString='&number=100&sort=calories&sortDirection=desc&query='
const search1='&query=pasta&number=20';
const search2='&query=pasta&fillIngredients=true&instructionsRequired=true&includeIngredients=tomato,garlic';
const ingSearchButton=document.getElementById('ing-search-btn');
const button=document.getElementById('button');
const ingridientSearchInput=document.getElementById('ing-search');
const ingridientResultSection=document.getElementById('ingridients-result');

var ingridientString='';
var ingridientResult;


button.addEventListener('click',getData);
ingSearchButton.addEventListener('click',ingredientSearch);

async function getData(){
    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY}${search2}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
    })
    .catch(error => console.error(error))   
}

async function ingredientSearch(){
    ingridientString=ingridientSearchInput.value;
    fetch(`${LINK_INGREDIENT_SEARCH}${API_KEY}${ingredientSearchString}${ingridientString}&sortDirection=desc&sort=popularity`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        displayIngridientResults(json.results);
    })
    .catch(error => console.error(error))
}

const displayIngridientResults=(ingridientResult)=>{
    console.log(ingridientResult);
    ingridientResultSection.innerHTML='';
    ingridientResult.map((ing)=>{
        displayResultIngridient(ing);
    })
}

const displayResultIngridient=(ing)=>{
    const div=document.createElement('div');
    div.innerHTML=`<h1>${ing.name}</h1>
                 <img src='https://spoonacular.com/cdn/ingredients_100x100/${ing.image}' alt='Ingridient Image id-${ing.id}'>
                 <button>Add to fridge</button>`;
    ingridientResultSection.appendChild(div);
}