
var ingridientsInFridge=JSON.parse(localStorage.getItem('ingridientsInFridge'));

function createIngridientsString(){
    var ingridientsString=''
    if(ingridientsInFridge.length!=0){
        ingridientsString='&ingredients='
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




async function getCuisines(cuisineId){
    console.log(cuisineId);
    /*var checkedValue = document.querySelector('.messageCheckbox:checked').value;*/
    var ingString=createIngridientsString();
    console.log(API_KEY2);
    console.log(ingString);
    
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY3}${ingString}`/*&type=${checkedValue}*/, {
    method: 'GET',
    
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
    })
    .catch(error => console.error(error))   
}

getCuisines();