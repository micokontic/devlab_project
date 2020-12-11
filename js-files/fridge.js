const API_KEY='3203da816026457084c63835967a95c3';
const API_KEY2='42c7c7a52bf844368878a3d8c96378ed';
const API_KEY3='d22eaf828c6c4cecb77af573b2673b48';
const API_KEY10='3cd18534149a4cc1b19ebd6f1c8ef472';
const API_KEY11='55aaab3f111448719c70a7565dd7bf38';

const LINK_INGREDIENT_SEARCH='https://api.spoonacular.com/food/ingredients/search?apiKey='
const ingredientSearchString='&number=100&sort=calories&sortDirection=asc&query=';
const ingSearchButton=document.getElementById('ing-search-btn');
const ingridientSearchInput=document.getElementById('ing-search');
const ingridientResultSection=document.getElementById('ingridients-result');
const displayIngridientsInFridgeSection=document.getElementById('ingridients-in-fridge');
const ingridients=document.getElementById('ingridients');

var ingridientString='';
var ingridientResult;
var ingridientsInFridge=JSON.parse(localStorage.getItem('ingridientsInFridge'));

document.addEventListener("DOMContentLoaded",displayIngridientsInFridge);
ingridients.addEventListener('click',deleteFromFridge)
ingridientResultSection.addEventListener('click',addToFridge);
ingSearchButton.addEventListener('click',ingredientSearch);


function displayIngridientsInFridge(){
    console.log(ingridientsInFridge);
    ingridients.innerHTML='';
    ingridientsInFridge.map((ing)=>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
                    
                            <div class="container">
                                <div class="front" style="background-image: url(https://spoonacular.com/cdn/ingredients_500x500/${ing.image})">
                                    <div class="inner">
                                        <p>${ing.name}</p>
                                    </div>
                                </div>
                                <div class="back">
                                    <div class="inner">
                                        <div class="back-content"> 
                                            <p>Remove from fridge</br><img class="utensils-img" src="../resources/images/utensils.svg" ></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
        `
        ingridients.appendChild(div);
    })
}

async function ingredientSearch(){
    ingridientString=ingridientSearchInput.value;
    ingridientResult=await fetch(`${LINK_INGREDIENT_SEARCH}${API_KEY}${ingredientSearchString}${ingridientString}&sortDirection=desc&sort=popularity`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        displayIngridientResults(json.results);
        return (json.results)
    })
    .catch(error => console.error(error))
}

const displayIngridientResults=(ingridientResult)=>{
    ingridientResultSection.innerHTML='';
    ingridientResult.map((ing)=>{
        displayResultIngridient(ing);
    })
}

const displayResultIngridient=(ing)=>{
    
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`             
        <div class="container">
            <div class="front" style="background-image: url(https://spoonacular.com/cdn/ingredients_500x500/${ing.image})">
                <div class="inner">
                    <p>${ing.name}</p>
                </div>
            </div>
            <div class="back">
                <div class="inner">
                    <div class="back-content"> 
                        <p>Add to fridge</br><img class="utensils-img add-to-fridge"
                         src="../resources/images/fridge.svg" 
                         onmouseover="this.src='../resources/images/fridge-open.svg'"
                         onmouseout="this.src='../resources/images/fridge.svg'"
                         ></p>
                    </div>
                </div>
            </div>
        </div>
    `
        ingridientResultSection.appendChild(div);
    
}

function addToFridge(e) {
    if (e.target.classList.contains("add-to-fridge")){
        var parentDiv=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var textNode=e.target.parentNode.childNodes[0];
        var  index=whichChild(parentDiv);
        if(!containsObject(ingridientResult[index],ingridientsInFridge)){
            ingridientsInFridge.push(ingridientResult[index]);
            localStorage.setItem('ingridientsInFridge', JSON.stringify(ingridientsInFridge));
            displayIngridientsInFridge();
            e.target.src='../resources/images/fridge.svg';
            textNode.nodeValue=`${ingridientResult[index].name} added to fridge!`;
            setTimeout(()=>{
                parentDiv.classList.add('slide-out-bck-tr');
                setTimeout(()=>{parentDiv.style.display='none'},700)
            },800)
        }else{
            e.target.parentNode.innerHTML='You already have it';
            setTimeout(()=>{
                parentDiv.classList.add('slide-out-bck-tr');
                setTimeout(()=>{parentDiv.style.display='none'
            },700)
            },800)
        }
    }
}

function deleteFromFridge(e){
    if (e.target.classList.contains("utensils-img")){
        var parentDiv=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var  index=whichChild(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
        localStorage.setItem('ingridientsInFridge', JSON.stringify(ingridientsInFridge));
        e.target.parentNode.innerHTML=`You have eaten ${ingridientsInFridge[index].name}`;
        setTimeout(()=>{
                parentDiv.classList.add('slide-out-bck-center');
                setTimeout(()=>{
                parentDiv.style.display='none';
                ingridientsInFridge.splice(index, 1);
                localStorage.setItem('ingridientsInFridge', JSON.stringify(ingridientsInFridge));
                displayIngridientsInFridge();
        },1200)
        
    })
}
}

function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) ++i;
    return i;
}

function containsObject(obj, list) {
    console.log('tu sam');
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }
    return false;
}
