/*JSON test */
var p = {
    "italian": "Home of the pasta and the pizza, Italian food is simple dishes with only a few ingredients but of extraordinary quality. Tomatoes and basil, olive oil and Prosciutto de Parma are typical Italian products. Full Italian meals have been known to contain ten different courses from Aperitivo to Caffe. Italians are also known for their fondness of desserts like cheese, cake, icecream, fruit, sweets and cookies.",

    "indian": "Hot curries with lots of chili and a side of raita to cool down. Dishes are based on rice and often vegetarian or with sea food. Coriander, ginger, cumin, cardamon, saffron and nutmeg a favored flavour makers.",

    "french":"Home of the gourmet meal and the Michelin Guide, French cooking is known for its class and superb ingredients. Onions, foie gras, truffles, sea food, crossaints and the baguette, everything arranged with exceptional attention to detail and served with a glass of wine.",

    "chinese": "Most meals are served in bite-sized pieces ready to be picked up by chopsticks. Basics include rice and noodles. Meat includes every variety known to man. Vegetables including chilies are always a part of the dishes as well as fish sauce.",

    "african":"Rice, grains, vegetables, milk and all kinds of meat. Fruit is a valuable part of many meals. Maize and peanuts are widely used as well as chilies and sweet potatoes.",
    
    "World": 'Explore classic recipes from around the world and try new cuisines. Take Mexican beyond fajitas and Italian beyond pasta with our top recipes.',

    "Exploring":"Traveling the world and experiencing the different cultures and cuisines is something we all dream about.",

    
};

const loader = `<div id="loading-contaier">
<h1>Cooking in progress..</h1>
<div id="cooking">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div id="area">
        <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
        </div>
        <div id="pancake">
            <div id="pastry"></div>
        </div>
    </div>
</div>
</div>`;


const LINK_COMPLEX_SEARCH_RECEPIES='https://api.spoonacular.com/recipes/complexSearch?apiKey=';
const cuisineBtn = document.querySelectorAll(".cuisineBtn");
const cuisineResultSection = document.getElementById("cuisine-result");
const aboutCuisineTxt = document.getElementById("internationalCuisineText");
const searchRecipeButton=document.getElementById('search-recipe');
const inputText=document.getElementById('input-text');
const loadMoreButton=document.getElementById('load-more-btn');
const cuisinesButtons=document.getElementById('cuisinesBtns');
const topThree=document.querySelector(".topThree");

var ingridientString='';
var ingridientResult;
var cuisineId='';
var dietId='';
var inputTextString='';
var number=6;
var cuisineResult;
var helthTree;

searchRecipeButton.addEventListener('click',()=>{
    fetchData(cuisineId,dietId,inputTextString); 
})

inputText.addEventListener('input',inputTextHandle);

loadMoreButton.addEventListener('click',loadMoreData)

cuisinesButtons.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.classList.contains('cuisineBtn')){
        cuisineResultSection.classList.add('hide');
        cuisineResultSection.classList.remove('show-grid');
        loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
    }
})

topThree.addEventListener('click',(e)=>{
    if(e.target.classList.contains('topThreeImg')){
        child=e.target.parentNode;
        var i = 0;
        while( (child = child.previousSibling) != null ) 
        i++;
        toggleModal(helthTree[i-1+3]);
    }
})

async function getCuisines(cuisine){
   /*  console.log(cuisineId); */
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
    cuisineId=cuisine;
}

async function getDiet(diet){
       dietId=diet;
 }

function inputTextHandle(e){
    inputTextString='&query='+e.target.value;
}

const displayCuisineResult=(cuisineResult)=>{
    console.log(number);
    console.log(cuisineResult.length);
   

    cuisineResultSection.innerHTML='';
    cuisineResult.map((cuisine,i)=>{
        if(i<number){
            displayResultCuisine(cuisine,i);
        }
        
    })
    if(number>cuisineResult.length){
        loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
        console.log(loadMoreButton.classList);
    }
}

async function fetchData(cuisine,dietId,inputTextString){

    cuisineResultSection.innerHTML=loader;
    cuisineResultSection.classList.remove('hide');

    let cuisineString
    number=6;
    if(cuisine==='World'){
        cuisineString='';
    }else{
        cuisineString=`&cuisine=${cuisine}`;
    }

    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY}${cuisineString}&diet='${dietId}${inputTextString}&minCalories=${sliderValue.min}&maxCalories=${sliderValue.max}&addRecipeInformation=true&addRecipeNutrition=true&number=50`/*&type=${checkedValue}*/, {
        method: 'GET',
    })
        .then(response => response.json())
        .then((json)=>{
            cuisineResultSection.innerHTML='';
            displayCuisineResult(json.results);
            cuisineResult=json.results;
            number=6;
            
            cuisineResultSection.classList.add('show-grid');
            showTopResults(cuisineResult);
           if(json.results.length===0){
            notFoundError();
           }
           loadMoreButton.classList.add('show');
            loadMoreButton.classList.remove('hide');
        })
        .catch(error => {
            notFoundError();
            console.error(error)})

}


async function getHelthThree(){
    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY}&addRecipeInformation=true&addRecipeNutrition=true&number=6&sort=healthiness&sortDirection=desc`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then((json)=>{
            console.log(json);
            helthTree=json.results;
            showTopResults(json.results);
        })
        .catch(error => {console.error(error)})

}

function loadMoreData() {
    number = number + 6;
    displayCuisineResult(cuisineResult);
    
}



function hrefTo(){
    location.href='pages/cuisine.html';
}

/*<p>${cuisine.summary}</p> ZA OPIS RECEPTA ( DODATI LOAD MORE BTN ILI PREBACANJE NA STRANICU RECEPTA) */
const displayResultCuisine=(cuisine,i)=>{
    var animationString=getAnimationString(i);
    const div = document.createElement('div');
    div.classList.add(animationString);
    let imgSubString= cuisine.image.substring(0, cuisine.image.indexOf('-'));
    console.log(cuisine.nutrition.nutrients.Calories);
    div.innerHTML=`<img src='${cuisine.image}' class='cusine-img' alt='Ingridient Image id-${cuisine.id}'>
    <h2>${cuisine.title}</h2>
    <div class="data-container">
        <span class='right'>Calories per serving:&nbsp;&nbsp;</span> 
        <span  class='left'>${cuisine.nutrition.nutrients[0].amount}kCal</span>
        <span class='right'>Proteins per serving:&nbsp;&nbsp;</span> 
        <span  class='left'>${cuisine.nutrition.nutrients[8].amount}g</span>
        <span class='right'>Carbohydrates:&nbsp;&nbsp;</span> 
        <span  class='left'>${cuisine.nutrition.nutrients[3].amount}g</span>
        <span class='right'>Fat per serving:&nbsp;&nbsp;</span>
        <span class='left'>${cuisine.nutrition.nutrients[1].amount}g</span>
    </div>
    <div class='icons'>
        <div class="health-rating">
            <img src='../Img/health-rating.svg' <span>${cuisine.healthScore}</span>
        </div>
        <div class="health-rating dollar-container">
            <img src='../Img/icon-dollar.jpg' <span>${Math.round(cuisine.pricePerServing)/100}$</span>
        </div>
        <div class="health-rating dollar-container">
            <img src='../Img/time.png' <span>${cuisine.readyInMinutes}min</span>
        </div>
    </div>
    <button id="modalBtn" class='show-more'>Show more</div>
    `
    /*CHECK IF MEAL IS VEGAN (ADD PSEUDO EL VEGAN IF IT IS) */
    div.classList.add("divTest");
    if(cuisine.vegan){
        div.classList.toggle('greenW');
    }
  
    cuisineResultSection.appendChild(div);
    /* aboutCuisineTxt.innerHTML = ""; */
    
    
   /*  else{
        div.classList.add("redW");
    }  */
}

function getAnimationString(i){
    var animationString=''
    if((i+1)%3===1){
        animationString='slide-in-left'
    }else if((i+1)%3===2){
        animationString='scale-in-center'
    }else if((i+1)%3===0){
        animationString='slide-in-right'
    }
    return animationString;
}

function getAnimationString(i){
    var animationString=''
    if((i+1)%3===1){
        animationString='slide-in-left'
    }else if((i+1)%3===2){
        animationString='scale-in-center'
    }else if((i+1)%3===0){
        animationString='slide-in-right'
    }
    return animationString;
}
/*
 var modalBtn = document.createElement("button");
    modalBtn.innerHTML = "CLICK ME";  
    div.appendChild(modalBtn);
*/

function displayAboutCuisine(cuisineId) {
   
    const divF = document.getElementById("flagAboutCuisine");
    const titleF = document.getElementById("flagAboutTitle");
    const contentF = document.getElementById("flagAboutText");

    titleF.classList.add('pre-animation');
    contentF.classList.add('pre-animation');
    titleF.innerHTML = cuisineId;

    for (var key in p) {
        if (p.hasOwnProperty(key) && key === cuisineId) {
            contentF.innerHTML = p[key];
        }
    }
    setTimeout(function(){
        titleF.classList.remove('pre-animation');
        contentF.classList.remove('pre-animation');
    },100)

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



  /*SIDE BAR TOP THREE */

function showTopResults(cuisineResult){
    
    showBest(cuisineResult);
}

function showBest(cuisineResult){
    console.log(cuisineResult[0]);
    let best = document.querySelector(".topThree");
    let bestArr = [];
    for(let i = 3; i<6; i++){
        let bestItem = document.createElement("img");
        bestItem.className = "topThreeImg";
        bestItem.src = cuisineResult[i].image;
    /*  console.log(cuisineResult[i].healthScore);
        best.appendChild(bestItem); */
        bestArr.push([bestItem, cuisineResult[i].healthScore]);
    }

    best.innerHTML = `The healthiest recipes`;
    for(let i = 0; i < 3; i++){
        let bestItemDiv=document.createElement("div");
        bestItemDiv.appendChild(bestArr[i][0]);
        bestItemDiv.innerHTML+=`<div class="health-rating healthiness">
            <img src='../Img/health-rating.svg'>
    </div>`
        bestItemDiv.classList.add('healthiness-container')
    best.appendChild(bestItemDiv);
        /*console.log("Radiiii radii radiii radiii !!!!") */
    }
}

function notFoundError(){
    cuisineResultSection.innerHTML=`<h1 class="scale-in-center">Recipes not found</h1>
    <img class="scale-in-center" src="../resources/images/utensils.svg" alt='utensils'>`;
    loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
        loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
        loadMoreButtonIng.classList.add('hide');
        loadMoreButtonIng.classList.remove('show');
}


getHelthThree();