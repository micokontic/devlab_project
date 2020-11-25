const apiKey='3203da816026457084c63835967a95c3';
const link='https://api.spoonacular.com/recipes/complexSearch?apiKey=';
//prva pretraga, daj mi 20 recepata za paste
const search1='&query=pasta&number=20';
//druga pretraga daj mi 20 recepata za paste, daj mi podatke o sastojcima, daj mi upustva za pravljenje, i recepat je potrebno da koristi tomato
const search2='&query=pasta&number=20&fillIngredients=true&instructionsRequired=true&includeIngredients=tomato,garlic';

const button=document.getElementById('button');
const naslov=document.getElementById('naslov');
button.addEventListener('click',getData);

async function getData(){
    fetch(`${link}${apiKey}${search2}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then((json)=>{
        console.log(json);
        naslov.innerHTML=(json.results[0].id);
    })
    .catch(error => console.error(error))   
}

