/*JSON test */
var p = {
    "italian": "Home of the pasta and the pizza, Italian food is simple dishes with only a few ingredients but of extraordinary quality. Tomatoes and basil, olive oil and Prosciutto de Parma are typical Italian products. Full Italian meals have been known to contain ten different courses from Aperitivo to Caffe. Italians are also known for their fondness of desserts like cheese, cake, icecream, fruit, sweets and cookies.",

    "indian": "Hot curries with lots of chili and a side of raita to cool down. Dishes are based on rice and often vegetarian or with sea food. Coriander, ginger, cumin, cardamon, saffron and nutmeg a favored flavour makers.",

    "french":"Home of the gourmet meal and the Michelin Guide, French cooking is known for its class and superb ingredients. Onions, foie gras, truffles, sea food, crossaints and the baguette, everything arranged with exceptional attention to detail and served with a glass of wine.",

    "chinese": "Most meals are served in bite-sized pieces ready to be picked up by chopsticks. Basics include rice and noodles. Meat includes every variety known to man. Vegetables including chilies are always a part of the dishes as well as fish sauce.",

    "african":"Rice, grains, vegetables, milk and all kinds of meat. Fruit is a valuable part of many meals. Maize and peanuts are widely used as well as chilies and sweet potatoes.",

    "other":"Traveling the world and experiencing the different cultures and cuisines is something we all dream about.",

    "world": 'Explore classic recipes from around the world and try new cuisines. Take Mexican beyond fajitas and Italian beyond pasta with our top recipes.'
};
const API_KEY1='f8d70dbfbd8e4b0fbc6fa095abe2a2db';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';
const API_KEY4='f8d70dbfbd8e4b0fbc6fa095abe2a2db';
const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';
const cuisineBtn = document.querySelectorAll(".cuisineBtn");
const cuisineResultSection = document.getElementById("cuisine-result");
const aboutCuisineTxt = document.getElementById("internationalCuisineText");
const searchRecipeButton=document.getElementById('search-recipe');
const inputText=document.getElementById('input-text');


var ingridientString='';
var ingridientResult;
var cuisineId='';
var dietId='';
var inputTextString='';


searchRecipeButton.addEventListener('click',()=>{
    fetchData(cuisineId,dietId,inputTextString);
})

inputText.addEventListener('input',inputTextHandle)

async function getCuisines(cuisine){
   /*  console.log(cuisineId); */
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
      cuisineId=cuisine;
}

async function getDiet(diet){
    /*  console.log(cuisineId); */
     /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
       dietId=diet;
 }

function inputTextHandle(e){
    inputTextString='&query='+e.target.value;
}
async function fetchData(cuisineId,dietId,inputTextString){

    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY10}&cuisine='${cuisineId}&diet='${dietId}${inputTextString}&addRecipeInformation=true&number=50`/*&type=${checkedValue}*/, {
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
function hrefTo(){
    location.href='pages/cuisine.html';
}

/*<p>${cuisine.summary}</p> ZA OPIS RECEPTA ( DODATI LOAD MORE BTN ILI PREBACANJE NA STRANICU RECEPTA) */
const displayResultCuisine=(cuisine)=>{
    const div = document.createElement('div');
    div.innerHTML=`<img src='${cuisine.image}' alt='Ingridient Image id-${cuisine.id}'>
    <h2>${cuisine.title}</h2><span>Total time: ${cuisine.readyInMinutes}min</span>
    `
    /*CHECK IF MEAL IS VEGAN (ADD PSEUDO EL VEGAN IF IT IS) */
    if(cuisine.vegan){
        div.classList.add("greenW");
    }else{
        div.classList.add("redW");
    }
    div.classList.add("divTest");
    cuisineResultSection.appendChild(div);
    /* aboutCuisineTxt.innerHTML = ""; */
}


const displayAboutCuisine=(cuisineId)=>{
 const divF = document.getElementById("flagAboutCuisine");
const titleF = document.getElementById("flagAboutTitle");
const contentF = document.getElementById("flagAboutText");
 titleF.innerHTML = cuisineId;
 
 for (var key in p) {
    if (p.hasOwnProperty(key) && key === cuisineId) {
        contentF.innerHTML = "test" + p[key];
    }
}
}

/* WORLD WIDE CUISINES SELECTED FROM DROPDOWN */
dropdownArray.forEach(item => {
    item.addEventListener('click', (evt) => {
      inputField.value = item.textContent;
      /* console.log(inputField.value); */
      getCuisines(inputField.value);
      dropdownArray.forEach(dropdown => {
        dropdown.classList.add('closed');
      });
    });
  })

  dropdownArrayDiet.forEach(item => {
    item.addEventListener('click', (evt) => {
        inputFieldDiet.value = item.textContent;
      /* console.log(inputField.value); */
      getDiet(inputFieldDiet.value);
      dropdownArrayDiet.forEach(dropdown => {
        dropdownDiet.classList.add('closed');
      });
    });
  })


/*
function prepareLinks() {
    var links = document.getElementsByTagName('a');

    for(var i = 0; i < links.length; i++) {
        var thisLink = links[i];

        if(thisLink.getAttribute('class') == 'imgLink') {
            thisLink.onclick = function() {
                showPic(this.href);
                return false;
            };
        }
    }
}
*/