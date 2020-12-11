
const ingridientSearcButton=document.getElementById('ingridient-search');
const loadMoreButtonIng=document.getElementById('load-more-btn-ing');

var ingridientsInFridge=JSON.parse(localStorage.getItem('ingridientsInFridge'));

ingridientSearcButton.addEventListener('click',getCuisinesByIng)
loadMoreButtonIng.addEventListener('click',loadMoreDataIng)

var numberIng=6;
var recepiesByIng

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

    cuisineResultSection.innerHTML=loader;
    cuisineResultSection.classList.remove('hide');
    
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
    var ingString=createIngridientsString();
<<<<<<< HEAD
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}${ingString}&number=20`/*&type=${checkedValue}*/, {
=======
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY10}${ingString}&number=20`/*&type=${checkedValue}*/, {
>>>>>>> origin/VasilijeK
    method: 'GET',
    })
    .then(response => response.json())
    .then((json)=>{
        loadMoreButton.classList.add('hide');
        loadMoreButton.classList.remove('show');
        loadMoreButtonIng.classList.add('show');
        loadMoreButtonIng.classList.remove('hide');
        cuisineResultSection.classList.add('show-grid');
        cuisineResultSection.classList.remove('hide-grid');
        numberIng=6;
        console.log(json);
<<<<<<< HEAD
        console.log(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}${ingString}&number=20`);
=======
        console.log(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY11}${ingString}&number=20`);
>>>>>>> origin/VasilijeK
        recepiesByIng=json;
        displayResultCousineByIng(json)
        if(json.length===0){
            notFoundError()
        }
    })
    .catch(
    error => {console.error(error)
        notFoundError()})   
}

function displayResultCousineByIng(json){
    cuisineResultSection.innerHTML='';
    if(numberIng>recepiesByIng.length){
        loadMoreButtonIng.classList.add('hide');
        loadMoreButtonIng.classList.remove('show');
    }
    json.map((recipe,i)=>{
        if(i<numberIng){
            displayResultRecipeByIng(recipe,i);
        }
        
    })
    document.querySelectorAll('.byIngCard').forEach(item => {
        console.log('klik');
      item.addEventListener('click', sliderClickHandler)
    })
}

function loadMoreDataIng(){
    numberIng=numberIng+6;
 
    displayResultCousineByIng(recepiesByIng)
    if(numberIng>recepiesByIng.length){
        loadMoreButtonIng.classList.add('hide');
        loadMoreButtonIng.classList.remove('show');
    }
}

const displayResultRecipeByIng=(cuisine,i)=>{
    var animationString=getAnimationString(i);
    const div = document.createElement('div');
    div.classList.add(animationString);
    div.classList.add('byIngCard');
    div.dataset.value=("data-value", `${cuisine.id}`)
    div.innerHTML=`<img class='recepie-img'src='${cuisine.image}' data-value="${cuisine.id}" alt='Ingridient Image id-${cuisine.id}'>
    <h2 data-value="${cuisine.id}">${cuisine.title}</h2>
        <div data-value="${cuisine.id}" class="ing-container">
            <h4 data-value="${cuisine.id}" class="text">USED</h4>
            <h4 data-value="${cuisine.id}" class="used white-bck"></h4>
            <h4 data-value="${cuisine.id}" class="text">MISSING</h4>
            <h4 data-value="${cuisine.id}" class="missing  white-bck"></h4>
        </div>
    </span>
    `
    var usedChild = div.querySelector('.used');
    var missingChild=div.querySelector('.missing');

    cuisine.usedIngredients.map((ing)=>{
        //let imgElem=document.createElement('img');
        //imgElem.src=ing.image;
        //imgElem.title="Text you want to display in the tooltip"
        //usedChild.appendChild(imgElem);

        let imgDiv=document.createElement('div');
        imgDiv.classList.add('container2');
        imgDiv.innerHTML=`<img src=${ing.image} class='image'>
        <span class="tooltiptext2">${ing.name}</span>`
        usedChild.appendChild(imgDiv);
    })
    
    cuisine.missedIngredients.map((ing)=>{
        let imgDiv=document.createElement('div');
        imgDiv.classList.add('container2');
        imgDiv.innerHTML=`<img src=${ing.image} class='image'>
        <span class="tooltiptext2">${ing.name}</span>`
        missingChild.appendChild(imgDiv);
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
