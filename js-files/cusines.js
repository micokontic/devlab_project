/*JSON test */
var p = {
    "italian": "Home of the pasta and the pizza, Italian food is simple dishes with only a few ingredients but of extraordinary quality. Tomatoes and basil, olive oil and Prosciutto de Parma are typical Italian products. Full Italian meals have been known to contain ten different courses from Aperitivo to Caffe. Italians are also known for their fondness of desserts like cheese, cake, icecream, fruit, sweets and cookies.",

    "indian": "Hot curries with lots of chili and a side of raita to cool down. Dishes are based on rice and often vegetarian or with sea food. Coriander, ginger, cumin, cardamon, saffron and nutmeg a favored flavour makers.",

    "french":"Home of the gourmet meal and the Michelin Guide, French cooking is known for its class and superb ingredients. Onions, foie gras, truffles, sea food, crossaints and the baguette, everything arranged with exceptional attention to detail and served with a glass of wine.",

    "chinese": "Most meals are served in bite-sized pieces ready to be picked up by chopsticks. Basics include rice and noodles. Meat includes every variety known to man. Vegetables including chilies are always a part of the dishes as well as fish sauce."
};
const API_KEY1='f8d70dbfbd8e4b0fbc6fa095abe2a2db';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';

const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';

const search1='&query=pasta&number=20';

const cuisineBtn = document.querySelectorAll(".cuisineBtn");
const cuisineResultSection = document.getElementById("cuisine-result");
const aboutCuisineTxt = document.getElementById("internationalCuisineText");

const search3='&cuisine=';

var ingridientString='';
var ingridientResult;

async function getCuisines(cuisineId){
    console.log(cuisineId);
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/

    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY2}${search3}${cuisineId}`/*&type=${checkedValue}*/, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        cuisineResultSection.innerHTML='';
        displayCuisineResult(json.results);
        displayAboutCuisine(cuisineId);
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
    /* aboutCuisineTxt.innerHTML = ""; */
}


const displayAboutCuisine=(cuisineId)=>{
 const divF = document.getElementById("flagAboutCuisine");
const titleF = document.getElementById("flagAboutTitle");
const contentF = document.getElementById("flagAboutText");
 titleF.innerHTML = cuisineId;
 for (var key in p) {
    if (p.hasOwnProperty(key) && key=== cuisineId) {
        contentF.innerHTML = key + " -> " + p[key];
    }
}
}



