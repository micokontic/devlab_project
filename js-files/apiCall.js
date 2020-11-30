const API_KEY='3203da816026457084c63835967a95c3';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';
const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';
const search1='&query=pasta&number=20';
const search2='&query=pasta&fillIngredients=true&instructionsRequired=true&includeIngredients=tomato,garlic';
const button=document.getElementById('button');

button.addEventListener('click',getData);

async function getData(){
    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY3}${search2}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
    })
    .catch(error => console.error(error))   
}