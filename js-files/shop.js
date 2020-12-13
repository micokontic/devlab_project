

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
var nombrePage=0;

ingridientResultSection.addEventListener('click',addToFridge);
ingSearchButton.addEventListener('click',ingredientSearch);

if (localStorage.getItem("ingridientsInFridge") === null) {
    localStorage.setItem('ingridientsInFridge', JSON.stringify([]));
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


var divCols
const displayIngridientResults=(ingridientResult)=>{
    ingridientResultSection.innerHTML='';
    divCols=document.createElement('div')
    divCols.classList.add('content');
    divCols.classList.add('cols');
    ingridientResult.map((ing,i)=>{
        displayResultIngridient(ing);
        if((i+1)%10===0){
            ingridientResultSection.appendChild(divCols);
            divCols=document.createElement('div')
            divCols.classList.add('content');
            divCols.classList.add('cols');
        }
    })
    ingridientResultSection.appendChild(divCols);
    const articlePageIn=document.createElement('article');
    articlePageIn.id='pagin';
    let articlePageInNuberString=''
    let i=10;
    let num=2;
    console.log(ingridientResult.length);
    while(i-10<=ingridientResult.length){
        if(i===10){
            articlePageInNuberString='<li class="active"><a href="#">1</a></li>'
        }else{
            articlePageInNuberString+=`<li><a href="#">${num++}</a></li>`
        }
        i=i+10;
    }

  articlePageIn.innerHTML=(`<nav>
    <span><a class="prev"><<</a></span>
    <ul>
      ${articlePageInNuberString}
    </ul>
    <span><a class="next">>></a></span>
  </nav>`);



  ingridientResultSection.appendChild(articlePageIn);
  setPaginationHandlers();
  showPage(0);
    
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
                         onmouseover="this.src='../resources/images/fridgeopen.svg'"
                         onmouseout="this.src='../resources/images/fridge.svg'"
                         ></p>
                    </div>
                </div>
            </div>
        </div>
    `
        divCols.appendChild(div);
    
}

function addToFridge(e) {
    if (e.target.classList.contains("add-to-fridge")){
        var parentDiv=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var textNode=e.target.parentNode.childNodes[0];
        var  index=whichChild(parentDiv);
        if(!containsObject(ingridientResult[index],ingridientsInFridge)){
            ingridientsInFridge.push(ingridientResult[index]);
            localStorage.setItem('ingridientsInFridge', JSON.stringify(ingridientsInFridge));
            e.target.src='../resources/images/fridge.svg';
            textNode.nodeValue=`${ingridientResult[index].name} added to fridge!`;
            setTimeout(()=>{
                parentDiv.classList.add('slide-out-bck-tr');
                setTimeout(()=>{parentDiv.style.display='none'},700)
            },800)
        }else{
            e.target.parentNode.innerHTML='You already have it';
            setTimeout(()=>{
                parentDiv.classList.add('slide-out-bck-center');
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
    
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }
    return false;
}
