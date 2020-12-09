

const LINK_INGREDIENT_SEARCH='https://api.spoonacular.com/food/ingredients/search?apiKey='
const ingredientSearchString='&number=100&sort=calories&sortDirection=asc&query=';
const recipeCard=document.getElementById('cuisine-result');

recipeCard.addEventListener('click',(e)=>{
    if(e.target.classList.contains('show-more')){
       child=e.target.parentNode;
        var i = 0;
        while( (child = child.previousSibling) != null ) 
        i++;
        console.log(i);
        toggleModal(cuisineResult[i]);
    }
})

async function ingredientSearch(){
    ingridientString=ingridientSearchInput.value;
    ingridientResult=await fetch(`${LINK_INGREDIENT_SEARCH}${API_KEY131}${ingredientSearchString}${ingridientString}&sortDirection=desc&sort=popularity`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        result = json;
        toggleModal(json.result);
    })
    .catch(error => console.error(error))
}

const displayIngridientResults=(ingridientResult)=>{
    ingridientResultSection.innerHTML='';
    ingridientResult.map((ing)=>{
        displayResultIngridient(ing);
    })
}

var modalBtn = document.getElementById("modalBtn");
var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");
var output = "";

/*function toggleModal(recipe){
    modal.classList.toggle("show-modal");
    for(let i = 0; i < recipe.length; i++){
        output += `<li>recipe[i].id</li>`
    }
    console.log(output);
}*/

/*modalBtn.addEventListener('click', toggleModal);



/*******************MODAL***************** */

var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");
var modalOutput = "";

 

function toggleModal(cuisine){
   console.log(cuisine);
    modalOutput =`
      <div class="modalTop">
        <button onclick='windowOnClick()'class="close-button">&times;</button>
      </div>
        <div class="modalTitle">
            <h1>${cuisine.title}</h1>
        </div>

        <div class="modalMain">
            <div class="modalLeft">
                
                <div class="modalBottom">
                <div class="modalTop">
                    <img src="${cuisine.image}" class="cuisineImgModal" alt="">
                </div>
                    
                </div>
                <div class="modalNutritionFacts">
                <h2>Nutrition Facts</h2>
                <table id="nutrition">
                <tr><td>Calories: </td><td>${cuisine.nutrition.nutrients[0].amount}kCal</td></tr>
                <tr><td>Protein: </td><td>${cuisine.nutrition.nutrients[8].amount}g</td></tr>
                <tr><td>Fats: </td><td>${cuisine.nutrition.nutrients[1].amount}g</td></tr>
                <tr><td>Carbs: </td><td>${cuisine.nutrition.nutrients[3].amount}g</td></tr>
                </table>
             
            </div>
            </div>

            <div class="modalRight">
                
            <h2>Summary</h2>
            <p>${cuisine.summary}</a></p>
                <div class="modalBottom">
                   
                    <div class="modalStikerim">
                        <div class='iconsm'>
                    <div class="health-ratingm">
                        <img src='../Img/health-rating.svg' <span>${cuisine.healthScore}</span>
                    </div>
                    <div class="health-rating dollar-containerm">
                        <img src='../Img/icon-dollar.jpg' <span>${Math.round(cuisine.pricePerServing)}$</span>
                    </div>
                    <div class="health-rating dollar-containerm">
                        <img src='../Img/time.png' <span>${cuisine.readyInMinutes}min</span>
                    </div>
                </div>
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
