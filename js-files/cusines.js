
const API_KEY1='f8d70dbfbd8e4b0fbc6fa095abe2a2db';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';

const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';

const search1='&query=pasta&number=20';

const cuisineBtn = document.querySelectorAll(".cuisineBtn");
const cuisineResultSection = document.getElementById("cuisine-result");
const search3='&cuisine=';

var ingridientString='';
var ingridientResult;

async function getCuisines(cuisineId){
    console.log(cuisineId);
    var checkedValue = document.querySelector('.messageCheckbox:checked').value;

    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY1}${search3}${cuisineId}&type=${checkedValue}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        cuisineResultSection.innerHTML='';
        displayCuisineResult(json.results);
    })
    .catch(error => console.error(error))   
}
const displayCuisineResult=(cuisineResult)=>{
    console.log(cuisineResult);
    cuisineResultSection.innerHTML='';
    cuisineResult.map((cuisine)=>{
        displayResultCuisine(cuisine);
    })
}
const displayResultCuisine=(cuisine)=>{
    const div = document.createElement('div');
    div.innerHTML=`<img src='${cuisine.image}' alt='Ingridient Image id-${cuisine.id}'>
    <h2>${cuisine.title}</h2>
    `
    cuisineResultSection.appendChild(div);

}