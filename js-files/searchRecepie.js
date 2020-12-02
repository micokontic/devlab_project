const API_KEY10='3cd18534149a4cc1b19ebd6f1c8ef472';
const API_KEY11='55aaab3f111448719c70a7565dd7bf38';
const ingridientSearcButton=document.getElementById('ingridient-search');
var ingridientsInFridge=JSON.parse(localStorage.getItem('ingridientsInFridge'));


ingridientSearcButton.addEventListener('click',getCuisinesByIng)

function createIngridientsString(){
    var ingridientsString=''
    if(ingridientsInFridge.length!=0){
        ingridientsString='&ingredients='
        ingridientsInFridge.map((ing)=>{
        ingridientsString=ingridientsString+ing.name+',';
        })
        ingridientsString=ingridientsString.slice(0, -1)
    }else{
        console.log('nula je');
        ingridientsString=''
    }
    return ingridientsString;
}

async function getCuisinesByIng(){
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
    var ingString=createIngridientsString();
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY11}${ingString}&number=20`/*&type=${checkedValue}*/, {
    method: 'GET',
    
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
        console.log(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY11}${ingString}&number=20`);
        displayResultCousineByIng(json)
    })
    .catch(error => console.error(error))   
}

function displayResultCousineByIng(json){
    json.map((recipe)=>{
        displayResultRecipeByIng(recipe);
        console.log(recipe)
    })

}

const displayResultRecipeByIng=(cuisine)=>{
    const div = document.createElement('div');
    div.innerHTML=`<img class='recepie-img'src='${cuisine.image}' alt='Ingridient Image id-${cuisine.id}'>
    <h2>${cuisine.title}</h2>
        <div class="ing-container">
            <h4>USED</h4>
            <h4 class="used white-bck"></h4>
            <h4>MISSING</h4>
            <h4 class="missing  white-bck"></h4>
        </div>
    </span>
    `
    var usedChild = div.querySelector('.used');
    var missingChild=div.querySelector('.missing');

    cuisine.usedIngredients.map((ing)=>{
        let imgElem=document.createElement('img');
        imgElem.src=ing.image;
        usedChild.appendChild(imgElem);
    })

    cuisine.missedIngredients.map((ing)=>{
        let imgElem=document.createElement('img');
        imgElem.src=ing.image;
        missingChild.appendChild(imgElem);
    })
    
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

/*function createIngridientsString2(){
    var ingridientsString=''
    if(ingridientsInFridge.length!=0){
        ingridientsString='&includeIngredients='
        ingridientsInFridge.map((ing)=>{
        ingridientsString=ingridientsString+ing.name+',+';
        })
        ingridientsString=ingridientsString.slice(0, -2)
    }else{
        console.log('nula je');
        ingridientsString=''
    }
    return ingridientsString;
}
*/



/*async function getCuisines2(cuisineId){
    console.log(cuisineId);
    var ingString=createIngridientsString2();
   console.log(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}${ingString}&fillIngredients=true&number=100`)
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY10}${ingString}&number=100&fillIngredients=true`, {
    method: 'GET',
    
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
    })
    .catch(error => console.error(error))   
}
*/

//getCuisines();
//getCuisines2();
