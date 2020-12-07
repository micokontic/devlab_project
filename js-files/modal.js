const API_KEY='3203da816026457084c63835967a95c3';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';
const API_KEY10='3cd18534149a4cc1b19ebd6f1c8ef472';
const API_KEY11='55aaab3f111448719c70a7565dd7bf38';

const LINK_INGREDIENT_SEARCH='https://api.spoonacular.com/food/ingredients/search?apiKey='
const ingredientSearchString='&number=100&sort=calories&sortDirection=asc&query=';


async function ingredientSearch(){
    ingridientString=ingridientSearchInput.value;
    ingridientResult=await fetch(`${LINK_INGREDIENT_SEARCH}${API_KEY11}${ingredientSearchString}${ingridientString}&sortDirection=desc&sort=popularity`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        result = json;
        toggleModal(json.result)
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

function toggleModal(recipe){
    modal.classList.toggle("show-modal");
    for(let i = 0; i < recipe.length; i++){
        output += `<li>recipe[i].id</li>`
    }
    console.log(output);
}

modalBtn.addEventListener('click', toggleModal);