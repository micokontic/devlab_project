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
const loadMoreButton=document.getElementById('load-more-btn');
const cuisinesButtons=document.getElementById('cuisinesBtns');
const API_KEY130='fe9a8fb4723e408a86f0cd486190dc03';


var ingridientString='';
var ingridientResult;
var cuisineId='';
var dietId='';
var inputTextString='';
var number=6;
var cuisineResult;

searchRecipeButton.addEventListener('click',()=>{
    fetchData(cuisineId,dietId,inputTextString);
    number=6;
    loadMoreButton.classList.add('show');
    loadMoreButton.classList.remove('hide');
    cuisineResultSection.classList.remove('hide');
    cuisineResultSection.classList.add('show-grid');

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

    if(number>cuisineResult.length){
        loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
    }

    cuisineResultSection.innerHTML='';
    cuisineResult.map((cuisine,i)=>{
        if(i<number){
            displayResultCuisine(cuisine);
        }
        
    })
}

async function fetchData(cuisine,dietId,inputTextString){
    
    let cuisineString
    number=6;
    if(cuisine==='World'){
        cuisineString='';
    }else{
        cuisineString=`&cuisine=${cuisine}`;
    }

    fetch(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY10}${cuisineString}&diet='${dietId}${inputTextString}&minCalories=${sliderValue.min}&maxCalories=${sliderValue.max}&addRecipeInformation=true&addRecipeNutrition=true&number=50`/*&type=${checkedValue}*/, {
        method: 'GET',
    })
        .then(response => response.json())
        .then((json)=>{
            cuisineResultSection.innerHTML='';
            displayCuisineResult(json.results);
            cuisineResult=json.results;
           
        })
        .catch(error => {
            console.log(`${LINK_COMPLEX_SEARCH_RECEPIES}${API_KEY3}${cuisineString}&diet='${dietId}${inputTextString}&addRecipeInformation=true&addRecipeNutrition=true&number=50`)
            console.error(error)})

}

function loadMoreData() {
    number = number + 6;
    displayCuisineResult(cuisineResult);
    
}



function hrefTo(){
    location.href='pages/cuisine.html';
}

/*<p>${cuisine.summary}</p> ZA OPIS RECEPTA ( DODATI LOAD MORE BTN ILI PREBACANJE NA STRANICU RECEPTA) */
const displayResultCuisine=(cuisine)=>{
    console.log(cuisine);
    const div = document.createElement('div');
    console.log(cuisine.nutrition.nutrients.Calories);
    div.innerHTML=`<img src='${cuisine.image}' alt='Ingridient Image id-${cuisine.id}'>
    <h2>${cuisine.title}</h2>
    <div class="data-container">
        <span class='right'>Proteins per serving:&nbsp;&nbsp;</span> 
        <span  class='left'>${cuisine.nutrition.nutrients[8].amount}g</span>
        <span class='right'>Carbohydrates per serving:&nbsp;&nbsp;</span> 
        <span  class='left'>${cuisine.nutrition.nutrients[3].amount}g</span>
        <span class='right'>Fat per serving:&nbsp;&nbsp;</span>
        <span class='left'>${cuisine.nutrition.nutrients[1].amount}g</span>
    </div>
    <div class='icons'>
        <div class="health-rating">
            <img src='../Img/health-rating.svg' <span>${cuisine.healthScore}</span>
        </div>
        <div class="health-rating dollar-container">
            <img src='../Img/icon-dollar.jpg' <span>${Math.round(cuisine.pricePerServing)}$</span>
        </div>
        <div class="health-rating dollar-container">
            <img src='../Img/time.png' <span>${cuisine.readyInMinutes}min</span>
        </div>
    </div>
    <button onclick='toggleModal()'id="modalBtn">Show more</div>
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
/*
 var modalBtn = document.createElement("button");
    modalBtn.innerHTML = "CLICK ME";  
    div.appendChild(modalBtn);
*/





/*******************MODAL***************** */

var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");
var modalOutput = "";

 

function toggleModal(){
   
    modalOutput =`
      <div class="modalTop">
        <button onclick='windowOnClick()'class="close-button">&times;</button>
      </div>
        <div class="modalTitle">
            <h1>Naslov</h1>
        </div>

        <div class="modalMain">
            <div class="modalLeft">
                
                <div class="modalBottom">
                    <h2>Summary</h2>
                    <p>Reciepe Summary Reciepe Summary Reciepe Summary Reciepe Summary Reciepe Summary Reciepe Summary Reciepe Summary <a href="#">show more...</a></p>
                </div>
            </div>

            <div class="modalRight">
                <div class="modalTop">
                    <img src="../resources/images/internationalCuisine.jpg" alt="">
                </div>
                
                <div class="modalBottom">
                    <div class="modalNutritionFacts">
                        <h2>Nutrition Facts</h2>
                        <table id="nutrition">
                        <tr><td>Calories: </td><td>$cuisine.Calories </td></tr>
                        <tr><td>Protein: </td><td>(tu se unose proteini)</td></tr>
                        <tr><td>Fats: </td><td>mmmmasti</td></tr>
                        <tr><td>Carbs: </td><td>mastii</td></tr>
                        </table>
                     
                    </div>
                    <div class="modalStikeri">
                        <h2>Labels</h2>
                    </div>
                </div>
            </div>
        </div>
  `;
  modal.classList.toggle("show-modal");
  modalContent.innerHTML = modalOutput;
}

function windowOnClick() {
   modal.classList.remove("show-modal");
}


function displayAboutCuisine(cuisineId) {
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